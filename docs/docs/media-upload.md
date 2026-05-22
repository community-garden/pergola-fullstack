# Media Upload System

The Pergola media system provides schema-driven, semantically-grounded file uploads.
Every uploaded file gets a `MediaAttachment` entity in the Oxigraph RDF store;
thumbnails are served through a controlled proxy backed by [picturium](https://github.com/lamka02sk/picturium).

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/media-upload.cy.ts.mp4" type="video/mp4">
</video>

---

## Architecture

```
Browser
  │  POST /api/media/    (multipart)
  ▼
Pergola API (Hono)
  ├─► Writes file ──────────► pergola_media volume ◄──── picturium reads from here
  └─► Upserts MediaAttachment ──► Oxigraph (SPARQL)

Browser
  │  GET /api/media/:base64iri/thumb/:size
  ▼
Pergola API
  ├─ Loads MediaAttachment from Oxigraph (gets storedPath, mimeType)
  ├─ SVG? ──► streams file directly
  └─ Other ──► buildPicturiumUrl() with HMAC token ──► picturium ──► stream back
```

**Key design decisions:**

- Picturium is not exposed externally — only the API can query it
- Only a fixed set of thumbnail sizes is allowed (`icon`, `small`, `medium`, `large`, `xlarge`)
- SVG files bypass picturium (served directly to avoid unwanted rasterisation)
- Uploads are **optimistic**: a file can be uploaded before the parent entity is created
- Orphaned files (no `attachedTo` reference) can be cleaned up by a scheduled SPARQL DELETE

---

## API Endpoints

### `POST /api/media/`

Upload a file. Accepts `multipart/form-data`.

| Field | Required | Description |
|-------|----------|-------------|
| `file` | yes | The file to upload |
| `altText` | no | Accessibility description |
| `copyright` | no | Copyright notice |
| `attachedTo` | no | IRI of the owning entity |

**Supported MIME types:** `image/jpeg`, `image/png`, `image/webp`, `image/gif`, `image/svg+xml`, `image/avif`, `application/pdf`

**Response 201:**
```json
{
  "@id": "https://data.semantic-desk.top/garden/Media/{uuid}",
  "@type": "https://ontology.semantic-desk.top/garden#MediaAttachment",
  "encodedIRI": "<base64url-encoded IRI>",
  "name": "photo.jpg",
  "storedPath": "uploads/{uuid}.jpg",
  "mimeType": "image/jpeg",
  "fileSize": 204800,
  "uploadedAt": "2026-05-22T10:00:00.000Z"
}
```

**Error responses:** `400` missing file · `413` too large · `415` unsupported type

---

### `GET /api/media/:base64iri/thumb/:size`

Fetch a thumbnail. The `:base64iri` is the `encodedIRI` field from the upload response
(or compute it as `btoa(iri)` with `+→-`, `/→_`, trailing `=` stripped).

| Size | Pixel width |
|------|-------------|
| `icon` | 64 px |
| `small` | 128 px |
| `medium` | 320 px |
| `large` | 640 px |
| `xlarge` | 1 200 px |

The response is a real image (JPEG/WebP/AVIF chosen by picturium) with
`Cache-Control: public, max-age=86400`. SVG files are returned as-is with a
one-year immutable cache header.

---

### `DELETE /api/media/:base64iri`

Removes the file from disk and the `MediaAttachment` entity from Oxigraph.
If the file is already gone from disk the SPARQL entity is still cleaned up.

---

## Adding image upload to a form

Annotate any `string` field in a UISchema with `options.customRenderer: "ImageUploadRenderer"`:

```typescript
{
  type: 'Control',
  scope: '#/properties/coverImage',
  options: {
    customRenderer: 'ImageUploadRenderer',
    displaySize: 'large',        // thumbnail size shown in the form
    maxSizeBytes: 5242880,       // 5 MB client-side guard
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowSvg: false,             // set true to also accept SVG
  },
}
```

The field value stored in form data is the full semantic IRI of the `MediaAttachment`
entity. When the form is saved this IRI can be written as an RDF reference from
the parent entity.

### Global API base configuration

The upload URL is injected globally via `MediaConfigProvider` — the renderer never
hard-codes a path:

```tsx
// App root (already done inside GraviolaProvider):
<MediaConfigProvider mediaApiBase="/api/media">
  <App />
</MediaConfigProvider>
```

The default value is `VITE_MEDIA_API_URL` env var if set, otherwise `/api/media`.
In Storybook, `StoryProvider.tsx` supplies the absolute dev URL
(`https://dev01.pergola.kuenste.live/api/media`) so stories upload to the real API.

### UISchema options reference

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `displaySize` | `"icon" \| "small" \| "medium" \| "large" \| "xlarge"` | `"medium"` | Which thumbnail preset to show in the form |
| `maxSizeBytes` | `number` | `5242880` | Client-side size guard (server also enforces 10 MB hard limit) |
| `allowedTypes` | `string[]` | `["image/jpeg","image/png","image/webp","image/gif"]` | Accepted MIME types shown to the browser |
| `allowSvg` | `boolean` | `false` | Include `image/svg+xml` in the accepted types |
| `apiBase` | `string` | *(from `MediaConfigProvider`)* | Per-field override — use when a specific field should upload to a different endpoint |

---

## Data model — `MediaAttachment`

Every uploaded file is stored as a named RDF entity:

| Property | Type | Description |
|----------|------|-------------|
| `@id` | IRI | `https://data.semantic-desk.top/garden/Media/{uuid}` |
| `@type` | IRI | `https://ontology.semantic-desk.top/garden#MediaAttachment` |
| `name` | string | Original filename (Graviola label) |
| `storedPath` | string | Relative path in the media volume, e.g. `uploads/abc.jpg` |
| `mimeType` | string | e.g. `image/jpeg` |
| `fileSize` | integer | Bytes |
| `uploadedAt` | datetime | ISO 8601 |
| `altText` | string? | Accessibility text |
| `copyright` | string? | Copyright notice |
| `width` | integer? | Pixel width (future: extracted on upload) |
| `height` | integer? | Pixel height (future: extracted on upload) |
| `attachedTo` | IRI ref? | Reference to the owning entity |

---

## Picturium integration

[Picturium](https://github.com/lamka02sk/picturium) is a Rust image server built on libvips.
It runs as an internal Docker service (`internal-dev` network only) and is never
reached directly by browsers.

The API generates an HMAC-SHA256 token for each request using the shared `PICTURIUM_KEY`
secret. This prevents arbitrary resize queries from reaching picturium.

**Token computation** (matches picturium's `src/crypto.rs`):
```
token = HMAC-SHA256(path + "?" + sorted_params_excluding_token, PICTURIUM_KEY)
```

The proxy module (`watering-api/src/picturium/index.ts`) is self-contained and has
no Hono or store dependencies — it can be extracted to a shared package later.

---

## Extending to other file types

To support PDFs or other formats:

1. Add the MIME type to `ALLOWED_MIME_TYPES` in `watering-api/src/schema/media-attachment.ts`
2. Add the extension mapping to `MIME_TO_EXT`
3. Handle the new type in the thumbnail proxy route (e.g. PDF → `?thumb=p:1` for first page)
4. Update the `allowedTypes` default in `useImageUpload.ts` if needed

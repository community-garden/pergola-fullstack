import { Hono } from "hono";
import { readFile, writeFile, mkdir, unlink } from "node:fs/promises";
import { join } from "node:path";
import { store } from "../store";
import {
  MediaAttachmentTypeIRI,
  mediaAttachmentIRI,
  MediaUploadMetadataSchema,
  ALLOWED_MIME_TYPES,
  MIME_TO_EXT,
  type MediaAttachment,
  type AllowedMimeType,
} from "../schema/media-attachment";
import {
  buildPicturiumUrl,
  fetchFromPicturium,
  isValidThumbnailSize,
} from "../picturium";

const app = new Hono();

const PICTURIUM_URL = process.env.PICTURIUM_URL ?? "http://localhost:20045";
const PICTURIUM_KEY = process.env.PICTURIUM_KEY ?? "dev-secret";
const STORAGE_PATH = process.env.MEDIA_STORAGE_PATH ?? "/media";
const MAX_BYTES = parseInt(process.env.MEDIA_MAX_BYTES ?? "10485760");

const UPLOADS_DIR = join(STORAGE_PATH, "uploads");

function encodeIRI(iri: string): string {
  return Buffer.from(iri).toString("base64url");
}

function decodeIRI(encoded: string): string {
  return Buffer.from(encoded, "base64url").toString("utf-8");
}

// POST /api/media/ — multipart file upload
app.post("/", async (c) => {
  const contentType = c.req.header("Content-Type") ?? "";
  if (!contentType.startsWith("multipart/form-data")) {
    return c.json({ error: "Expected multipart/form-data", allowed: ALLOWED_MIME_TYPES }, 415);
  }

  let formData: FormData;
  try {
    formData = await c.req.formData();
  } catch {
    return c.json({ error: "Expected multipart/form-data" }, 400);
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return c.json({ error: "Missing 'file' field in form data" }, 400);
  }

  if (file.size > MAX_BYTES) {
    return c.json({ error: `File exceeds maximum allowed size of ${MAX_BYTES} bytes` }, 413);
  }

  const mimeType = file.type as AllowedMimeType;
  if (!(ALLOWED_MIME_TYPES as readonly string[]).includes(mimeType)) {
    return c.json({ error: `Unsupported MIME type: ${mimeType}`, allowed: ALLOWED_MIME_TYPES }, 415);
  }

  const rawMeta = {
    altText: formData.get("altText")?.toString(),
    copyright: formData.get("copyright")?.toString(),
    attachedTo: formData.get("attachedTo")?.toString(),
  };
  const metaParsed = MediaUploadMetadataSchema.safeParse(rawMeta);
  if (!metaParsed.success) {
    return c.json({ error: metaParsed.error.flatten() }, 400);
  }
  const meta = metaParsed.data;

  const uuid = crypto.randomUUID();
  const ext = MIME_TO_EXT[mimeType];
  const relPath = `uploads/${uuid}.${ext}`;
  const absPath = join(STORAGE_PATH, relPath);

  await mkdir(UPLOADS_DIR, { recursive: true });
  await writeFile(absPath, Buffer.from(await file.arrayBuffer()));

  const iri = mediaAttachmentIRI(uuid);
  const doc: Omit<MediaAttachment, "@id" | "@type"> = {
    name: file.name || `${uuid}.${ext}`,
    storedPath: relPath,
    mimeType,
    fileSize: file.size,
    uploadedAt: new Date().toISOString(),
    ...(meta.altText ? { altText: meta.altText } : {}),
    ...(meta.copyright ? { copyright: meta.copyright } : {}),
    ...(meta.attachedTo ? { attachedTo: { "@id": meta.attachedTo } } : {}),
  };

  await store.upsertDocument("MediaAttachment", iri, doc);

  return c.json(
    {
      "@id": iri,
      "@type": MediaAttachmentTypeIRI,
      encodedIRI: encodeIRI(iri),
      ...doc,
    },
    201
  );
});

// GET /api/media/:base64iri/thumb/:size — thumbnail proxy
app.get("/:base64iri/thumb/:size", async (c) => {
  const base64iri = c.req.param("base64iri");
  const size = c.req.param("size");

  if (!isValidThumbnailSize(size)) {
    return c.json({ error: `Invalid size '${size}'. Use: icon, small, medium, large, xlarge` }, 400);
  }

  let iri: string;
  try {
    iri = decodeIRI(base64iri);
  } catch {
    return c.json({ error: "Invalid IRI encoding" }, 400);
  }

  const doc = (await store.loadDocument("MediaAttachment", iri)) as MediaAttachment | null;
  if (!doc || !doc.storedPath) {
    return c.json({ error: "MediaAttachment not found" }, 404);
  }

  // SVGs are served directly — picturium would rasterize them unnecessarily
  if (doc.mimeType === "image/svg+xml") {
    const absPath = join(STORAGE_PATH, doc.storedPath);
    try {
      const buffer = await readFile(absPath);
      return new Response(buffer, {
        headers: {
          "Content-Type": "image/svg+xml",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } catch {
      return c.json({ error: "File not found on disk" }, 404);
    }
  }

  const picturiumUrl = await buildPicturiumUrl(PICTURIUM_URL, doc.storedPath, size, PICTURIUM_KEY);
  const upstream = await fetchFromPicturium(picturiumUrl);

  if (!upstream.ok) {
    return c.json({ error: "Upstream thumbnail generation failed", status: upstream.status }, 502);
  }

  const contentType = upstream.headers.get("Content-Type") ?? "image/jpeg";
  return new Response(upstream.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
});

// DELETE /api/media/:base64iri — remove file and SPARQL entity
app.delete("/:base64iri", async (c) => {
  const base64iri = c.req.param("base64iri");

  let iri: string;
  try {
    iri = decodeIRI(base64iri);
  } catch {
    return c.json({ error: "Invalid IRI encoding" }, 400);
  }

  const doc = (await store.loadDocument("MediaAttachment", iri)) as MediaAttachment | null;
  if (!doc || !doc.storedPath) {
    return c.json({ error: "MediaAttachment not found" }, 404);
  }

  const absPath = join(STORAGE_PATH, doc.storedPath);
  try {
    await unlink(absPath);
  } catch {
    // File already gone — still clean up the SPARQL entity
  }

  await store.removeDocument("MediaAttachment", iri);

  return new Response(null, { status: 204 });
});

export default app;
export { encodeIRI, decodeIRI };

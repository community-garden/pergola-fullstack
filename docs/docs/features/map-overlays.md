# Map Overlays

A garden can carry any number of **overlays**: images laid over the map, **above
the base map** (satellite or OSM) and **below the beds**. They can be switched on
and off on the garden map. The Wurzelwerk has two:

- *Drohnenfoto 2026* — a vertical drone photo (`MAX_0011.JPG`), placed on the
  satellite view with four landmarks (shed, dome tents, small greenhouse, container;
  4.4 cm per pixel), then moved 1 m north so that it fits the beds drawn from the
  garden plan
- *Aquarellkarte 2026* — a watercolour generated from the drone photo in Google Flow
  (Nano Banana 2.1). It keeps the photo's framing, so both share the same corners.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/map-overlays.cy.ts.mp4" type="video/mp4">
</video>

---

## Data model

`MapOverlay` (`schema/map-overlay-schema.ts`), linked from `Garden.mapOverlays`:

| Field | Form label (de) | Meaning |
|---|---|---|
| `name` | Name | shown in the overlay menu |
| `overlayImageUrl` | Bild-URL | static file, e.g. `/media/overlays/aquarell-2026.webp` |
| `corners` | Eckpunkte (WKT) | `POLYGON` with four corners: **top-left, top-right, bottom-right, bottom-left** |
| `overlayType` | Art des Overlays | `photo`, `plan`, `watercolor`, `other` |
| `opacity` | Deckkraft | 0–1, default 0.85 |
| `visible` | Sichtbar | shown by default (what is switched on the map wins, see below) |
| `sortOrder` | Reihenfolge | higher numbers are drawn on top |
| `attribution` | Quelle | who made the image, and how |

The perspective transform is done by the map: it stretches the image onto the four
corners. An editor for placing the corners does not exist yet; the parameters are
stored in the data model only. Quick helper: for a vertical photo, fit a similarity
transform (rotation, scale, shift) through three or four landmarks and compute the
image corners from it.

Images are static files in `frontend-vite/public/media/overlays/` (not versioned,
like the plant images). There is no upload yet.

## On the map

A layers button above the label button opens a menu with a switch per overlay.
The choice is kept while the window is open (`useMapSession`), like the base layer.
The code is in `components/map/overlays/`: `overlays.ts` (corners, order, visibility;
unit tests next to it), `mapOverlayLayers.ts` (MapLibre sync, inserts the layers
below the beds) and `MapOverlayFab.tsx`.

## The Wurzelwerk overlays

Their parameters (image, corners, opacity, order) are kept in
`frontend-vite/fixtures/wurzelwerk-overlays.json`. The images are derived from
`Saisonplanung/satelite/` (webp, 3000 px wide) into `public/media/overlays/`, and the
`MapOverlay` entries are written to the store and linked to the garden with
`garden:mapOverlays`. Changing an overlay works the same way as for any other entity.

If the photo sits a little off against the beds, shift all four corners by the same
amount (about 14 pixels per metre at the highest zoom, 1 m is roughly one bed edge).

## Making a watercolour with Google Flow

Add the photo to a Flow project, open it and ask for an edit, for example:
*Turn this top-down aerial drone photo into a hand-painted watercolor map
illustration … keep the exact top-down perspective, framing, aspect ratio and the
position and shape of every building, greenhouse, tunnel, path, bed and tree … no
text, no border.* Download the 2K version and check the fit by blending it 50 % over
the photo: edges must not double. Then add an entry to the fixture and load it into the store.

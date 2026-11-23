# Plant and Bed Images (static media)

A plant can carry a **main image** that is shown instead of its emoji symbol, and
any number of **further images**. A bed can carry them as well: the community beds
of Wurzelwerk show their animal (see [Bed images](#bed-images)). For now these are
plain URLs to static files: there is no media server and no media object yet.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/plant-images.cy.ts.mp4" type="video/mp4">
</video>

---

## Fields

| Field | Form label (de) | Meaning |
|---|---|---|
| `imageUrl` | Hauptbild (URL) | main image, used as the plant's symbol where there is room for it |
| `images` | Weitere Bilder (URLs) | further images, e.g. the bed from above, the front and back of a seed packet |

Both exist on **PlantSpecies** and **PlantVariety** (`schema/plant-schema.ts`). A
variety without its own image shows the image of its species.

URLs may be absolute (`https://…`) or relative. Relative paths are resolved
against the app root, not against the current page: `/media/plants/kartoffel/frucht.webp`
and `media/plants/kartoffel/frucht.webp` mean the same file
(`utils/mediaUrl.ts`).

In the plant form the main image has a small preview next to the URL
(`ImageUrlRenderer`, `options.customRenderer: "ImageUrlRenderer"`). If the file
cannot be loaded, the field turns red with *Bild nicht gefunden*, and the app
falls back to the emoji. The plant table shows the main image as an avatar next
to the name.

## Bed images

Beds (**Patch**, `schema/patch-schema.ts`) have the same two fields, `imageUrl` and
`images`. In the bed form the main image has the same preview. The community beds of
Wurzelwerk use the watercolours of their animals, e.g. *Dubstep Daniel Dachs*.

Where a bed shows its main image:

* **Bed card** on the map: next to the bed's name. A click shows the whole painting
  (the first further image) in large.
* **Season planner**: in front of the bed's name in the bed column, instead of the emoji.
* **Bed page**: next to the name in the bed plan (header and sidebar), in the
  timeline and in the notes view.
* **Forms and detail dialog**: where a form links a bed (e.g. *Beet* in the planting
  form), and in the bed's detail dialog, which opens from there (`primaryFields.image`).

Beds without an image look as before: emoji (season planner) or nothing (bed card).

The source pictures are `Saisonplanung/bilder/gemeinschaft/<id>.jpg`. The ids and
names come from `Saisonplanung/beete.json`. Older drafts such as `igel-v1-mit-blatt.jpg`
are not used.

```
frontend-vite/public/media/beds/<id>/bild.webp       main image (512 × 512, square around the painting)
frontend-vite/public/media/beds/<id>/aquarell.webp   the whole painting without the empty paper (≤ 1024 px)
```

`scripts/local-dev.sh plant-images` makes them together with the plant images:

* `scripts/plant-images.py` also writes the bed images. With ids, e.g.
  `scripts/plant-images.py dachs igel`, it makes only those plants or beds.
* `scripts/import-saisonplanung.py --images-only` sets `imageUrl` and `images` of the
  community beds in the store. It finds them by name and touches nothing else on the bed.
  `seed-season` (`--load`) sets them as well.
* The Schildkröte bed is called *Schildkröte* in the app, not *Schildkröten-Beet*:
  `BED_STORE_NAMES` in the import script maps the name.

## Where the images are shown

* **Map, season labels** (`?labels=<year>`): the label menu has a section
  *Pflanzensymbole* with **Bilder** (default) and **Emojis** (`?icons=emoji`).
  See [Garden Map Labels](garden-map.md#plant-images) for how the images grow
  with the zoom level.
* **Bed card** on the map: one image per planting.

The season timeline and the plant calendar still use the emoji.

## Static media folder

```
frontend-vite/public/media/plants/<id>/frucht.webp   main image (512 × 512)
frontend-vite/public/media/plants/<id>/beet.webp     bed from above (≤ 800 px)
frontend-vite/public/media/beds/<id>/bild.webp       bed images, see above
```

* The folder is **not versioned** (`.gitignore`): the images are data, not code.
* Vite serves it in development (`/media/…`).
* In production nginx serves it from a **volume**
  (`./frontend-vite/public/media:/usr/share/nginx/html/media:ro` in
  `docker-compose.prod.yml`, and for `frontend-prod` in `docker-compose.dev.yml`).
  It is excluded from the Docker build context (`.dockerignore`), so new images
  need no rebuild.
* `location ^~ /media/` in the nginx configs sends `Cache-Control: no-cache`: the
  browser revalidates (ETag) instead of caching for a year, so an edited image
  with the same name shows up right away. A missing file is a 404.
* The service worker does not precache `media/**` (`workbox.globIgnores`).

**Sync to the server** (the server's checkout path, as used by `docker-compose.prod.yml`):

```bash
rsync -av --delete frontend-vite/public/media/ <server>:<repo>/frontend-vite/public/media/
```

## Season planning images

The watercolours of the season planning (`Saisonplanung/bilder/`, 896 × 1200 px,
0.6–1.6 MB each) are turned into web images by a script:

```bash
scripts/local-dev.sh plant-images
```

1. `scripts/plant-images.py` reads `Saisonplanung/pflanzen/<id>.json`
   (`bilder.frucht`, `bilder.beet`, `bilder.beet-zuschnitt`):
    * **frucht.webp**: a square crop around the painted area (the paper colour
      is detected with ImageMagick `-fuzz -trim`), 512 px, about 25 KB.
    * **beet.webp**: the bed cropped like on the plant cards, at most 800 px,
      about 90 KB.
2. `scripts/import-saisonplanung.py --images-only` sets `imageUrl` and `images`
   of the imported species in the store. Plantings, persons and beds stay
   untouched. `seed-season` writes the image URLs as well.

Re-run it after editing the source images, e.g. with a transparent background:
an alpha channel of the source is kept.

---

## Outlook

!!! note "Not implemented yet"
    * A semantic **media object** (as in other Graviola projects) that can be
      described and linked to any entity, with uploads to a media server. The
      `ImageUploadRenderer` and the [media upload API](../media-upload.md) are a first step.
    * Photos of seed packets (front and back) on `SeedStock`.
    * Images in the season timeline and the plant lists.
    * Transparent backgrounds for the watercolours, so they sit better on the map.

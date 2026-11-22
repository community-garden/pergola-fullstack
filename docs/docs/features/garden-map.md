# Garden Map — Labels (Beschriftung)

The garden map (`/:garden/map`) can label its features once you zoom in far enough
for the text to fit. A floating button (bottom right) switches between the label modes.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/garden-map-labels.cy.ts.mp4" type="video/mp4">
</video>

---

## Modes

| Menu entry | URL | Shows |
|---|---|---|
| Keine Beschriftung | `?labels=off` | nothing |
| **Beetnamen** (default) | `?labels=names` | the names of **all** objects on a map feature, one per line |
| Saison 2027, 2026, … | `?labels=2027` | per bed: the plants that occupy it in that calendar year |

* A map feature (`GeoFeature`) has no name of its own. Beds, sheds, ponds … point
  to it via `geoFeature`, and one feature can carry several objects. The polytunnel,
  for example, is both *Folientunnel St. Josef* and *Folientunnel St. Josef – Beet*.
  Its label lists both.
* The season list contains every year that has plantings on a bed, plus the current
  year and the next planning season.
* In season mode, plantings that are still **wishes** are shown in italics. Cancelled
  plantings are left out. A planting appears in every calendar year it occupies the
  bed: garlic planted in October 2026 shows up in 2026 and 2027.
* The mode is kept in the URL, so a link such as `/Wurzelwerk/map?labels=2027` opens
  the season view directly.
* The menu section **Pflanzensymbole** switches the plant symbols in season labels
  between the plants' main images (**Bilder**, default) and their emoji
  (**Emojis**, `?icons=emoji`). See [Plant images](#plant-images).

## Zoom levels

| Zoom | Bed names mode | Season mode |
|---|---|---|
| below 18.5 | hidden — a chip *Zum Beschriften näher heranzoomen* zooms in | hidden |
| 18.5 – 19.75 | names | plant icons only |
| from 19.75 | names | bed name and one line per plant (max. 4, then “+n weitere”); with images: an image grid as soon as it fits, see below |

Labels never overlap. If two labels collide, the bigger feature wins, and in season
mode a bed with plantings beats an empty one. Smaller beds appear as you zoom in.
Clicks pass through a label to the feature below, so the bed card opens as before.
In edit mode the bed names are shown, whatever label mode is chosen
(see [Editing the Garden Map](garden-map-editing.md)).

## Plant images

With *Bilder*, the plant symbols are the plants' main images
([Plant Images](plant-images.md)); plants without one keep their emoji.

* From zoom 18.5: a row of small round images.
* From zoom 19.75 the images are laid out as a **grid that fits the bed** as it
  appears on screen. The size follows the zoom (in quarter steps). It depends on
  the size of the bed and on the number of its plants: one plant in the polytunnel
  gets a big picture, four plants in a small bed get small ones.
    * The grid may use 85 % of the bed's bounding box and 60 % of its area. The
      area limit keeps rotated beds from getting images that are too big.
    * Images are at most 120 px.
    * From 64 px the plant name is shown under each image: in two lines if they
      fit, else in one line with “…”.
    * If the images would be smaller than 40 px, the bed keeps the text list with
      small icons.
* Wishes have their names in italics, as in the text list.

The sizing is a pure function, `imageGridFor()` in `components/map/labels/imageGrid.ts`,
with unit tests (`bun test src/components/map/labels/imageGrid.test.ts`). The bed's
size on the ground comes from `footprint()` in `geometry.ts`.

## Implementation

* Names: one SPARQL query collects every named object per geo feature of the garden
  (`api/mapLabels.ts`, hook `useGeoFeatureNames`). The query is type-agnostic, so new
  feature types are labelled automatically. The click popup uses the same names.
* Plantings come from `useSeasonData` (see [Season Planning](season-planning.md)).
  Both live under the `['season']` query key, so editing a bed or a planting updates
  the labels without reloading the page.
* `components/map/labels/`:
    * `geometry.ts`: label position (centroid, or the middle of the widest
      horizontal chord for concave shapes) and area.
    * `buildMapLabels.ts`: modes, zoom levels and the pure label builder.
    * `GeoFeatureLabels.tsx`: HTML markers with React portals and collision handling.
    * `imageGrid.ts`: size and columns of the plant image grid.
    * `MapLabelModeFab.tsx`: the floating button and menu.
* Labels are HTML markers, not a MapLibre symbol layer: the raster style has no
  glyphs, and HTML renders emoji icons.

---

## History of map features

Shapes keep their history since 2026-11-22: see
[Editing the Garden Map](garden-map-editing.md#history-of-shapes). Still to come:

* Season views (these labels, the timeline) have to use the geometry that was
  valid in the selected season (`geometryOn()`).
* Later a “farmer view” will render proper bed fields (rows, arrangement). The season
  labels on the map are only a simple precursor of it.

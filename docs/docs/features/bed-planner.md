# Bed Planner

The season planner says *what* grows on a bed and *when*. The bed planner adds
*where*: plants are placed in the bed one by one, as a **row** or as an **area**.
Each placement is an entity with a position relative to the bed; rows and areas
store their shape and spacing, and the single plants in them are computed.

!!! info "Status: in the app"
    The bed planner is a page of the app, `/:gardenId/beds/:patchId/plan?season=2027`
    (`patchId` is the last part of the bed's IRI). It is also available as stories in
    Storybook (`BedPlanner/BedPlanner`, `bun run storybook`), which keep everything in memory.

---

## The view

A second MapLibre map, configured for a single bed:

* **Locked to the bed.** It opens with the whole bed in view. One cannot zoom out
  further than that, nor pan away; zooming in goes up to zoom 25 (about 1.5 mm per
  pixel).
* **No drawing tools.** Instead there is a list of plants: always visible on the left
  on wide screens, behind the **Pflanzen** button on phones.
* **Plants are circles of their spacing** with the plant's main image (or emoji) inside.
  The size follows the zoom: a pumpkin with 100 cm spacing covers 100 cm of the bed.
  Rows and areas are drawn as a line or a light area with their plants, and a label
  with the plant and its number of plants (e.g. 🥕 ▱ 35).
    * dashed ring: spacing from the plant database (`physicalCharacteristics.spacing`)
    * dotted ring: spacing unknown, 30 cm assumed
    * red ring: closer to another plant than their spacing, **while both are in the bed**
      (a radish as pre-crop until May does not conflict with maize from June)
* The bed is drawn as soil with a grid (major lines every 50 cm, minor lines every
  10 cm when zoomed in), the bounding box dashed, with **0 / 0** at its top-left and
  its size (e.g. **300 × 509 cm**) at its bottom-right corner.
* Other features of the garden appear in grey; the aerial image can be switched on
  (it is blurry at these zoom levels).

### Placing plants

The list shows the plantings of the bed in the season (from the season planner),
with period, spacing and how many are placed ("6 / 12 placed" when the planting has a
number of plants; plants of rows and areas count too).

Above the list, **Place as** chooses how: **Single**, **Row** or **Area**.

| Action | Desktop | Phone |
|---|---|---|
| Place a plant | drag it from the list into the bed (Single) | — |
| Place several | Single: click it in the list, then click into the bed for each plant; **Done** or `Esc` ends | tap it in the list (the list closes), then tap into the bed |
| Draw a row | Row: click the plant, then the points of the row; double-click, `Enter` or **Finish** ends it | tap the plant, tap the points, then ✓ |
| Draw an area | Area: click the plant, then the corners; click the first corner, double-click, `Enter` or **Finish** | tap the plant, tap the corners, then ✓ |
| Undo a point | `Backspace` or ↶ | ↶ |
| Move a plant | drag it | drag it |
| Move a row or area | drag its label | drag its label |
| Spacing of a row or area | click it, then change **Spacing** (and **Row spacing**) | the same |
| Remove | click it, then **Remove** (or `Delete`) | tap it, then 🗑 |
| Another plant | **Other plant …** at the bottom of the list | same, in the list |

While drawing, a preview shows the plants the row or area will get, up to the pointer,
and the bar shows their number. After a row or area the plant stays chosen for the
next one; **Done** (✕) or `Esc` ends.

On phones, the bed stays free while drawing: the header, the zoom buttons, the aerial
image switch and the **Plants** button are hidden, and a slim bar at the bottom edge
holds ↶ (last point), ✓ (finish) and ✕ (stop). A selected plant, row or area shows a
compact card there as well.

While placing, clicks go through existing plants, so radishes can be sown inside the
pumpkin's circle. Positions outside the bed **polygon** are refused with a message,
also where the bounding box is larger than the bed. A row or an area may reach beyond
the bed; only its plants inside the bed count, and one without any is refused.

### Rows and areas

Where the plants of a row or an area stand follows from its shape and spacing
(`bedLayout.ts`):

```
row    ●───●───●───●       a plant every `spacing`, centred on the line:
                           a 300 cm row at 30 cm gets 10 plants at 15, 45, … 285 cm

area  ╱‾●‾‾‾●‾‾‾●‾╲        rows parallel to the longest edge, `rowSpacing` apart,
     │ ●   ●   ●   │       a plant every `spacing` in each row,
      ╲_●___●___●_╱        the grid centred in the area
```

* The plants keep half a spacing to the ends of a row and to the edges of a
  rectangular area, so their circles stay inside the drawn shape.
* A new row or area takes the plant's spacing (*Abstand*), an area also its row spacing
  if the plant has one (otherwise the spacing). Both are stored with the placement and
  can be changed; a later change of the plant's spacing does not rearrange existing
  rows.
* Plants of one row or area do not conflict with each other (their spacing is chosen on
  purpose), but they do with all other plants in the bed at the same time.
* At most 2000 plants per row or area are computed.

**Other plant …** searches all species and varieties. The chosen plant becomes a new
planting of this bed (status *planned*, role *main crop*, period from the plant's
planting and harvest months) and is ready to be placed.

---

## Coordinates

Plants are stored relative to the bed, in centimetres:

```
 topLeft = [west, north] ────────────── x (cm, to the east)
      │     ╱‾‾‾‾‾‾‾‾‾‾╲
      │    │    bed     │
      │     ╲__________╱
      y (cm, to the south)              bottomRight = [east, south]
```

The reference ("frame") is the **bounding box** of the bed polygon: its top-left
(north-west) corner is the origin, x grows to the east, y to the south. A bed of a few
metres is converted with a local equirectangular approximation, the same as for the
map labels, so sizes agree everywhere.

All of this is in `frontend-vite/src/components/bed-planner/bedFrame.ts` (pure
functions, unit tests in `bedFrame.test.ts`):

| Function | Purpose |
|---|---|
| `bboxFrame(geometry)` | frame of a bed: corners, size in cm, `toLocal` / `toLngLat` |
| `boundingBox(ring)` | top-left and bottom-right corner of a polygon |
| `outlineLocal`, `insideBed` | the polygon in bed coordinates; is a point inside it? |
| `gridLines(frame, step, major)` | grid as GeoJSON |
| `plantDiameterCm(plant)` | spacing, else spread, else 30 cm |
| `fitZoom`, `cmToPx` | zoom that shows the whole bed; centimetres in pixels |
| `spacingConflicts(plants)` | plants closer than their spacing at the same time (not within one row or area) |

Rows and areas are in `bedLayout.ts` (unit tests in `bedLayout.test.ts`):

| Function | Purpose |
|---|---|
| `pointsAlongLine(points, spacing)` | plants of a row |
| `pointsInArea(ring, spacing, rowSpacing)` | plants of an area |
| `shapePlants(shape, spacing, rowSpacing, bedOutline)` | the same, only those inside the bed |
| `shapeLabelPoint`, `translateShape` | where the label sits; moving a row |
| `polylineLength`, `polygonArea` | length (cm) and area (cm²) |
| `shapeToWkt`, `shapeFromWkt` | the stored form of a shape |

The frame has a `kind` (`'bbox'`), so further frames can be added, e.g. a rotated
rectangle along the bed's long side.

---

## Data model: `PlantPlacement`

A new type next to `Planting` (`schema/planting-schema.ts`, also in the typed store
registry `schema/registry.ts`):

| Field | Meaning |
|---|---|
| `planting` | the planting this plant belongs to: species, variety, bed and period come from there |
| `x` | centimetres from the left (west) edge of the bed's bounding box; for a row or area its first point |
| `y` | centimetres from the top (north) edge of the bed's bounding box; for a row or area its first point |
| `shape` | empty for a single plant; a row as `LINESTRING (59 49, 96 369)`, an area as `POLYGON ((8 55, 37 49, 71 440, 27 430, 8 55))` – WKT in bed centimetres |
| `spacing` | centimetres between the plants of a row or area |
| `rowSpacing` | centimetres between the rows of an area |
| `name`, `notes` | optional |

There are no absolute coordinates: they follow from the bed and the frame. The single
plants of a row or area are not stored; they are computed from `shape`, `spacing` and
`rowSpacing`.

`PlantInfo` of the season read model now carries `spacing` and `rowSpacing` (cm),
imported from the plant cards' *Abstand*.

---

## Turning the bed

Many beds stand at an angle (about 45° when the map is north-up). The planner turns the
map so that the bed's longest side is straight, and the grid follows, so it fits the bed.

* By default the turn is **automatic**: the smallest rotation (−45° … 45°) that makes the
  longest side vertical or horizontal.
* The turn tool sits below the zoom buttons (compass icon) and is folded away until opened. Its buttons turn the bed in 5° steps. **Nord** shows it north-up,
  **Auto** goes back to the automatic turn.
* A turn you set is **saved with the bed** (`Patch.planRotation`, degrees clockwise; empty
  means automatic), so the plan always opens the same way. It also appears as
  *Drehung im Beetplan* in the bed's edit form.
* Turning only changes the view. Placements stay in the north-up frame (see
  [Coordinates](#coordinates)), so they never move when you turn the bed; the *x / y*
  shown for a selection are those north-up values, and the grid's origin label is shown only
  when the bed is not turned.

## In the app

* Open it with the **Beetplan** button in the bed card (click a bed on the map). The
  back arrow in the header returns to where you came from.
* Placements are saved through Graviola's typed store (`useBedPlanStore`, the second
  implementation of `BedPlanApi` next to the in-memory `useBedPlanState`). Changes show
  at once and are written one after the other; if a write fails, the placements are read
  again and a message appears. The spacing fields are written once typing pauses.
* Deleting a planting also deletes its placements (`usePlacementCleanup` listens to the
  store's remove events), so no orphans stay behind.
* Spec: `e2e/cypress/e2e/bed-planner.cy.ts` places a plant and a row, reloads, and
  removes them again.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/bed-planner.cy.ts.mp4" type="video/mp4">
</video>

## Limits

* The view is north-up; beds are not turned to their long side yet.
* The map zooms in up to zoom 25. Big beds (10 m) can be magnified about 16 times, the
  smallest (about 1 m) less than twice.
* If a bed polygon is redrawn so that its north-west corner moves, the plants move
  with it (they are stored relative to that corner).
* Small plants are drawn at least 18 px wide (in rows and areas 8 px); when zoomed out
  they look bigger than their spacing.
* The points of a row or area cannot be moved yet: remove it and draw it again.
* Areas are filled in a square grid; there is no staggered (triangular) pattern yet.

## Outlook

* **Strips** filled automatically: most of the workshop sketches divide beds into
  strips (e.g. Igel-Beet: carrots | maize | pumpkin | maize | carrots, the story
  *Rows And Areas*); the bed could be split into strips along its long side in one step.
* Moving the points of a row or area; a staggered pattern for areas.
* An entry from the season timeline as well, not only from the map card.
* Placed plants on the garden map at high zoom.
* A time slider for pre-crops and successions.
* A rotated frame.

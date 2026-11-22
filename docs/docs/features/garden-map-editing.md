# Editing the Garden Map

The garden map has two modes. **Viewing** is the default and read-only: beds and
other features are shown with their names or plantings, and a click opens the
feature's card. **Editing** starts with the **Bearbeiten** button in the top left
corner and ends with **Fertig** in the bar at the bottom edge.

Since 2026-11-22 the shapes keep a **history**: when a bed changes in the garden,
its old outline is kept with dates, so it stays traceable what grew where.

---

## The edit bar

| Element | What it does |
|---|---|
| **Auswählen** | click a shape, then drag its corners; dragging the small point in the middle of an edge adds a corner, right-click on a corner removes it |
| **Fläche** | draw a new area: set points, click the first point to close |
| **Rechteck** | draw a rectangle at any angle: two points for one side, then the width |
| **Punkt** | set a point (e.g. a fire place) |
| ↶ **Rückgängig** | undoes the last change of this session (also a newly drawn shape) |
| 🗑 **Entfernen** | takes the selected shape off the map, after a confirmation (see below) |
| 🕘 chip | how changes are kept: *Veränderung ab 22.11.2026* or *Einrichtung* |
| **Fertig** | ends editing; saves what becomes history |

* Only the corners of a shape can be moved, never the whole shape: a bed cannot be
  shifted by accident.
* While editing, the bed names stay visible, so you know which shape is which.
* The selected shape is orange; its name is shown in the bar. A shape that nothing
  refers to yet (e.g. one drawn just now) is *Ohne Zuordnung*, with a button
  **Beschreiben …** that opens the wizard to make it a bed, a shed, …
* Escape cancels a shape that is being drawn, or ends the selection.
* On phones the bar is slim (icons only, two lines) and the map stays free.

Every edit is saved at once. When editing starts, the shapes are loaded fresh from the
store, so changes made elsewhere in the meantime are not overwritten.

## History of shapes

A shape (`GeoFeature`) keeps its IRI for its whole life. Beds, labels and plantings
stay linked to it. What changes is its outline over time:

```
GeoFeature  geo = current outline, validFrom = 2026-11-22
   └─ versions
        ├─ GeoFeatureVersion  geo = …, validFrom = 2025-04-01, validUntil = 2026-11-22
        └─ GeoFeatureVersion  geo = …,                         validUntil = 2025-04-01
```

Periods are half-open intervals of days, **[validFrom, validUntil)**: `validUntil` is
the first day a shape no longer holds. No `validFrom` means *since always*, no
`validUntil` means *still valid*.

### Correction or change?

Not every moved corner is a change in the garden. Sometimes a shape was just drawn
badly. The garden decides it with one switch, **Garten wird eingerichtet**
(`Garden.setupMode`, in the 🕘 chip of the bar and in the garden's form):

| Setup mode | When **Fertig** is clicked |
|---|---|
| on | changes are **corrections**: the outline is replaced, no history |
| off (default) | every changed shape is a **change in the garden** from the date in the chip (default: today, not in the future): the outline at the start of the session is kept as a `GeoFeatureVersion` up to that day, the shape is valid from that day |

* One session gives at most **one version per shape**, however many corners were moved.
* A shape drawn in the same session, or one whose current outline began on the change
  day, is only corrected (a version would have an empty period).
* So nobody is asked all the time: while a garden is set up, the switch is on; later
  it is off, and every change leaves a trace.

### Taking a shape off the map

**Entfernen** never deletes history in the normal views:

* A shape that exists since before this session gets `validUntil` = the change day.
  It disappears from the current map but stays in the garden and in the history.
* A shape drawn in this session that nothing refers to is deleted completely – it
  never existed in the garden.

A real delete will come later in an administrative view.

A bed (`Patch`) may exist without a shape.

## Implementation

`components/map/edit/`:

| File | Purpose |
|---|---|
| `shapeHistory.ts` | pure rules: validity (`isValidOn`, `isCurrent`, `currentShapes`), `geometryOn(feature, day)`, `shapeChange` (correction or version), `versionBefore`, `removal` – unit tests in `shapeHistory.test.ts` |
| `drawEvents.ts` | `isEditFinish`: TerraDraw's `finish` also ends every edit in select mode; only the action `draw` is a new shape (this caused duplicated beds before 2026-11-22) |
| `useShapeEditor.ts` | TerraDraw with the MapLibre adapter, started only while editing and stopped afterwards; select mode with corner editing only; session bookkeeping (start outlines, new shapes, undo stack); writes run one after another |
| `useShapePersistence.ts` | the writes through Graviola: create (and add to `Garden.geoFeatures`), update, end or delete, keep versions at the end of a session, `setupMode` |
| `MapEditBar.tsx` | the bar, the history popover and the confirmation dialog |

* The map no longer uses the `@watergis/maplibre-gl-terradraw` control: its toolbar was
  always there (also in the view mode), and its collapse button looked like a second
  edit button. TerraDraw is used directly (`terra-draw` + `terra-draw-maplibre-gl-adapter`).
* Schema: `GeoFeature.validFrom`, `validUntil`, `versions`; new type
  `GeoFeatureVersion` (`schema/geo-feature-schema.ts`, registry, translations);
  `Garden.setupMode`.
* The view shows only current shapes (`currentShapes`); labels likewise.
* Spec: `e2e/cypress/e2e/garden-map-edit.cy.ts` draws a shape, moves a corner,
  undoes it, keeps a version of an older shape and takes shapes off the map.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/garden-map-edit.cy.ts.mp4" type="video/mp4">
</video>

## Not yet

* Season views (labels of a past season, the timeline, the bed planner) still use the
  current outline; `geometryOn()` is there for them.
* The history cannot be seen on the map yet (e.g. a time slider or a list of earlier
  shapes in the bed card).
* Changes from a date in the future (e.g. "enlarged from the 2027 season").
* The bed planner stores plants relative to the north-west corner of the bed's
  bounding box; enlarging a bed to the west or north moves its plants.
* A real delete in an administrative view.

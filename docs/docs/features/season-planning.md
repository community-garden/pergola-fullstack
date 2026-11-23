# Season Planning (Saisonplanung)

Plan which plant grows on which bed and when, so the garden group can discuss the
coming season together. Everything can be edited by hand (forms, timeline, map),
and the data model is simple enough that an AI assistant such as Claude Code can
write plans straight into the store.

The focus is **gardening, not botany**: the plant facts are the ones printed on a
seed packet. Botanical depth (taxonomy, Wikidata, …) can be added later with an
overlay ontology. The schema keeps those fields, but the forms hide them.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/season-planner.cy.ts.mp4" type="video/mp4">
</video>

---

## Data model

All types live in the garden ontology `https://ontology.semantic-desk.top/garden#`
(JSON Schema + zod in `frontend-vite/src/schema/`).

| Type | Purpose | Key fields |
|---|---|---|
| `PlantSpecies` (Art) | a crop, e.g. *Kartoffeln* | `name`, `icon`, `family`, `nutrientDemand` (heavy/medium/light), `perennial`, seed-packet facts (`sowingInfo`, `plantingInfo`, `spacingInfo`, `siteInfo`, `careInfo`, `harvestInfo`, `hint`), `growingSeason` (months 1–12: `preCultivation*`, `sowing*`, `planting*`, `harvest*`), `gardeningInfo.companions/antagonists` |
| `PlantVariety` (Sorte) | a variety of a species, e.g. *Belana* | `name`, `species` → PlantSpecies, `characteristics`, `sourceInfo` |
| `SeedStock` (Saatgut) | seed / tubers / young plants in stock | `plantSpecies`, `plantVariety`, `quantity`, `unit`, `source`, `year`, `viableUntil`, `storageLocation`, `keeper` → Person |
| `Planting` (Pflanzung) | **one plant on one bed for a period** | `plantSpecies`, `plantVariety`, `patch` → Patch (empty = wish), `startDate`, `endDate` (`YYYY-MM-DD`, may span years), `quantity` + `quantityUnit`, `role`, `status`, `requestedBy` → Person, `notes` |
| `Person` (Gärtner:in) | a gardener, name only | `name`, `description` |
| `Patch` (Beet) | existing bed type | new: `responsiblePersons` → Person[] |

* **Pre-crops, catch crops and successions** are simply additional plantings on the
  same bed with other dates and another `role`
  (`main`, `pre_crop`, `catch_crop`, `post_crop`, `green_manure`, `perennial`).
* **Status** follows the season: `wish` → `planned` → `sown` / `planted` → `harvested`
  (or `cancelled`).
* References to plants, beds and persons are always rendered as **dropdowns**
  (`typeNameUiSchemaOptionsMap[Type].dropdown`, and `options.dropdown` on array
  controls such as `responsiblePersons`), never with the entity finder.

The older `PlantingPlan` / `PlantingPlanItem` types are unused and left untouched.

---

## User interface

### Pflanzen & Saatgut (`/:garden/plants`)

Tabs **Arten · Sorten · Saatgut · Pflanzungen · Kalender**. The tables use the
Graviola `SemanticTable`, rows open the edit dialog, *Create new* adds entries.
**Kalender** shows the month windows of all species and varieties (pre-cultivation,
sowing, planting out, harvest).

### Saisonplanung (`/:garden/season-planner`)

A timeline with one row per bed and one bar per planting. The planner opens **read-only**,
so a stray click or drag cannot change anything. The **Bearbeitungsmodus** switch (chip in
the toolbar, icon next to the column-collapse button) turns editing on; it is off again after
every reload. In edit mode:

| Action | Result |
|---|---|
| click an empty spot in a row | new planting dialog, bed and date prefilled |
| drag a bar | move the planting (dates are saved, snapping to days) |
| drag the bar edges | change start / end |
| click a bar | edit dialog |
| click a chip in **Wunschliste** | edit the wish, e.g. assign a bed |

Without edit mode a click on a bar opens the planting's detail dialog, and the **new planting**
button and the wish chips do nothing. A click on a **bed name** opens the bed's detail dialog
(see [Entity Detail View](entity-detail.md)); its button **Beetplanung öffnen** leads to the bed page.

Colours encode the role, dashed bars are wishes. The thin strip at the bottom of a
bar shows the plant's calendar windows, so you can see roughly when to sow,
plant out and harvest. The toolbar switches between this and next season (from
September on, the next season is the default) and zooms.

Rows are the garden's beds (patches whose geo feature belongs to the garden, plus
beds without geometry), sorted community beds → single beds → other areas.

### Map

Clicking a bed on the garden map shows its responsible persons and the plantings
of the season, with **Pflanzung hinzufügen** and **Beet bearbeiten** (responsible
persons are chosen from a dropdown).

The map can also label each bed with the plants of a season, see
[Garden Map Labels](garden-map.md).

### Persons

*Einstellungen → Gärtner:innen* lists all persons; new ones can also be created
from the dropdowns.

---

## Implementation notes

* **Read side**: the timeline, calendar tab and map card load beds, plantings,
  plants and persons with four flat SPARQL `SELECT`s
  (`frontend-vite/src/api/season.ts`, hook `useSeasonData`). This is one round trip
  for ~100 rows instead of paging typed documents.
* **Write side** goes through the Graviola store (`usePlantingMutations`):
  moving a bar loads the planting, reduces references to `{ "@id" }` and upserts
  it, so referenced plants/beds are never rewritten. Afterwards the `['season']`
  queries are invalidated.
* The scheduler (`components/season-planner/scheduler/`) gained `variant`
  (`outlined` bars), `segments` (phase strip) and `tooltip` on items.

---

## Importing the Wurzelwerk plant cards

`Saisonplanung/pflanzen/*.json` (plant cards of the 2026 planning round) can be
imported into a local store:

```bash
scripts/local-dev.sh seed-season 2027
```

`scripts/import-saisonplanung.py` creates species, varieties, persons, the wishes as
plantings (`status: wish`, dates derived from the card calendar, bed from the card
where known) and links single-bed owners as responsible persons. The generated
Turtle (`frontend-vite/fixtures/local/`) contains first names of garden members
and is **gitignored**. Re-running the command resets the imported entities;
plantings created in the app are kept.

---

## Planning with Claude Code

Plans can be written directly into the SPARQL store. Conventions:

* entity IRIs: `https://data.semantic-desk.top/garden/<Type>/<slug>`
  (e.g. `…/Planting/2027-kartoffel-belana`); the app itself creates
  `https://ontology.semantic-desk.top/garden#<Type>/<id>`
* dates are plain strings `"YYYY-MM-DD"`, quantities `xsd:integer`/`xsd:decimal`
* look up bed IRIs by name: `SELECT ?bed WHERE { ?bed a g:Patch ; g:name "Igel-Beet" }`

Example — plant 30 *Belana* potatoes on *Einzelbeet 3* as main crop:

```bash
curl -X POST http://localhost:7880/update --data-urlencode 'update=
PREFIX g: <https://ontology.semantic-desk.top/garden#>
INSERT { <https://data.semantic-desk.top/garden/Planting/2027-belana-eb3> a g:Planting ;
           g:plantSpecies <https://data.semantic-desk.top/garden/PlantSpecies/kartoffel> ;
           g:plantVariety <https://data.semantic-desk.top/garden/PlantVariety/kartoffel-belana> ;
           g:patch ?bed ;
           g:startDate "2027-04-15" ; g:endDate "2027-08-31" ;
           g:quantity 30 ; g:quantityUnit "plants" ;
           g:role "main" ; g:status "planned" ; g:name "Kartoffeln · Belana" . }
WHERE { ?bed a g:Patch ; g:name "Einzelbeet 3" }'
```

Reload the season planner (or switch the season back and forth) to see it.

---

## Tests

`e2e/cypress/e2e/season-planner.cy.ts` (read-only: opens dialogs and cancels them).
Run locally against the Vite dev server inside the nix e2e shell:

```bash
BASE_URL=http://localhost:5173 scripts/run-cypress-local.sh cypress/e2e/season-planner.cy.ts
```

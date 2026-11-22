# Graviola 2026-11 upgrade

Pergola uses the `@graviola/*` releases of 2026-11-21 (e.g. `sparql-schema` 1.8.1,
`sparql-db-impl` 1.9.2, `edb-state-hooks` 1.8.3, `edb-table-components` 2.2.0,
`edb-advanced-components` 1.7.8, `sparql-store-provider` 7.0.3). The frontend and
the watering API use the same versions.

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/graviola-views.cy.ts.mp4" type="video/mp4">
</video>

!!! warning "Needs a sparql-schema patch release"
    In `sparql-schema` 1.8.1, paged list queries leave required properties unbound
    outside their subquery. Tables then show **no names** for plant species and
    persons (the name column only has the image). The fix is on branch
    `fix/paged-select-required-outer` of graviola-framework (commit 8b4b0ae3) and
    must be published before the tables are usable again. The video above was
    recorded with that fix applied locally.

---

## What changed for Pergola

### Saving

Saves write with `INSERT DATA`: nested objects (blank nodes such as
`growingSeason` or `gardeningInfo`) are neither duplicated (2026-09 release) nor
left behind as orphans (July release). `frontend-vite/src/__tests__/sparql-datastore.test.ts`
saves Knoblauch twice and checks that there is exactly one of each nested object, no
orphans and the same number of triples.

Graviola's `remove()` still leaves nested blank nodes behind. Where Pergola deletes
itself (`hooks/useDeleteEntity.ts`, `removeDocument()` in the watering API) it first
upserts an empty document, which deletes them.

An upsert replaces the whole document, arrays included. Send complete documents and
reduce links to `{ "@id" }` (`utils/toReferences.ts`), so a stale embedded copy of a
linked entity is never written back.

### Relations are loaded on request

`filterOne` / `filterMany` (and `useTypedFilterStore`) load named relations only when
they are listed in `include`:

```ts
loadDocumentAsync(gardenIRI, {
  include: { geoFeatures: true, patches: true, mainGeoFeature: true },
});
```

`loadOne` (forms, detail view) still loads relations.

### Typed store API

`schema/registry.ts` maps store type names to the zod-inferred types.
`hooks/usePergolaStore.ts` returns the store typed with it, so `where`, `include` and
`select` are checked against the model:

```ts
const { store } = usePergolaStore();
await store?.filterMany('Planting', {
  where: { status: 'planned' },
  include: { patch: { maxRecursion: 0 } },
});
```

The season planner (`api/season.ts`) reads plants, persons, beds and plantings this
way instead of hand-written SPARQL. `api/__tests__/season-typed.test.ts` compares the
result field by field with the former SPARQL queries.

The watering API filters availability with
`where: { garden: { "@id": gardenIri }, targetMonth }` instead of listing every
document and matching IRIs.

Limits of the SPARQL implementation (2026-11):

| Wanted | Status |
|---|---|
| `{ rel: { "@id": iri } }`, `OR` of those, scalar operators | works |
| `"@id": { in: [...] }` | *Unknown filter operator: @id* — use `OR` |
| "relation is missing", `NOT` on a relation's fields | not supported — filter on the client |
| `where` on inverse properties | returns nothing (graviola-framework issue #5) |
| `orderBy` / `skip` / `take` at top level | not supported; `limit` cuts after loading |
| `count` with `where` | ignores the filter |

### Tables

* Column visibility: `tableUiSchema` with property scopes, see
  `components/graviola/table/hiddenColumns.ts`. `#/properties/name` covers
  `name_single`, `name_entity` and `name_label_group`.
* Graviola's **Show / Edit / Delete permanently** appear per row again (English labels
  for now).
* Pergola's own row entries come from `hooks/usePergolaRowActions.ts`, passed as
  `actionRegistry`:
    * plant species and varieties: **Pflanzung anlegen** (planting dialog prefilled with
      the plant; a variety also brings its species)
    * plantings: **Duplizieren** (same bed, plant, period and amount)

### Detail view and intent bus

The detail dialog renders Graviola's new detail view (image header, field grid,
nested sections, chips). Since 2026-11-22 the dialog itself is Pergola's own, without
Graviola's large side image — see [Entity Detail View](../features/entity-detail.md). `provider/useDetailViewConfig.ts` hides technical fields and
turns the JSON Forms translations (`i18n/<lang>/jsonforms.json`) into labels.
Fields inside nested sections still show the schema titles.

Graviola components send intents (show, edit, saved, removed, navigate).
`provider/PergolaIntentBus.tsx` answers them and wraps `NiceModal.Provider`, so intents
from modals arrive too, e.g. **Edit** in the detail view and the *Gespeichert* message
after saving. The router therefore sits in `main.tsx`, above the Graviola provider.

### Form labels of relations

Relation fields (linked-data-renderer 7) render an `@id` control, so JSON Forms asks
for `plantSpecies.@id.label`. `hooks/useJsonFormsTranslator.ts` falls back to
`plantSpecies.label`.

---

## Upstream issues

* `sparql-schema`: required properties unbound outside the paged subquery (fixed on
  `fix/paged-select-required-outer`, not yet published).
* `remove()` leaves nested blank nodes (orphans).
* `loadOne` returns a stub `{ "@id" }` for unknown IRIs instead of `null`.
* Built-in row actions have fixed English labels; the table adapter drops their icons.
* The detail renderer has no translator, and nested sections ignore label overrides.
* Typed `where`: no `@id: { in }`, no "relation missing", inverse properties return
  nothing, no top-level ordering or paging, `count` ignores `where`.

## Tests

```bash
# integration tests against the local stack (scripts/local-dev.sh up)
VITE_SPARQL_API_URL=http://localhost:7880/query bun test frontend-vite/src/__tests__/sparql-datastore.test.ts
VITE_SPARQL_API_URL=http://localhost:7880/query bun test frontend-vite/src/api/__tests__/season-typed.test.ts

# e2e
BASE_URL=http://localhost:5173 scripts/run-cypress-local.sh cypress/e2e/graviola-views.cy.ts
```

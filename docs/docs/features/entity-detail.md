# Entity Detail View

Every entity (plant species, variety, bed, planting, person, …) can be shown in a
detail dialog: **Show** in a table's row menu, a click on an entity chip, or a
`show-entity` intent. The dialog is Pergola's own; its content is Graviola's detail
renderer.

!!! info "Status: in the app, examples in Storybook"
    The dialog replaces Graviola's `EntityDetailModal` for the whole app. The examples
    are in Storybook under **Entity detail → Detail dialog** (`bun run storybook`); this
    is where new views for the entity types are worked out first.

---

## The dialog

* **A slim header** with the kind of entity (*Pflanzenart*, *Beet*, *Pflanzung*, …) and
  a close button. The name is not repeated there; it is in the card below.
* **The card with the image on top**: main image (if the type has one, e.g.
  `imageUrl` of plants), name and short description — the type's primary fields.
  Graviola's own modal also showed the main image a second time, very large, on the
  left; that side image is gone.
* **The properties** below the card, as the detail renderer lays them out.
* **Bearbeiten** opens Graviola's edit dialog on top (not shown when the dialog was
  opened read-only); **Schließen** closes.
* On phones the dialog fills the screen.

## How the content is made: structured dispatch

The content is not hand-written per type. Graviola's detail renderer walks a UI
schema — generated from the type's JSON schema unless one is configured — and asks a
**registry** for each element: every renderer has a *tester* that scores how well it
fits (a named entity, an array of entities, an enum, a date, a layout, …); the best
one renders the element and dispatches its children the same way. Layouts:

| Layout | What it looks like |
|---|---|
| `TopLevelLayout` (default) | card with image, name and description on top, then the properties |
| `TopLevelLayout`, variant `singleCardPropertiesFirst` | one card: the image bleeds to the edges, properties inside the card |
| `ArticleLayout` | title and lede, sections, and an info box on the side |

Where the settings live:

| Setting | Where |
|---|---|
| app-wide detail settings: hidden fields, depth, labels from `i18n/<lang>/jsonforms.json` | `frontend-vite/src/provider/useDetailViewConfig.ts` (`viewConfig.detail`) |
| per type: own UI schema (`uiSchemata`), extra renderers (`extraRenderers`, tester + renderer), layout | also `viewConfig.detail`, or per dialog via the `config` prop |
| image, name and description of the card | `primaryFields` of the type (`schema/*-schema.ts`) |

## Code

| File | Purpose |
|---|---|
| `components/entity-detail/EntityDetailDialog.tsx` | the dialog; pure presentation, the entity comes in as `data` |
| `components/entity-detail/PergolaEntityDetailModal.tsx` | NiceModal around it: resolves the type, loads the entity, opens the edit dialog; registered as `MODAL_ENTITY_DETAIL` in `provider/GraviolaProvider.tsx` |
| `stories/EntityDetail.stories.tsx`, `stories/fixtures/entityDetail.ts` | Storybook examples |
| `.storybook/GraviolaViewsProvider.tsx` | Storybook decorator: Graviola context with the full garden schema and the app's view settings, but no store |

## Storybook

The stories render the dialog from fixtures, without SPARQL. They use the same
schema and the same `useDetailViewConfig` as the app, so a change to a renderer or a
UI schema shows up in Storybook and in the app alike.

* one story per type: plant species (two), variety, bed, planting, person
* states: loading, read-only, phone
* the two other layouts, on the Knoblauch example
* the toolbar switches between German (default) and English

Plant images come from `frontend-vite/public/media` (not versioned); without them the
card has no image. Persons in the fixtures are made up.

## Starting points for the next views

Seen in the stories, not changed yet:

* enum values are shown raw (`bed`, `main`, `wish`) instead of their translations
* the bed shows its geo feature as an IRI chip
* a variety has no image of its own; it could fall back to its species' image
* the IRI is printed below the properties

## Test

`e2e/cypress/e2e/graviola-views.cy.ts` opens Knoblauch from the plant table: the
dialog shows *Pflanzenart*, the translated labels and the image exactly once; **Bearbeiten**
opens the edit dialog. The video is on the
[Graviola upgrade page](../development/graviola-upgrade.md).

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/graviola-views.cy.ts.mp4" type="video/mp4">
</video>

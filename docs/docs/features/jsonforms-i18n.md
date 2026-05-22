# JsonForms i18n — Form Field Translations

## Overview

Garden entity forms (Workshop, Shed, Patch, Plant Species, etc.) are rendered by [JsonForms](https://jsonforms.io/) via the Graviola `SemanticJsonForm` component.  Without a `translate` function, JsonForms falls back to raw JSON Schema property names (`workshopType`, `hasHeating`) as field labels and shows cryptic AJV validation messages.

This page describes how the i18n integration works and how to extend it.

---

## Architecture

```
react-i18next (jsonforms namespace)
        │
        ▼
useJsonFormsTranslator hook
  (frontend-vite/src/hooks/useJsonFormsTranslator.ts)
        │
        ▼ jsonFormsProps.i18n = { locale, translate }
SemanticJsonForm (NewFeatureForm.tsx)
        │
        ▼
JsonForms internal renderer
  calls translate("fieldName.label", defaultMessage)
  calls translate("fieldName.enumValue", defaultMessage)
  calls translate("error.required", defaultMessage)
```

### Translation namespace: `jsonforms`

Keys follow the JsonForms convention:

| Type | Key pattern | Example |
|---|---|---|
| Field label | `fieldName.label` | `workshopType.label` → "Typ" |
| Enum option | `fieldName.enumValue` | `workshopType.greenhouse` → "Gewächshaus" |
| Global error | `error.keyword` | `error.required` → "Pflichtfeld" |

Translation files live at:
- `frontend-vite/src/i18n/de/jsonforms.json`
- `frontend-vite/src/i18n/en/jsonforms.json`

---

## Generating / updating translations

The translation files were initially generated from the JSON Schemas using `@graviola/json-schema-utils`'s `extractTranslationKeysFromSchema`.  The generation script lives at:

```bash
scripts/generate-jsonforms-translations.ts
```

Run it when schemas change:

```bash
docker run --rm \
  -v $(pwd):/workspace \
  -v $(pwd)/node_modules:/workspace/frontend-vite/node_modules \
  -w /workspace \
  oven/bun:1.3.10-alpine \
  bun scripts/generate-jsonforms-translations.ts
```

This writes a scaffold to both locale files (English descriptions as defaults).  Fill in German translations in `de/jsonforms.json`.

---

## Dev-mode missing key logging

In development, any key that is not found in the `jsonforms` namespace is logged to the browser console:

```
[JsonForms i18n] missing key: someField.label | default: someField
```

Watch for these in `docker-compose logs -f frontend-dev` to find gaps after adding new schema fields.

---

## Cypress test

The spec `e2e/cypress/e2e/jsonforms-i18n.cy.ts` verifies:

1. The `jsonforms` namespace loads in both `de` and `en`
2. Core field labels resolve correctly (`name.label`, `workshopType.label`, etc.)
3. Enum values translate correctly (`workshopType.greenhouse`, `shedType.tool_shed`, etc.)
4. Error messages are human-readable (`error.required` → "Pflichtfeld")

<video controls width="100%" style="border-radius:8px">
  <source src="/media/cypress/videos/jsonforms-i18n.cy.ts.mp4" type="video/mp4">
</video>

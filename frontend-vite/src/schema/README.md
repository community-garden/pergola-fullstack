# Garden Schema Documentation

This directory contains the complete data model for the garden management application using Zod schemas converted to JSON Schema Draft 7 for Graviola integration.

## Zod with `$ref` and `$defs`

We use Zod with special configuration to generate proper JSON Schema with references:

```typescript
// 1. Define schemas with `.meta({ id: "TypeName" })`
const PlantSpeciesSchema = z
  .object({
    name: z.string(),
    // ...
  })
  .meta({
    id: "PlantSpecies",  // ← This enables $ref generation
    title: "Plant Species",
  });

// 2. Convert with `reused: "ref"` option
const jsonSchema = z.toJSONSchema(PlantSpeciesSchema, {
  target: "draft-7",
  reused: "ref",  // ← Extract reused schemas as $defs with $ref
});
```

This generates proper JSON Schema with:
- **`$defs`** - Extracted definitions for reused schemas
- **`$ref`** - References like `{ $ref: "#/$defs/PlantSpecies" }`
- **Type safety** - Runtime validation with Zod + compile-time types

### Benefits

✅ **Best of both worlds:**
- Zod for runtime validation and TypeScript inference
- Proper `$ref`/`$defs` for Graviola's linked data system
- Type-safe schema definitions
- Single source of truth

## Schema Overview

### Named Entities

All named entities have `@id` and `@type` fields and can exist independently:

#### 1. **Garden** (`garden#Garden`)
The main garden container.

**Properties:**
- `name` (string, required) - Garden name
- `description` (string, optional) - Description
- `location` (WKT string, optional) - Location as WKT POINT
- `area` (number, optional) - Total area in m²
- `patches` (array, optional) - References to patches in this garden

#### 2. **Patch** (`garden#Patch`)
A specific area within a garden (bed, greenhouse, etc.).

**Properties:**
- `name` (string, required) - Patch name
- `icon` (string, optional) - Icon identifier
- `geometry` (string, optional) - GeoJSON Feature
- `description` (string, optional) - Description
- `patchType` (enum, optional) - Type: `bed`, `greenhouse`, `container`, `field`, `other`
- `plantingPlans` (array, optional) - References to associated planting plans
- `area` (number, optional) - Area in m²

#### 3. **PlantingPlan** (`garden#PlantingPlan`)
A seasonal plan for what to plant.

**Properties:**
- `name` (string, required) - Plan name
- `season` (string, optional) - Season/year (e.g., "Spring 2024")
- `description` (string, optional) - Description
- `items` (array, optional) - List of planting plan items
- `startDate` (ISO date string, optional) - Plan start date
- `endDate` (ISO date string, optional) - Plan end date

#### 4. **PlantSpecies** (`garden#PlantSpecies`)
A plant species with botanical information.

**Properties:**
- `name` (string, required) - Common name
- `scientificName` (string, optional) - Scientific botanical name
- `family` (string, optional) - Botanical family
- `description` (string, optional) - Description
- `growingSeason` (object, optional) - Year-independent growing season data
- `sunRequirement` (enum, optional) - `full_sun`, `partial_shade`, `full_shade`
- `waterRequirement` (enum, optional) - `low`, `medium`, `high`
- `spacing` (number, optional) - Recommended spacing in cm
- `height` (number, optional) - Typical height in cm

#### 5. **PlantVariety** (`garden#PlantVariety`)
A specific variety of a plant species.

**Properties:**
- `name` (string, required) - Variety name
- `species` (reference, optional) - Reference to PlantSpecies
- `description` (string, optional) - Description
- `growingSeason` (object, optional) - Year-independent growing season data
- `characteristics` (string, optional) - Special characteristics
- `sourceInfo` (string, optional) - Seed source or breeder information

### Embedded Objects

#### PlantingPlanItem
Part of a PlantingPlan, not a standalone entity.

**Properties:**
- `plantSpecies` (reference, optional) - Reference to PlantSpecies
- `plantVariety` (reference, optional) - Reference to PlantVariety
- `plannedQuantity` (number, optional) - Planned quantity
- `notes` (string, optional) - Notes
- `priority` (enum, optional) - `low`, `medium`, `high`

#### GrowingSeason
Year-independent growing season information.

**Properties:**
- `sowingStart` (number 1-12, optional) - Start month for sowing
- `sowingEnd` (number 1-12, optional) - End month for sowing
- `prickingStart` (number 1-12, optional) - Start month for pricking out
- `prickingEnd` (number 1-12, optional) - End month for pricking out
- `plantingStart` (number 1-12, optional) - Start month for planting
- `plantingEnd` (number 1-12, optional) - End month for planting
- `harvestStart` (number 1-12, optional) - Start month for harvest
- `harvestEnd` (number 1-12, optional) - End month for harvest

## Entity Relationships

```
Garden
  └─> patches[] → Patch
                    └─> plantingPlans[] → PlantingPlan
                                            └─> items[] → PlantingPlanItem
                                                            ├─> plantSpecies → PlantSpecies
                                                            └─> plantVariety → PlantVariety
                                                                                └─> species → PlantSpecies
```

## Schema Relationships via `$ref`

When you reference a Zod schema with an `id` in `.meta()`, Zod automatically generates `$ref`:

```typescript
// Define reusable schemas with id
const PlantSpeciesSchema = z.object({...}).meta({ id: "PlantSpecies" });

// Reference them in other schemas
const PlantVarietySchema = z.object({
  species: PlantSpeciesSchema.optional(),  // ← Will become $ref
}).meta({ id: "PlantVariety" });

// Convert with reused: "ref"
z.toJSONSchema(PlantVarietySchema, { reused: "ref" });
// => { 
//   $defs: {
//     PlantSpecies: { type: "object", ... },
//     PlantVariety: {
//       properties: {
//         species: { $ref: "#/$defs/PlantSpecies" }  // ← Auto-generated!
//       }
//     }
//   }
// }
```

This is much cleaner than manually writing JSON Schema!

## Overridable Properties with Nested Objects

Properties that can be overridden in varieties are organized into nested dictionaries:

```typescript
// Define reusable nested schemas (no id = inlined)
const RequirementsSchema = z.object({
  sun: z.enum(["full_sun", "partial_shade", "full_shade"]).optional(),
  water: z.enum(["low", "medium", "high"]).optional(),
}).optional();

const TimingSchema = z.object({
  germinationDays: z.number().int().positive().optional(),
  daysToHarvest: z.number().int().positive().optional(),
}).optional();

// Use as nested properties in both Species and Variety
const PlantSpeciesSchema = z
  .object({
    name: z.string(),
    requirements: RequirementsSchema,  // ← Nested object
    timing: TimingSchema,              // ← Nested object
    // ...
  })
  .meta({ id: "PlantSpecies" });

const PlantVarietySchema = z
  .object({
    name: z.string(),
    species: PlantSpeciesSchema.optional(),
    requirements: RequirementsSchema,  // ← Can override species values
    timing: TimingSchema,              // ← Can override species values
    // ...
  })
  .meta({ id: "PlantVariety" });
```

**Benefits:**
- **Cleaner structure:** `species.requirements.sun` instead of `species.sunRequirement`
- **Better organization:** Related properties grouped together
- **Easier overrides:** Variety can override entire nested object or specific fields
- **Type safety:** TypeScript knows the structure

**Data structure:**
```typescript
{
  name: "Cherry Tomato",
  requirements: {
    sun: "full_sun",
    water: "medium"
  },
  timing: {
    germinationDays: 7,
    daysToHarvest: 60
  },
  physicalCharacteristics: {
    spacing: 60,
    height: 180
  }
}
```

## Usage

```typescript
import { schema, gardenConfiguration } from '@schema/garden-schema';
import { patchSchema, patchConfiguration } from '@schema/patch-schema';

// The complete schema with all definitions
const completeSchema = schema;

// Use in GraviolaProvider
<GraviolaProvider
  schema={completeSchema}
  primaryFields={gardenConfiguration.primaryFields}
  typeNameLabelMap={gardenConfiguration.typeNameLabelMap}
  typeNameUiSchemaOptionsMap={gardenConfiguration.typeNameUiSchemaOptionsMap}
  uischemata={gardenConfiguration.uischemata}
  // ... other props
/>
```

## File Structure

- `garden-schema.ts` - Main schema combining Garden and Patch schemas
- `patch-schema.ts` - Patch, PlantingPlan, PlantSpecies, PlantVariety schemas
- `index.ts` - Barrel exports
- `README.md` - This documentation

## Ontology IRIs

- **Base Ontology**: `https://ontology.semantic-desk.top/garden#`
- **Entity Base**: `https://data.semantic-desk.top/garden/`

## Translations

All labels and descriptions are internationalized in:
- `src/i18n/de/garden.json` - German translations
- `src/i18n/en/garden.json` - English translations


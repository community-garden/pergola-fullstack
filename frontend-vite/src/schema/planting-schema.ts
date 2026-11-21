import { z } from "zod";
import { JsonSchema } from "@graviola/json-schema-utils";
import { PlantSpeciesSchema, PlantVarietySchema } from "./plant-schema";
import { PatchSchema } from "./patch-schema";
import { PersonSchema } from "./person-schema";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// ---------------------------------------------------------------------------
// Planting — one plant (species, optionally variety) on one bed for a period.
// Pre-crops, catch crops and successions are simply further plantings on the
// same bed with other dates. Without a bed the planting is a wish.
// ---------------------------------------------------------------------------

export const PLANTING_ROLES = [
  "main",
  "pre_crop",
  "catch_crop",
  "post_crop",
  "green_manure",
  "perennial",
] as const;

export const PLANTING_STATUSES = [
  "wish",
  "planned",
  "sown",
  "planted",
  "harvested",
  "cancelled",
] as const;

export const PLANTING_QUANTITY_UNITS = ["plants", "rows", "m2", "pieces", "grams"] as const;

export const PlantingSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Planting`),
    name: z.string().optional().describe("Label, filled in automatically if empty"),
    plantSpecies: PlantSpeciesSchema.optional().describe("Plant species"),
    plantVariety: PlantVarietySchema.optional().describe("Plant variety"),
    patch: PatchSchema.optional().describe("Bed — empty means it is still a wish"),
    role: z.enum(PLANTING_ROLES).optional().describe("Role in the bed's sequence of crops"),
    status: z.enum(PLANTING_STATUSES).optional(),
    startDate: z.string().optional().describe("ISO date the bed is occupied from"),
    endDate: z.string().optional().describe("ISO date the bed is free again (may be in a later year)"),
    quantity: z.number().positive().optional(),
    quantityUnit: z.enum(PLANTING_QUANTITY_UNITS).optional(),
    requestedBy: PersonSchema.optional().describe("Who wished for this planting"),
    notes: z.string().optional(),
  })
  .loose()
  .meta({
    id: "Planting",
    title: "Planting",
    description: "A plant on a bed for a period of time",
  });

// ---------------------------------------------------------------------------
// SeedStock — what seed (or tubers, young plants) the garden has.
// ---------------------------------------------------------------------------

export const SEED_UNITS = ["packet", "seeds", "grams", "tubers", "plants"] as const;

export const SeedStockSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}SeedStock`),
    name: z.string().min(1).describe("Label, e.g. 'Belana, Pflanzkartoffeln 2027'"),
    plantSpecies: PlantSpeciesSchema.optional(),
    plantVariety: PlantVarietySchema.optional(),
    quantity: z.number().nonnegative().optional(),
    unit: z.enum(SEED_UNITS).optional(),
    source: z.string().optional().describe("Bought at / swapped / own harvest"),
    year: z.number().int().optional().describe("Year of harvest or purchase"),
    viableUntil: z.number().int().optional().describe("Germinable until (year)"),
    storageLocation: z.string().optional(),
    keeper: PersonSchema.optional().describe("Who keeps the seed"),
    notes: z.string().optional(),
  })
  .loose()
  .meta({
    id: "SeedStock",
    title: "Seed stock",
    description: "Seed, tubers or young plants the garden has in stock",
  });

const ref = (definition: string, title: string, description?: string) => ({
  $ref: `#/definitions/${definition}`,
  title,
  ...(description ? { description } : {}),
});

const plantingDefinitions: NonNullable<JsonSchema["definitions"]> = {
  Planting: {
    type: "object",
    title: "Planting",
    description: "A plant on a bed for a period of time",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Planting`, title: "Type" },
      name: { type: "string", title: "Label", description: "Label, filled in automatically if empty" },
      plantSpecies: ref("PlantSpecies", "Plant species"),
      plantVariety: ref("PlantVariety", "Plant variety"),
      patch: ref("Patch", "Bed", "Bed — empty means it is still a wish"),
      role: {
        type: "string",
        enum: [...PLANTING_ROLES],
        title: "Role",
        description: "Role in the bed's sequence of crops",
      },
      status: { type: "string", enum: [...PLANTING_STATUSES], title: "Status" },
      startDate: { type: "string", format: "date", title: "From", description: "Date the bed is occupied from" },
      endDate: {
        type: "string",
        format: "date",
        title: "Until",
        description: "Date the bed is free again (may be in a later year)",
      },
      quantity: { type: "number", exclusiveMinimum: 0, title: "Quantity" },
      quantityUnit: { type: "string", enum: [...PLANTING_QUANTITY_UNITS], title: "Unit" },
      requestedBy: ref("Person", "Requested by", "Who wished for this planting"),
      notes: { type: "string", title: "Notes" },
    },
    additionalProperties: true,
  },
  SeedStock: {
    type: "object",
    title: "Seed stock",
    description: "Seed, tubers or young plants the garden has in stock",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}SeedStock`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name" },
      plantSpecies: ref("PlantSpecies", "Plant species"),
      plantVariety: ref("PlantVariety", "Plant variety"),
      quantity: { type: "number", minimum: 0, title: "Quantity" },
      unit: { type: "string", enum: [...SEED_UNITS], title: "Unit" },
      source: { type: "string", title: "Source", description: "Bought at / swapped / own harvest" },
      year: { type: "integer", title: "Year", description: "Year of harvest or purchase" },
      viableUntil: { type: "integer", title: "Germinable until", description: "Germinable until (year)" },
      storageLocation: { type: "string", title: "Storage location" },
      keeper: ref("Person", "Kept by", "Who keeps the seed"),
      notes: { type: "string", title: "Notes" },
    },
    required: ["name"],
    additionalProperties: true,
  },
};

export const plantingSchema: JsonSchema = mergeSchemaDefinitions([
  { definitions: plantingDefinitions },
]);

const ctl = (scope: string, extra: Record<string, unknown> = {}) => ({
  type: "Control",
  scope: `#/properties/${scope}`,
  ...extra,
});
const row = (...elements: unknown[]) => ({ type: "HorizontalLayout", elements });
/** Show dates the German way, store them as ISO dates. */
const dateOptions = { options: { dateFormat: "DD.MM.YYYY", dateSaveFormat: "YYYY-MM-DD" } };

export const plantingConfiguration = {
  schema: plantingSchema,
  primaryFields: {
    Planting: {
      label: "name",
      description: "notes",
    },
    SeedStock: {
      label: "name",
      description: "source",
    },
  },
  typeNameLabelMap: {
    Planting: "Planting",
    SeedStock: "Seed stock",
  },
  typeNameUiSchemaOptionsMap: {
    Planting: {
      dropdown: true,
    },
    SeedStock: {
      dropdown: true,
    },
  },
  uischemata: {
    Planting: {
      type: "VerticalLayout",
      elements: [
        ctl("plantSpecies"),
        ctl("plantVariety"),
        ctl("patch"),
        row(ctl("startDate", dateOptions), ctl("endDate", dateOptions)),
        row(ctl("quantity"), ctl("quantityUnit")),
        row(ctl("role"), ctl("status")),
        ctl("requestedBy"),
        ctl("name"),
        ctl("notes", { options: { multi: true } }),
      ],
    },
    SeedStock: {
      type: "VerticalLayout",
      elements: [
        ctl("name"),
        row(ctl("plantSpecies"), ctl("plantVariety")),
        row(ctl("quantity"), ctl("unit")),
        row(ctl("year"), ctl("viableUntil")),
        ctl("source"),
        row(ctl("storageLocation"), ctl("keeper")),
        ctl("notes", { options: { multi: true } }),
      ],
    },
  },
};

export type Planting = z.infer<typeof PlantingSchema>;
export type SeedStock = z.infer<typeof SeedStockSchema>;

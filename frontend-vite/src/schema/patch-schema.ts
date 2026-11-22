import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";
import { GeoFeatureSchema, geoFeatureSchema } from "./geo-feature-schema";
import { plantSchema, PlantSpeciesSchema, PlantVarietySchema } from "./plant-schema";
import { personSchema, PersonSchema } from "./person-schema";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

const PlantingPlanItemSchema = z
  .object({
    plantSpecies: PlantSpeciesSchema.optional().describe("Reference to plant species"),
    plantVariety: PlantVarietySchema.optional().describe("Reference to plant variety"),
    plannedQuantity: z.number().int().positive().optional(),
    notes: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
  })
  .loose()
  .meta({
    id: "PlantingPlanItem",
    title: "Planting Plan Item",
    description: "A single item in a planting plan",
  });

const PlantingPlanSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}PlantingPlan`),
    name: z.string().min(1).describe("Name of the planting plan"),
    season: z.string().optional().describe("Season or year (e.g., 'Spring 2024')"),
    description: z.string().optional(),
    items: z.array(PlantingPlanItemSchema).optional().describe("List of planned plantings"),
    startDate: z.string().optional().describe("ISO date string"),
    endDate: z.string().optional().describe("ISO date string"),
  })
  .loose()
  .meta({
    id: "PlantingPlan",
    title: "Planting Plan",
    description: "A seasonal plan for what to plant",
  });

const PatchSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Patch`),
    name: z.string().min(1).describe("Name of the patch"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    description: z.string().optional(),
    patchType: z.enum(["bed", "greenhouse", "container", "field", "other"]).optional(),
    plantingPlans: z.array(PlantingPlanSchema).optional().describe("References to associated planting plans"),
    area: z.number().positive().optional().describe("Area in square meters"),
    planRotation: z
      .number()
      .min(-180)
      .max(180)
      .optional()
      .describe("How the bed is turned in the bed plan, in degrees clockwise; empty: the longest side straight"),
    responsiblePersons: z.array(PersonSchema).optional().describe("Who takes care of this bed"),
  })
  .loose()
  .meta({
    id: "Patch",
    title: "Patch",
    description: "A specific area within a garden",
  });

// const patchJsonSchema = z.toJSONSchema(PatchSchema, {
//   target: "draft-7",
//   reused: "inline",
// }) as JSONSchema7;
//
// const plantingPlanJsonSchema = z.toJSONSchema(PlantingPlanSchema, {
//   target: "draft-7",
//   reused: "inline",
// }) as JSONSchema7;

const patchOnlyDefinitions: NonNullable<JsonSchema["definitions"]> = {
  PlantingPlanItem: {
    type: "object",
    title: "Planting Plan Item",
    description: "A single item in a planting plan",
    properties: {
      plantSpecies: {
        $ref: "#/definitions/PlantSpecies",
        title: "Plant species",
        description: "Reference to plant species",
      },
      plantVariety: {
        $ref: "#/definitions/PlantVariety",
        title: "Plant variety",
        description: "Reference to plant variety",
      },
      plannedQuantity: { type: "integer", exclusiveMinimum: 0, title: "Planned quantity" },
      notes: { type: "string", title: "Notes" },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
        title: "Priority",
      },
    },
    additionalProperties: true,
  },
  PlantingPlan: {
    type: "object",
    title: "Planting Plan",
    description: "A seasonal plan for what to plant",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}PlantingPlan`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name of the planting plan" },
      season: { type: "string", title: "Season", description: "Season or year (e.g., 'Spring 2024')" },
      description: { type: "string", title: "Description" },
      items: {
        type: "array",
        title: "Items",
        description: "List of planned plantings",
        items: { $ref: "#/definitions/PlantingPlanItem" },
      },
      startDate: { type: "string", title: "Start date", description: "ISO date string" },
      endDate: { type: "string", title: "End date", description: "ISO date string" },
    },
    required: ["name"],
    additionalProperties: true,
  },
  Patch: {
    type: "object",
    title: "Patch",
    description: "A specific area within a garden",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Patch`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name of the patch" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: {
        $ref: "#/definitions/GeoFeature",
        title: "Geo feature",
        description: "Reference to geographic feature",
      },
      description: { type: "string", title: "Description" },
      patchType: {
        type: "string",
        enum: ["bed", "greenhouse", "container", "field", "other"],
        title: "Patch type",
      },
      plantingPlans: {
        type: "array",
        title: "Planting plans",
        description: "References to associated planting plans",
        items: { $ref: "#/definitions/PlantingPlan" },
      },
      area: {
        type: "number",
        exclusiveMinimum: 0,
        title: "Area (m²)",
        description: "Area in square meters",
      },
      planRotation: {
        type: "number",
        minimum: -180,
        maximum: 180,
        title: "Rotation in the bed plan (°)",
        description: "How the bed is turned in the bed plan, in degrees clockwise; empty: the longest side straight",
      },
      responsiblePersons: {
        type: "array",
        title: "Responsible persons",
        description: "Who takes care of this bed",
        items: { $ref: "#/definitions/Person" },
      },
    },
    required: ["name"],
    additionalProperties: true,
  },
};

export const patchSchema: JsonSchema = mergeSchemaDefinitions([
  { definitions: patchOnlyDefinitions },
  plantSchema,
  geoFeatureSchema,
  personSchema,
]);

export const patchConfiguration = {
  schema: patchSchema,
  primaryFields: {
    Patch: {
      label: "name",
      description: "description",
    },
    PlantingPlan: {
      label: "name",
      description: "season",
    },
  },
  typeNameLabelMap: {
    Patch: "Patch",
    PlantingPlan: "Planting Plan",
  },
  typeNameUiSchemaOptionsMap: {
    Patch: {
      dropdown: true,
    },
    PlantingPlan: {
      dropdown: true,
    },
  },
  uischemata: {
    Patch: generateDefaultUISchema(
      bringDefinitionToTop(patchSchema as any, "Patch") as any,
      {
        // Planting plans are superseded by first-class Planting entities.
        skipScope: ["#/properties/plantingPlans"],
        scopeOverride: {
          // one-to-many as dropdown, never the entity finder
          "#/properties/responsiblePersons": {
            type: "Control",
            scope: "#/properties/responsiblePersons",
            options: { dropdown: true },
          },
        },
      }
    ),
    PlantingPlan: generateDefaultUISchema(
      bringDefinitionToTop(patchSchema as any, "PlantingPlan") as any,
      {}
    ),
  },
};

export { PatchSchema, PlantingPlanSchema, PlantingPlanItemSchema };

export {
  PlantSpeciesSchema,
  PlantVarietySchema,
  GrowingSeasonSchema,
  RequirementsSchema,
  PhysicalCharacteristicsSchema,
  TimingSchema,
} from "./plant-schema";

export type Patch = z.infer<typeof PatchSchema>;
export type PlantingPlan = z.infer<typeof PlantingPlanSchema>;
export type PlantingPlanItem = z.infer<typeof PlantingPlanItemSchema>;

export type {
  PlantSpecies,
  PlantVariety,
  GrowingSeason,
  Requirements,
  PhysicalCharacteristics,
  Timing,
} from "./plant-schema";

import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";
import { GeoFeatureSchema, geoFeatureSchema } from "./geo-feature-schema";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

const WorkshopSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Workshop`),
    name: z.string().min(1).describe("Name of the workshop/greenhouse"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    workshopType: z.enum(["greenhouse", "polytunnel", "cold_frame", "other"]).optional(),
    area: z.number().positive().optional().describe("Area in square meters"),
    hasHeating: z.boolean().optional().describe("Has heating system"),
    hasIrrigation: z.boolean().optional().describe("Has irrigation system"),
  })
  .loose()
  .meta({
    id: "Workshop",
    title: "Workshop/Greenhouse",
    description: "A greenhouse or workshop structure",
  });

const ShedSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Shed`),
    name: z.string().min(1).describe("Name of the shed"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    shedType: z.enum(["tool_shed", "storage", "potting_shed", "other"]).optional(),
    area: z.number().positive().optional().describe("Area in square meters"),
    hasElectricity: z.boolean().optional().describe("Has electricity"),
  })
  .loose()
  .meta({
    id: "Shed",
    title: "Shed",
    description: "A storage or tool shed",
  });

const BeeStandSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}BeeStand`),
    name: z.string().min(1).describe("Name of the bee stand"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    numberOfHives: z.number().int().positive().optional().describe("Number of beehives"),
    beeSpecies: z.string().optional().describe("Species of bees"),
  })
  .loose()
  .meta({
    id: "BeeStand",
    title: "Bee Stand",
    description: "A location for beehives",
  });

const PathSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Path`),
    name: z.string().optional().describe("Name of the path"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    pathType: z.enum(["gravel", "paved", "grass", "woodchip", "other"]).optional(),
    width: z.number().positive().optional().describe("Width in meters"),
  })
  .loose()
  .meta({
    id: "Path",
    title: "Path",
    description: "A walkway or path",
  });

const SeatingSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Seating`),
    name: z.string().optional().describe("Name of the seating area"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    seatingType: z.enum(["bench", "table", "pergola", "pavilion", "other"]).optional(),
    capacity: z.number().int().positive().optional().describe("Number of people"),
    hasCover: z.boolean().optional().describe("Has roof or cover"),
  })
  .loose()
  .meta({
    id: "Seating",
    title: "Seating Area",
    description: "A seating or resting area",
  });

const FirePlaceSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}FirePlace`),
    name: z.string().optional().describe("Name of the fire place"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    firePlaceType: z.enum(["fire_pit", "barbecue", "outdoor_oven", "other"]).optional(),
    hasCover: z.boolean().optional().describe("Has roof or cover"),
  })
  .loose()
  .meta({
    id: "FirePlace",
    title: "Fire Place",
    description: "A fire pit, barbecue, or outdoor cooking area",
  });

const WATER_BODY_TYPES = ["pond", "rain_barrel", "cistern", "water_tap", "other"] as const;

const WaterBodySchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}WaterBody`),
    name: z.string().min(1).describe("Name of the water body"),
    description: z.string().optional().describe("Description"),
    icon: z.string().optional().describe("Icon identifier"),
    geoFeature: GeoFeatureSchema.optional().describe("Reference to geographic feature"),
    waterBodyType: z.enum(WATER_BODY_TYPES).optional(),
    area: z.number().positive().optional().describe("Area in square meters"),
    usableForIrrigation: z.boolean().optional().describe("Water can be used for watering"),
  })
  .loose()
  .meta({
    id: "WaterBody",
    title: "Water Body",
    description: "A pond, rain barrel, cistern or water tap",
  });

// const workshopJsonSchema = z.toJSONSchema(WorkshopSchema, {
//   target: "draft-7",
//   reused: "ref",
// }) as JSONSchema7;
// ... (Shed, BeeStand, Path, Seating, FirePlace)

const geoFeatureRef = {
  $ref: "#/definitions/GeoFeature",
  title: "Geographic feature",
  description: "Reference to geographic feature",
} as const;

const featureTypesDefinitions: NonNullable<JsonSchema["definitions"]> = {
  Workshop: {
    type: "object",
    title: "Workshop/Greenhouse",
    description: "A greenhouse or workshop structure",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Workshop`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name of the workshop/greenhouse" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      workshopType: {
        type: "string",
        enum: ["greenhouse", "polytunnel", "cold_frame", "other"],
        title: "Workshop type",
      },
      area: { type: "number", exclusiveMinimum: 0, title: "Area (m²)", description: "Area in square meters" },
      hasHeating: { type: "boolean", title: "Has heating", description: "Has heating system" },
      hasIrrigation: { type: "boolean", title: "Has irrigation", description: "Has irrigation system" },
    },
    required: ["name"],
    additionalProperties: true,
  },
  Shed: {
    type: "object",
    title: "Shed",
    description: "A storage or tool shed",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Shed`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name of the shed" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      shedType: {
        type: "string",
        enum: ["tool_shed", "storage", "potting_shed", "other"],
        title: "Shed type",
      },
      area: { type: "number", exclusiveMinimum: 0, title: "Area (m²)", description: "Area in square meters" },
      hasElectricity: { type: "boolean", title: "Has electricity", description: "Has electricity" },
    },
    required: ["name"],
    additionalProperties: true,
  },
  BeeStand: {
    type: "object",
    title: "Bee Stand",
    description: "A location for beehives",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}BeeStand`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name of the bee stand" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      numberOfHives: { type: "integer", exclusiveMinimum: 0, title: "Number of hives", description: "Number of beehives" },
      beeSpecies: { type: "string", title: "Bee species", description: "Species of bees" },
    },
    required: ["name"],
    additionalProperties: true,
  },
  Path: {
    type: "object",
    title: "Path",
    description: "A walkway or path",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Path`, title: "Type" },
      name: { type: "string", title: "Name", description: "Name of the path" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      pathType: {
        type: "string",
        enum: ["gravel", "paved", "grass", "woodchip", "other"],
        title: "Path type",
      },
      width: { type: "number", exclusiveMinimum: 0, title: "Width (m)", description: "Width in meters" },
    },
    additionalProperties: true,
  },
  Seating: {
    type: "object",
    title: "Seating Area",
    description: "A seating or resting area",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Seating`, title: "Type" },
      name: { type: "string", title: "Name", description: "Name of the seating area" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      seatingType: {
        type: "string",
        enum: ["bench", "table", "pergola", "pavilion", "other"],
        title: "Seating type",
      },
      capacity: { type: "integer", exclusiveMinimum: 0, title: "Capacity", description: "Number of people" },
      hasCover: { type: "boolean", title: "Has cover", description: "Has roof or cover" },
    },
    additionalProperties: true,
  },
  FirePlace: {
    type: "object",
    title: "Fire Place",
    description: "A fire pit, barbecue, or outdoor cooking area",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}FirePlace`, title: "Type" },
      name: { type: "string", title: "Name", description: "Name of the fire place" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      firePlaceType: {
        type: "string",
        enum: ["fire_pit", "barbecue", "outdoor_oven", "other"],
        title: "Fire place type",
      },
      hasCover: { type: "boolean", title: "Has cover", description: "Has roof or cover" },
    },
    additionalProperties: true,
  },
  WaterBody: {
    type: "object",
    title: "Water Body",
    description: "A pond, rain barrel, cistern or water tap",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}WaterBody`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name of the water body" },
      description: { type: "string", title: "Description" },
      icon: { type: "string", title: "Icon", description: "Icon identifier" },
      geoFeature: geoFeatureRef,
      waterBodyType: {
        type: "string",
        enum: [...WATER_BODY_TYPES],
        title: "Water body type",
      },
      area: { type: "number", exclusiveMinimum: 0, title: "Area (m²)", description: "Area in square meters" },
      usableForIrrigation: {
        type: "boolean",
        title: "Usable for irrigation",
        description: "Water can be used for watering",
      },
    },
    required: ["name"],
    additionalProperties: true,
  },
};

export const featureTypesSchema: JsonSchema = mergeSchemaDefinitions([
  { definitions: featureTypesDefinitions },
  geoFeatureSchema,
]);

export const featureTypesConfiguration = {
  schema: featureTypesSchema,
  primaryFields: {
    Workshop: {
      label: "name",
      description: "description",
    },
    Shed: {
      label: "name",
      description: "description",
    },
    BeeStand: {
      label: "name",
      description: "description",
    },
    Path: {
      label: "name",
      description: "description",
    },
    Seating: {
      label: "name",
      description: "description",
    },
    FirePlace: {
      label: "name",
      description: "description",
    },
    WaterBody: {
      label: "name",
      description: "description",
    },
  },
  typeNameLabelMap: {
    Workshop: "Workshop/Greenhouse",
    Shed: "Shed",
    BeeStand: "Bee Stand",
    Path: "Path",
    Seating: "Seating Area",
    FirePlace: "Fire Place",
    WaterBody: "Water Body",
  },
  typeNameUiSchemaOptionsMap: {
    Workshop: {
      dropdown: true,
    },
    Shed: {
      dropdown: true,
    },
    BeeStand: {
      dropdown: true,
    },
    Path: {
      dropdown: true,
    },
    Seating: {
      dropdown: true,
    },
    FirePlace: {
      dropdown: true,
    },
    WaterBody: {
      dropdown: true,
    },
    GeoFeature: {
      dropdown: true,
    },
  },
  uischemata: {
    Workshop: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "Workshop") as any,
      {}
    ),
    Shed: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "Shed") as any,
      {}
    ),
    BeeStand: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "BeeStand") as any,
      {}
    ),
    Path: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "Path") as any,
      {}
    ),
    Seating: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "Seating") as any,
      {}
    ),
    FirePlace: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "FirePlace") as any,
      {}
    ),
    WaterBody: generateDefaultUISchema(
      bringDefinitionToTop(featureTypesSchema as any, "WaterBody") as any,
      {}
    ),
  },
};

export {
  WorkshopSchema,
  ShedSchema,
  BeeStandSchema,
  PathSchema,
  SeatingSchema,
  FirePlaceSchema,
  WaterBodySchema,
};

export type Workshop = z.infer<typeof WorkshopSchema>;
export type Shed = z.infer<typeof ShedSchema>;
export type BeeStand = z.infer<typeof BeeStandSchema>;
export type Path = z.infer<typeof PathSchema>;
export type Seating = z.infer<typeof SeatingSchema>;
export type FirePlace = z.infer<typeof FirePlaceSchema>;
export type WaterBody = z.infer<typeof WaterBodySchema>;

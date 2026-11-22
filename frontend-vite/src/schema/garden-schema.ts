import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";
import { patchSchema, patchConfiguration, PatchSchema } from "./patch-schema";
import { geoFeatureConfiguration, geoFeatureSchema, GeoFeatureSchema } from "./geo-feature-schema";
import { featureTypesSchema, featureTypesConfiguration } from "./feature-types-schema";
import { plantConfiguration, plantSchema } from "./plant-schema";
import { personConfiguration, personSchema } from "./person-schema";
import { plantingConfiguration, plantingSchema } from "./planting-schema";
import { mapOverlayConfiguration, mapOverlaySchema, MapOverlaySchema } from "./map-overlay-schema";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

const GardenSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Garden`),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    location: z.string().meta({ format: "wktLiteral" }).optional(),
    area: z.number().positive().optional(),
    patches: z.array(PatchSchema).optional().describe("Patches in this garden"),
    geoFeatures: z.array(GeoFeatureSchema).optional().describe("Geographic features in this garden"),
    mainGeoFeature: GeoFeatureSchema.optional().describe("Main geographic feature of the garden"),
    mapOverlays: z.array(MapOverlaySchema).optional().describe("Images laid over the garden map"),
  })
  .loose()
  .meta({
    id: "Garden",
    title: "Garden",
    description: "A garden containing patches, plants, and geographic features",
  });

// const gardenJsonSchema = z.toJSONSchema(GardenSchema, {
//   target: "draft-7",
//   reused: "inline",
// }) as JsonSchema;

const gardenJsonSchema: JsonSchema = {
  definitions: {
    Garden: {
      type: "object",
      title: "Garden",
      description: "A garden containing patches, plants, and geographic features",
      properties: {
        "@id": { type: "string", title: "ID" },
        "@type": { type: "string", const: `${GARDEN_IRI}Garden`, title: "Type" },
        name: { type: "string", minLength: 1, title: "Name" },
        description: { type: "string", title: "Description" },
        location: {
          type: "string",
          format: "wktLiteral",
          title: "Location",
        },
        area: {
          type: "number",
          exclusiveMinimum: 0,
          title: "Area",
          description: "Area (e.g. m²)",
        },
        patches: {
          type: "array",
          title: "Patches",
          description: "Patches in this garden",
          items: { $ref: "#/definitions/Patch" },
        },
        geoFeatures: {
          type: "array",
          title: "Geographic features",
          description: "Geographic features in this garden",
          items: { $ref: "#/definitions/GeoFeature" },
        },
        mainGeoFeature: {
          $ref: "#/definitions/GeoFeature",
          title: "Main geographic feature",
          description: "Main geographic feature of the garden",
        },
        mapOverlays: {
          type: "array",
          title: "Map overlays",
          description: "Images laid over the garden map",
          items: { $ref: "#/definitions/MapOverlay" },
        },
      },
      required: ["name"],
      additionalProperties: true,
    },
  },
};

export const schema: JsonSchema = mergeSchemaDefinitions([
  geoFeatureSchema,
  gardenJsonSchema,
  patchSchema,
  plantSchema,
  featureTypesSchema,
  personSchema,
  plantingSchema,
  mapOverlaySchema,
]);

export { GardenSchema };

export type Garden = z.infer<typeof GardenSchema>;

export const gardenConfiguration = {
  schema: schema,
  primaryFields: {
    Garden: {
      label: "name",
      description: "description",
    },
    ...patchConfiguration.primaryFields,
    ...plantConfiguration.primaryFields,
    ...geoFeatureConfiguration.primaryFields,
    ...featureTypesConfiguration.primaryFields,
    ...personConfiguration.primaryFields,
    ...plantingConfiguration.primaryFields,
    ...mapOverlayConfiguration.primaryFields,
  },
  typeNameLabelMap: {
    Garden: "Garden",
    ...patchConfiguration.typeNameLabelMap,
    ...plantConfiguration.typeNameLabelMap,
    ...geoFeatureConfiguration.typeNameLabelMap,
    ...featureTypesConfiguration.typeNameLabelMap,
    ...personConfiguration.typeNameLabelMap,
    ...plantingConfiguration.typeNameLabelMap,
    ...mapOverlayConfiguration.typeNameLabelMap,
  },
  typeNameUiSchemaOptionsMap: {
    Garden: {
      dropdown: true,
    },
    ...patchConfiguration.typeNameUiSchemaOptionsMap,
    ...plantConfiguration.typeNameUiSchemaOptionsMap,
    ...geoFeatureConfiguration.typeNameUiSchemaOptionsMap,
    ...featureTypesConfiguration.typeNameUiSchemaOptionsMap,
    ...personConfiguration.typeNameUiSchemaOptionsMap,
    ...plantingConfiguration.typeNameUiSchemaOptionsMap,
    ...mapOverlayConfiguration.typeNameUiSchemaOptionsMap,
  },
  uischemata: {
    Garden: generateDefaultUISchema(
      bringDefinitionToTop(schema as any, "Garden") as any,
      {
        scopeOverride: {
          "#/properties/location": {
            type: "Control",
            scope: "#/properties/location",
            options: {
              customRenderer: "LocationRenderer",
            },
          },
        },
      }
    ),
    ...patchConfiguration.uischemata,
    ...plantConfiguration.uischemata,
    ...geoFeatureConfiguration.uischemata,
    ...featureTypesConfiguration.uischemata,
    ...personConfiguration.uischemata,
    ...plantingConfiguration.uischemata,
    ...mapOverlayConfiguration.uischemata,
  },
};

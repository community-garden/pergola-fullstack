import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// GeoFeature (Named Entity)
const GeoFeatureSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}GeoFeature`),
    name: z.string().optional().describe("Name of the feature"),
    description: z.string().optional().describe("Description of the feature"),
    icon: z.string().optional().describe("Icon identifier"),
    geo: z.string().optional().describe("WKT (Well-Known Text) geometry string"),
    creationTime: z.string().optional().describe("ISO date string of creation"),
    modificationTime: z.string().optional().describe("ISO date string of last modification"),
  })
  .loose()
  .meta({
    id: "GeoFeature",
    title: "Geographic Feature",
    description: "A geographic feature with geometry and metadata",
  });

// const geoFeatureJsonSchema = z.toJSONSchema(GeoFeatureSchema, {
//   target: "draft-7",
//   reused: "inline",
// }) as JSONSchema7;

export const geoFeatureSchema: JsonSchema = 
  {
    definitions: {
      GeoFeature: {
        type: "object",
        title: "Geographic Feature",
        description: "A geographic feature with geometry and metadata",
        properties: {
          "@id": { type: "string", title: "ID" },
          "@type": {
            type: "string",
            const: `${GARDEN_IRI}GeoFeature`,
            title: "Type",
          },
          name: { type: "string", title: "Name", description: "Name of the feature" },
          description: {
            type: "string",
            title: "Description",
            description: "Description of the feature",
          },
          icon: { type: "string", title: "Icon", description: "Icon identifier" },
          geo: {
            type: "string",
            title: "Geometry (WKT)",
            description: "WKT (Well-Known Text) geometry string",
          },
          creationTime: {
            type: "string",
            title: "Creation time",
            description: "ISO date string of creation",
          },
          modificationTime: {
            type: "string",
            title: "Modification time",
            description: "ISO date string of last modification",
          },
        },
        additionalProperties: true,
      },
    },
  };

export const geoFeatureConfiguration = {
  schema: geoFeatureSchema,
  primaryFields: {
    GeoFeature: {
      label: "name",
      description: "description",
    },
  },
  typeNameLabelMap: {
    GeoFeature: "Geographic Feature",
  },
  typeNameUiSchemaOptionsMap: {
    GeoFeature: {
      dropdown: true,
    },
  },
  uischemata: {
    GeoFeature: generateDefaultUISchema(
      bringDefinitionToTop(geoFeatureSchema as any, "GeoFeature") as any,
      {
        scopeOverride: {
          "#/properties/geo": {
            type: "Control",
            scope: "#/properties/geo",
            options: {
              visible: false,
            },
          },
        },
      }
    ),
  },
};

export { GeoFeatureSchema };

export type GeoFeature = z.infer<typeof GeoFeatureSchema>;

import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// ---------------------------------------------------------------------------
// History of shapes. A GeoFeature keeps its IRI for its whole life, so the bed,
// the labels and the plantings stay linked. When the shape changes in the garden
// (not a mere correction of a badly drawn shape), the old outline is kept as a
// GeoFeatureVersion. Validity is a half-open interval of days:
// [validFrom, validUntil) — validUntil is the first day the shape no longer holds.
// A shape without validUntil is current; without validFrom it has always been.
// ---------------------------------------------------------------------------

// GeoFeatureVersion (Named Entity): an earlier outline of a GeoFeature
const GeoFeatureVersionSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}GeoFeatureVersion`),
    name: z.string().optional().describe("Short label, e.g. the period"),
    geo: z.string().describe("WKT geometry of this earlier shape"),
    validFrom: z.string().optional().describe("First day of this shape (YYYY-MM-DD); empty: since always"),
    validUntil: z.string().describe("First day the shape no longer holds (YYYY-MM-DD)"),
    creationTime: z.string().optional().describe("ISO date string of creation"),
  })
  .loose()
  .meta({
    id: "GeoFeatureVersion",
    title: "Earlier shape",
    description: "An earlier outline of a geographic feature, with its period of validity",
  });

// GeoFeature (Named Entity)
const GeoFeatureSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}GeoFeature`),
    name: z.string().optional().describe("Name of the feature"),
    description: z.string().optional().describe("Description of the feature"),
    icon: z.string().optional().describe("Icon identifier"),
    geo: z.string().optional().describe("WKT (Well-Known Text) geometry string"),
    validFrom: z.string().optional().describe("First day of the current shape (YYYY-MM-DD); empty: since always"),
    validUntil: z
      .string()
      .optional()
      .describe("First day the feature no longer exists (YYYY-MM-DD); empty: it still exists"),
    versions: z.array(GeoFeatureVersionSchema).optional().describe("Earlier shapes of this feature"),
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
          validFrom: {
            type: "string",
            format: "date",
            title: "Valid from",
            description: "First day of the current shape; empty: since always",
          },
          validUntil: {
            type: "string",
            format: "date",
            title: "Valid until (exclusive)",
            description: "First day the feature no longer exists; empty: it still exists",
          },
          versions: {
            type: "array",
            title: "Earlier shapes",
            description: "Earlier shapes of this feature",
            items: { $ref: "#/definitions/GeoFeatureVersion" },
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
      GeoFeatureVersion: {
        type: "object",
        title: "Earlier shape",
        description: "An earlier outline of a geographic feature, with its period of validity",
        properties: {
          "@id": { type: "string", title: "ID" },
          "@type": {
            type: "string",
            const: `${GARDEN_IRI}GeoFeatureVersion`,
            title: "Type",
          },
          name: { type: "string", title: "Name", description: "Short label, e.g. the period" },
          geo: {
            type: "string",
            title: "Geometry (WKT)",
            description: "WKT geometry of this earlier shape",
          },
          validFrom: {
            type: "string",
            format: "date",
            title: "Valid from",
            description: "First day of this shape; empty: since always",
          },
          validUntil: {
            type: "string",
            format: "date",
            title: "Valid until (exclusive)",
            description: "First day the shape no longer holds",
          },
          creationTime: {
            type: "string",
            title: "Creation time",
            description: "ISO date string of creation",
          },
        },
        required: ["geo", "validUntil"],
        additionalProperties: true,
      },
    },
  };

const hidden = (field: string) => ({
  [`#/properties/${field}`]: {
    type: "Control" as const,
    scope: `#/properties/${field}`,
    options: { visible: false },
  },
});

export const geoFeatureConfiguration = {
  schema: geoFeatureSchema,
  primaryFields: {
    GeoFeature: {
      label: "name",
      description: "description",
    },
    GeoFeatureVersion: {
      label: "name",
      description: "validUntil",
    },
  },
  typeNameLabelMap: {
    GeoFeature: "Geographic Feature",
    GeoFeatureVersion: "Earlier shape",
  },
  typeNameUiSchemaOptionsMap: {
    GeoFeature: {
      dropdown: true,
    },
    GeoFeatureVersion: {
      dropdown: true,
    },
  },
  uischemata: {
    // the shape and its history are edited on the map, not in the form
    GeoFeature: generateDefaultUISchema(
      bringDefinitionToTop(geoFeatureSchema as any, "GeoFeature") as any,
      { scopeOverride: { ...hidden("geo"), ...hidden("versions") } }
    ),
    GeoFeatureVersion: generateDefaultUISchema(
      bringDefinitionToTop(geoFeatureSchema as any, "GeoFeatureVersion") as any,
      { scopeOverride: hidden("geo") }
    ),
  },
};

export { GeoFeatureSchema, GeoFeatureVersionSchema };

export type GeoFeature = z.infer<typeof GeoFeatureSchema>;
export type GeoFeatureVersion = z.infer<typeof GeoFeatureVersionSchema>;

import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// ---------------------------------------------------------------------------
// MapOverlay — an image laid over the garden map, below the beds and above the
// base map (satellite / OSM). A garden has any number of them; each can be
// shown or hidden on the map. The image is a static file referenced by URL;
// its placement is four corner points (the perspective transform is done by
// the map, the parameters live here).
// ---------------------------------------------------------------------------

export const MAP_OVERLAY_TYPES = ["photo", "plan", "watercolor", "other"] as const;

const MapOverlaySchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}MapOverlay`),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    overlayImageUrl: z.string().min(1).describe("URL of the image (static file or uploaded media)"),
    corners: z
      .string()
      .meta({ format: "wktLiteral" })
      .describe("Four corners as WKT POLYGON, in the order top-left, top-right, bottom-right, bottom-left"),
    overlayType: z.enum(MAP_OVERLAY_TYPES).optional(),
    opacity: z.number().min(0).max(1).optional(),
    visible: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
    attribution: z.string().optional(),
  })
  .loose()
  .meta({
    id: "MapOverlay",
    title: "Map overlay",
    description: "An image laid over the garden map, below the beds",
  });

export const mapOverlaySchema: JsonSchema = {
  definitions: {
    MapOverlay: {
      type: "object",
      title: "Map overlay",
      description: "An image laid over the garden map, below the beds",
      properties: {
        "@id": { type: "string", title: "ID" },
        "@type": { type: "string", const: `${GARDEN_IRI}MapOverlay`, title: "Type" },
        name: { type: "string", minLength: 1, title: "Name" },
        description: { type: "string", title: "Description" },
        overlayImageUrl: {
          type: "string",
          minLength: 1,
          title: "Image URL",
          description: "URL of the image (static file or uploaded media)",
        },
        corners: {
          type: "string",
          format: "wktLiteral",
          title: "Corners (WKT)",
          description:
            "Four corners as WKT POLYGON, in the order top-left, top-right, bottom-right, bottom-left",
        },
        overlayType: {
          type: "string",
          enum: [...MAP_OVERLAY_TYPES],
          title: "Overlay type",
        },
        opacity: {
          type: "number",
          minimum: 0,
          maximum: 1,
          title: "Opacity",
          description: "0 = transparent, 1 = opaque",
        },
        visible: {
          type: "boolean",
          title: "Visible",
          description: "Shown on the map by default",
        },
        sortOrder: {
          type: "integer",
          title: "Order",
          description: "Overlays with a higher number are drawn on top",
        },
        attribution: { type: "string", title: "Source", description: "Who made the image, and how" },
      },
      required: ["name", "overlayImageUrl", "corners"],
      additionalProperties: true,
    },
  },
};

export const mapOverlayConfiguration = {
  schema: mapOverlaySchema,
  primaryFields: {
    MapOverlay: {
      label: "name",
      description: "description",
    },
  },
  typeNameLabelMap: {
    MapOverlay: "Map overlay",
  },
  typeNameUiSchemaOptionsMap: {
    MapOverlay: {
      dropdown: true,
    },
  },
  uischemata: {
    MapOverlay: generateDefaultUISchema(
      bringDefinitionToTop(mapOverlaySchema as any, "MapOverlay") as any,
      {}
    ),
  },
};

export { MapOverlaySchema };
export type MapOverlay = z.infer<typeof MapOverlaySchema>;

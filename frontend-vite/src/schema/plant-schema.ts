import { z } from "zod";
import { JsonSchema } from "@graviola/json-schema-utils";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

const MonthSchema = z.number().int().min(1).max(12);

export const GrowingSeasonSchema = z
  .object({
    preCultivationStart: MonthSchema.optional().describe("Start month for pre-cultivation / pre-sprouting indoors (1-12)"),
    preCultivationEnd: MonthSchema.optional().describe("End month for pre-cultivation / pre-sprouting indoors (1-12)"),
    sowingStart: MonthSchema.optional().describe("Start month for sowing (1-12)"),
    sowingEnd: MonthSchema.optional().describe("End month for sowing (1-12)"),
    prickingStart: MonthSchema.optional().describe("Start month for pricking out (1-12)"),
    prickingEnd: MonthSchema.optional().describe("End month for pricking out (1-12)"),
    plantingStart: MonthSchema.optional().describe("Start month for planting (1-12)"),
    plantingEnd: MonthSchema.optional().describe("End month for planting (1-12)"),
    harvestStart: MonthSchema.optional().describe("Start month for harvest (1-12)"),
    harvestEnd: MonthSchema.optional().describe("End month for harvest (1-12)"),
    sowingOutdoorsStart: z.number().int().min(0).optional().describe("Start day for outdoor sowing (0-364+)"),
    sowingOutdoorsEnd: z.number().int().min(0).optional().describe("End day for outdoor sowing (0-364+)"),
    sowingUnderGlassStart: z.number().int().min(0).optional().describe("Start day for sowing under glass (0-364+)"),
    sowingUnderGlassEnd: z.number().int().min(0).optional().describe("End day for sowing under glass (0-364+)"),
    harvestStartDay: z.number().int().min(0).optional().describe("Start day for harvest (0-364+)"),
    harvestEndDay: z.number().int().min(0).optional().describe("End day for harvest (0-364+)"),
  })
  .loose()
  .meta({
    id: "GrowingSeason",
    title: "Growing Season",
    description: "Year-independent growing season information",
  });

export const RequirementsSchema = z.object({
  sun: z.enum(["full_sun", "partial_shade", "full_shade"]).optional(),
  water: z.enum(["low", "medium", "high"]).optional(),
  soil: z.string().optional().describe("Soil requirements"),
  pH: z.string().optional().describe("Soil pH requirements"),
}).optional();

export const PhysicalCharacteristicsSchema = z.object({
  spacing: z.number().positive().optional().describe("Recommended spacing in cm"),
  rowSpacing: z.number().positive().optional().describe("Recommended spacing between rows in cm"),
  height: z.number().positive().optional().describe("Typical height in cm"),
  spread: z.number().positive().optional().describe("Typical spread in cm"),
}).optional();

export const TimingSchema = z.object({
  germinationDays: z.number().int().positive().optional().describe("Germination time in days"),
  daysToHarvest: z.number().int().positive().optional().describe("Days from sowing to harvest"),
}).optional();

const ExternalIdentifiersSchema = z.object({
  gbifKey: z.number().optional().describe("GBIF species key"),
  powoId: z.string().optional().describe("Plants of the World Online ID"),
  openFarmSlug: z.string().optional().describe("OpenFarm crop slug"),
  wikidataId: z.string().optional().describe("Wikidata Q-ID"),
}).optional();

const TaxonomySchema = z.object({
  kingdom: z.string().optional().describe("Kingdom (e.g., Plantae)"),
  phylum: z.string().optional().describe("Phylum/Division"),
  class: z.string().optional().describe("Class"),
  order: z.string().optional().describe("Order"),
  family: z.string().optional().describe("Family"),
  genus: z.string().optional().describe("Genus"),
  species: z.string().optional().describe("Species epithet"),
  rank: z.string().optional().describe("Taxonomic rank"),
}).optional();

const ClimateDataSchema = z.object({
  hardinessZoneMin: z.number().optional().describe("Minimum USDA hardiness zone"),
  hardinessZoneMax: z.number().optional().describe("Maximum USDA hardiness zone"),
  minTemperature: z.number().optional().describe("Minimum temperature in °C"),
  maxTemperature: z.number().optional().describe("Maximum temperature in °C"),
  frostTolerant: z.boolean().optional().describe("Can tolerate frost"),
}).optional();

const GardeningInfoSchema = z.object({
  companions: z.array(z.string()).optional().describe("Companion plant names"),
  antagonists: z.array(z.string()).optional().describe("Plants to avoid nearby"),
  commonPests: z.array(z.string()).optional().describe("Common pest names"),
  commonDiseases: z.array(z.string()).optional().describe("Common disease names"),
  sowingMethod: z.string().optional().describe("Sowing method (e.g., direct, transplant)"),
}).optional();

const AuthorityLinkSchema = z.object({
  authorityIRI: z.string().describe("Authority IRI (e.g., http://www.wikidata.org)"),
  authorityID: z.string().describe("ID in the authority"),
  authorityLabel: z.string().optional().describe("Label from authority"),
}).loose();

/**
 * Gardener-oriented facts — what is printed on a seed packet or on our
 * plant cards (Saisonplanung/pflanzen/*.json). Short free texts on purpose.
 */
export const NUTRIENT_DEMANDS = ["heavy", "medium", "light"] as const;

const GardenerFactsShape = {
  nutrientDemand: z.enum(NUTRIENT_DEMANDS).optional().describe("Heavy, medium or light feeder"),
  perennial: z.boolean().optional().describe("Perennial / stays in the bed for several seasons"),
  sowingInfo: z.string().optional().describe("Sowing: when, how deep, germination temperature, direct or pre-cultivation"),
  plantingInfo: z.string().optional().describe("Planting out: when and how"),
  spacingInfo: z.string().optional().describe("Spacing in the row and between rows"),
  siteInfo: z.string().optional().describe("Site: sun, soil"),
  careInfo: z.string().optional().describe("Care: staking, pinching out, watering"),
  harvestInfo: z.string().optional().describe("Harvest: when and how"),
  hint: z.string().optional().describe("Most important hint, e.g. crop rotation"),
};

export const PlantSpeciesSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}PlantSpecies`),
    name: z.string().min(1).describe("Common name"),
    canGrowFromSeed: z.boolean().optional().describe("Can grow from seed"),
    scientificName: z.string().optional().describe("Scientific botanical name"),
    family: z.string().optional().describe("Botanical family"),
    description: z.string().optional(),
    icon: z.string().optional().describe("Icon/emoji for display"),
    imageUrl: z.string().optional().describe("Primary image URL"),
    images: z.array(z.string()).optional().describe("Additional image URLs"),
    ...GardenerFactsShape,
    growingSeason: GrowingSeasonSchema.optional(),
    requirements: RequirementsSchema,
    physicalCharacteristics: PhysicalCharacteristicsSchema,
    timing: TimingSchema,
    externalIdentifiers: ExternalIdentifiersSchema,
    taxonomy: TaxonomySchema,
    climateData: ClimateDataSchema,
    gardeningInfo: GardeningInfoSchema,
    authorityLinks: z.array(AuthorityLinkSchema).optional().describe("Links to external authorities"),
  })
  .loose()
  .meta({
    id: "PlantSpecies",
    title: "Plant Species",
    description: "A plant species with botanical and gardening information",
  });

export const PlantVarietySchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}PlantVariety`),
    name: z.string().min(1).describe("Variety name"),
    species: PlantSpeciesSchema.optional().describe("Reference to plant species"),
    description: z.string().optional(),
    icon: z.string().optional().describe("Icon/emoji for display"),
    imageUrl: z.string().optional().describe("Primary image URL"),
    images: z.array(z.string()).optional().describe("Additional image URLs"),
    growingSeason: GrowingSeasonSchema.optional(),
    characteristics: z.string().optional().describe("Special characteristics of this variety"),
    sourceInfo: z.string().optional().describe("Seed source or breeder information"),
    requirements: RequirementsSchema,
    physicalCharacteristics: PhysicalCharacteristicsSchema,
    timing: TimingSchema,
    externalIdentifiers: ExternalIdentifiersSchema,
    taxonomy: TaxonomySchema,
    climateData: ClimateDataSchema,
    gardeningInfo: GardeningInfoSchema,
    authorityLinks: z.array(AuthorityLinkSchema).optional().describe("Links to external authorities"),
  })
  .loose()
  .meta({
    id: "PlantVariety",
    title: "Plant Variety",
    description: "A specific variety of a plant species",
  });

// const plantSpeciesJsonSchema = z.toJSONSchema(PlantSpeciesSchema, {
//   target: "draft-7",
//   reused: "inline",
// }) as JSONSchema7;
//
// const plantVarietyJsonSchema = z.toJSONSchema(PlantVarietySchema, {
//   target: "draft-7",
//   reused: "inline",
// }) as JSONSchema7;

const monthProp = {
  type: "integer" as const,
  minimum: 1,
  maximum: 12,
};

const gardenerFactsProperties = {
  nutrientDemand: {
    type: "string" as const,
    enum: [...NUTRIENT_DEMANDS],
    title: "Nutrient demand",
    description: "Heavy, medium or light feeder",
  },
  perennial: { type: "boolean" as const, title: "Perennial", description: "Perennial / stays in the bed for several seasons" },
  sowingInfo: { type: "string" as const, title: "Sowing", description: "Sowing: when, how deep, germination temperature, direct or pre-cultivation" },
  plantingInfo: { type: "string" as const, title: "Planting out", description: "Planting out: when and how" },
  spacingInfo: { type: "string" as const, title: "Spacing", description: "Spacing in the row and between rows" },
  siteInfo: { type: "string" as const, title: "Site", description: "Site: sun, soil" },
  careInfo: { type: "string" as const, title: "Care", description: "Care: staking, pinching out, watering" },
  harvestInfo: { type: "string" as const, title: "Harvest", description: "Harvest: when and how" },
  hint: { type: "string" as const, title: "Hint", description: "Most important hint, e.g. crop rotation" },
};

const plantDefinitions: NonNullable<JsonSchema["definitions"]> = {
    GrowingSeason: {
      type: "object",
      title: "Growing Season",
      description: "Year-independent growing season information",
      properties: {
        preCultivationStart: { ...monthProp, title: "Pre-cultivation start (month)", description: "Start month for pre-cultivation / pre-sprouting indoors (1-12)" },
        preCultivationEnd: { ...monthProp, title: "Pre-cultivation end (month)", description: "End month for pre-cultivation / pre-sprouting indoors (1-12)" },
        sowingStart: { ...monthProp, title: "Sowing start (month)", description: "Start month for sowing (1-12)" },
        sowingEnd: { ...monthProp, title: "Sowing end (month)", description: "End month for sowing (1-12)" },
        prickingStart: { ...monthProp, title: "Pricking start (month)", description: "Start month for pricking out (1-12)" },
        prickingEnd: { ...monthProp, title: "Pricking end (month)", description: "End month for pricking out (1-12)" },
        plantingStart: { ...monthProp, title: "Planting start (month)", description: "Start month for planting (1-12)" },
        plantingEnd: { ...monthProp, title: "Planting end (month)", description: "End month for planting (1-12)" },
        harvestStart: { ...monthProp, title: "Harvest start (month)", description: "Start month for harvest (1-12)" },
        harvestEnd: { ...monthProp, title: "Harvest end (month)", description: "End month for harvest (1-12)" },
        sowingOutdoorsStart: { type: "integer", minimum: 0, title: "Outdoor sowing start (day)", description: "Start day for outdoor sowing (0-364+)" },
        sowingOutdoorsEnd: { type: "integer", minimum: 0, title: "Outdoor sowing end (day)", description: "End day for outdoor sowing (0-364+)" },
        sowingUnderGlassStart: { type: "integer", minimum: 0, title: "Under-glass sowing start (day)", description: "Start day for sowing under glass (0-364+)" },
        sowingUnderGlassEnd: { type: "integer", minimum: 0, title: "Under-glass sowing end (day)", description: "End day for sowing under glass (0-364+)" },
        harvestStartDay: { type: "integer", minimum: 0, title: "Harvest start (day)", description: "Start day for harvest (0-364+)" },
        harvestEndDay: { type: "integer", minimum: 0, title: "Harvest end (day)", description: "End day for harvest (0-364+)" },
      },
      additionalProperties: true,
    },
    Requirements: {
      type: "object",
      title: "Requirements",
      properties: {
        sun: { type: "string", enum: ["full_sun", "partial_shade", "full_shade"], title: "Sun" },
        water: { type: "string", enum: ["low", "medium", "high"], title: "Water" },
        soil: { type: "string", title: "Soil", description: "Soil requirements" },
        pH: { type: "string", title: "pH", description: "Soil pH requirements" },
      },
      additionalProperties: true,
    },
    PhysicalCharacteristics: {
      type: "object",
      title: "Physical characteristics",
      properties: {
        spacing: { type: "number", exclusiveMinimum: 0, title: "Spacing (cm)", description: "Recommended spacing in cm" },
        rowSpacing: { type: "number", exclusiveMinimum: 0, title: "Row spacing (cm)", description: "Recommended spacing between rows in cm" },
        height: { type: "number", exclusiveMinimum: 0, title: "Height (cm)", description: "Typical height in cm" },
        spread: { type: "number", exclusiveMinimum: 0, title: "Spread (cm)", description: "Typical spread in cm" },
      },
      additionalProperties: true,
    },
    Timing: {
      type: "object",
      title: "Timing",
      properties: {
        germinationDays: { type: "integer", exclusiveMinimum: 0, title: "Germination (days)", description: "Germination time in days" },
        daysToHarvest: { type: "integer", exclusiveMinimum: 0, title: "Days to harvest", description: "Days from sowing to harvest" },
      },
      additionalProperties: true,
    },
    ExternalIdentifiers: {
      type: "object",
      title: "External identifiers",
      properties: {
        gbifKey: { type: "number", title: "GBIF key", description: "GBIF species key" },
        powoId: { type: "string", title: "POWO ID", description: "Plants of the World Online ID" },
        openFarmSlug: { type: "string", title: "OpenFarm slug", description: "OpenFarm crop slug" },
        wikidataId: { type: "string", title: "Wikidata ID", description: "Wikidata Q-ID" },
      },
      additionalProperties: true,
    },
    Taxonomy: {
      type: "object",
      title: "Taxonomy",
      properties: {
        kingdom: { type: "string", title: "Kingdom", description: "Kingdom (e.g., Plantae)" },
        phylum: { type: "string", title: "Phylum", description: "Phylum/Division" },
        class: { type: "string", title: "Class" },
        order: { type: "string", title: "Order" },
        family: { type: "string", title: "Family" },
        genus: { type: "string", title: "Genus" },
        species: { type: "string", title: "Species", description: "Species epithet" },
        rank: { type: "string", title: "Rank", description: "Taxonomic rank" },
      },
      additionalProperties: true,
    },
    ClimateData: {
      type: "object",
      title: "Climate data",
      properties: {
        hardinessZoneMin: { type: "number", title: "Hardiness zone (min)", description: "Minimum USDA hardiness zone" },
        hardinessZoneMax: { type: "number", title: "Hardiness zone (max)", description: "Maximum USDA hardiness zone" },
        minTemperature: { type: "number", title: "Min temperature (°C)", description: "Minimum temperature in °C" },
        maxTemperature: { type: "number", title: "Max temperature (°C)", description: "Maximum temperature in °C" },
        frostTolerant: { type: "boolean", title: "Frost tolerant", description: "Can tolerate frost" },
      },
      additionalProperties: true,
    },
    GardeningInfo: {
      type: "object",
      title: "Gardening info",
      properties: {
        companions: { type: "array", items: { type: "string" }, title: "Companions", description: "Companion plant names" },
        antagonists: { type: "array", items: { type: "string" }, title: "Antagonists", description: "Plants to avoid nearby" },
        commonPests: { type: "array", items: { type: "string" }, title: "Common pests", description: "Common pest names" },
        commonDiseases: { type: "array", items: { type: "string" }, title: "Common diseases", description: "Common disease names" },
        sowingMethod: { type: "string", title: "Sowing method", description: "Sowing method (e.g., direct, transplant)" },
      },
      additionalProperties: true,
    },
    AuthorityLink: {
      type: "object",
      title: "Authority link",
      properties: {
        authorityIRI: { type: "string", title: "Authority IRI", description: "Authority IRI (e.g., http://www.wikidata.org)" },
        authorityID: { type: "string", title: "Authority ID", description: "ID in the authority" },
        authorityLabel: { type: "string", title: "Authority label", description: "Label from authority" },
      },
      required: ["authorityIRI", "authorityID"],
      additionalProperties: true,
    },
    PlantSpecies: {
      type: "object",
      title: "Plant Species",
      description: "A plant species with botanical and gardening information",
      properties: {
        "@id": { type: "string", title: "ID" },
        "@type": { type: "string", const: `${GARDEN_IRI}PlantSpecies`, title: "Type" },
        name: { type: "string", minLength: 1, title: "Name", description: "Common name" },
        canGrowFromSeed: { type: "boolean", title: "Can grow from seed" },
        scientificName: { type: "string", title: "Scientific name", description: "Scientific botanical name" },
        family: { type: "string", title: "Family", description: "Botanical family" },
        description: { type: "string", title: "Description" },
        icon: { type: "string", title: "Icon", description: "Icon/emoji for display" },
        imageUrl: { type: "string", title: "Image URL", description: "Primary image URL" },
        images: { type: "array", items: { type: "string" }, title: "Images", description: "Additional image URLs" },
        ...gardenerFactsProperties,
        growingSeason: { $ref: "#/definitions/GrowingSeason", title: "Growing season" },
        requirements: { $ref: "#/definitions/Requirements", title: "Requirements" },
        physicalCharacteristics: { $ref: "#/definitions/PhysicalCharacteristics", title: "Physical characteristics" },
        timing: { $ref: "#/definitions/Timing", title: "Timing" },
        externalIdentifiers: { $ref: "#/definitions/ExternalIdentifiers", title: "External identifiers" },
        taxonomy: { $ref: "#/definitions/Taxonomy", title: "Taxonomy" },
        climateData: { $ref: "#/definitions/ClimateData", title: "Climate data" },
        gardeningInfo: { $ref: "#/definitions/GardeningInfo", title: "Gardening info" },
        authorityLinks: {
          type: "array",
          title: "Authority links",
          description: "Links to external authorities",
          items: { $ref: "#/definitions/AuthorityLink" },
        },
      },
      required: ["name"],
      additionalProperties: true,
    },
    PlantVariety: {
      type: "object",
      title: "Plant Variety",
      description: "A specific variety of a plant species",
      properties: {
        "@id": { type: "string", title: "ID" },
        "@type": { type: "string", const: `${GARDEN_IRI}PlantVariety`, title: "Type" },
        name: { type: "string", minLength: 1, title: "Name", description: "Variety name" },
        species: { $ref: "#/definitions/PlantSpecies", title: "Species", description: "Reference to plant species" },
        description: { type: "string", title: "Description" },
        icon: { type: "string", title: "Icon", description: "Icon/emoji for display" },
        imageUrl: { type: "string", title: "Image URL", description: "Primary image URL" },
        images: { type: "array", items: { type: "string" }, title: "Images", description: "Additional image URLs" },
        growingSeason: { $ref: "#/definitions/GrowingSeason", title: "Growing season" },
        characteristics: { type: "string", title: "Characteristics", description: "Special characteristics of this variety" },
        sourceInfo: { type: "string", title: "Source info", description: "Seed source or breeder information" },
        requirements: { $ref: "#/definitions/Requirements", title: "Requirements" },
        physicalCharacteristics: { $ref: "#/definitions/PhysicalCharacteristics", title: "Physical characteristics" },
        timing: { $ref: "#/definitions/Timing", title: "Timing" },
        externalIdentifiers: { $ref: "#/definitions/ExternalIdentifiers", title: "External identifiers" },
        taxonomy: { $ref: "#/definitions/Taxonomy", title: "Taxonomy" },
        climateData: { $ref: "#/definitions/ClimateData", title: "Climate data" },
        gardeningInfo: { $ref: "#/definitions/GardeningInfo", title: "Gardening info" },
        authorityLinks: {
          type: "array",
          title: "Authority links",
          description: "Links to external authorities",
          items: { $ref: "#/definitions/AuthorityLink" },
        },
      },
      required: ["name"],
      additionalProperties: true,
    },
};

export const plantSchema: JsonSchema = mergeSchemaDefinitions([
  { definitions: plantDefinitions },
]);

// ---------------------------------------------------------------------------
// Gardener-oriented UI schemata.
// The schema keeps the botanical fields (taxonomy, climate data, authority
// links …) because the GBIF/POWO/OpenFarm mappings write into them, but the
// forms only show what a gardener needs. Nested controls carry an explicit
// `i18n` key so the flat keys in i18n/<lang>/jsonforms.json apply.
// ---------------------------------------------------------------------------

const ctl = (scope: string, extra: Record<string, unknown> = {}) => ({
  type: "Control",
  scope: `#/properties/${scope}`,
  i18n: scope,
  ...extra,
});
const row = (...elements: unknown[]) => ({ type: "HorizontalLayout", elements });
const group = (i18n: string, label: string, elements: unknown[]) => ({
  type: "Group",
  label,
  i18n,
  elements,
});

const growingSeasonDetail = {
  type: "VerticalLayout",
  elements: [
    row(ctl("preCultivationStart"), ctl("preCultivationEnd")),
    row(ctl("sowingStart"), ctl("sowingEnd")),
    row(ctl("plantingStart"), ctl("plantingEnd")),
    row(ctl("harvestStart"), ctl("harvestEnd")),
  ],
};

const multi = { options: { multi: true } };
/** main image (URL with preview) — shown instead of the icon where there is room */
const mainImage = ctl("imageUrl", { options: { customRenderer: "ImageUrlRenderer" } });

const plantSpeciesUISchema = {
  type: "VerticalLayout",
  elements: [
    row(ctl("name"), ctl("icon")),
    mainImage,
    row(ctl("scientificName"), ctl("family")),
    row(ctl("nutrientDemand"), ctl("perennial")),
    ctl("description", multi),
    group("seedPacket", "Seed packet facts", [
      ctl("sowingInfo"),
      ctl("plantingInfo"),
      ctl("spacingInfo"),
      ctl("siteInfo"),
      ctl("careInfo"),
      ctl("harvestInfo"),
      ctl("hint"),
    ]),
    ctl("growingSeason", { options: { detail: growingSeasonDetail } }),
    ctl("physicalCharacteristics", {
      options: {
        detail: { type: "VerticalLayout", elements: [row(ctl("spacing"), ctl("rowSpacing"), ctl("height"))] },
      },
    }),
    ctl("timing", {
      options: {
        detail: { type: "VerticalLayout", elements: [row(ctl("germinationDays"), ctl("daysToHarvest"))] },
      },
    }),
    ctl("requirements", {
      options: {
        detail: { type: "VerticalLayout", elements: [row(ctl("sun"), ctl("water"))] },
      },
    }),
    ctl("gardeningInfo", {
      options: {
        detail: { type: "VerticalLayout", elements: [ctl("companions"), ctl("antagonists")] },
      },
    }),
    ctl("images"),
  ],
};

const plantVarietyUISchema = {
  type: "VerticalLayout",
  elements: [
    row(ctl("name"), ctl("icon")),
    mainImage,
    ctl("species"),
    ctl("characteristics"),
    ctl("sourceInfo"),
    ctl("description", multi),
    ctl("growingSeason", { options: { detail: growingSeasonDetail } }),
  ],
};

export const plantConfiguration = {
  schema: plantSchema,
  primaryFields: {
    PlantSpecies: {
      label: "name",
      description: "scientificName",
      image: "imageUrl",
    },
    PlantVariety: {
      label: "name",
      description: "characteristics",
      image: "imageUrl",
    },
  },
  typeNameLabelMap: {
    PlantSpecies: "Plant Species",
    PlantVariety: "Plant Variety",
  },
  typeNameUiSchemaOptionsMap: {
    PlantSpecies: {
      dropdown: true,
    },
    PlantVariety: {
      dropdown: true,
    },
  },
  uischemata: {
    PlantSpecies: plantSpeciesUISchema,
    PlantVariety: plantVarietyUISchema,
  },
};

export type PlantSpecies = z.infer<typeof PlantSpeciesSchema>;
export type PlantVariety = z.infer<typeof PlantVarietySchema>;
export type GrowingSeason = z.infer<typeof GrowingSeasonSchema>;
export type Requirements = z.infer<typeof RequirementsSchema>;
export type PhysicalCharacteristics = z.infer<typeof PhysicalCharacteristicsSchema>;
export type Timing = z.infer<typeof TimingSchema>;

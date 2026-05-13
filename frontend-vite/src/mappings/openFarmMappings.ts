import { DeclarativeMappings } from "@graviola/edb-data-mapping";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

// Map sun requirements from OpenFarm to our schema
const mapSunRequirements = (value: string): string => {
  const mapping: Record<string, string> = {
    "full sun": "full_sun",
    "partial shade": "partial_shade",
    "full shade": "full_shade",
  };
  return mapping[value?.toLowerCase()] || "full_sun";
};

export const openFarmPlantSpeciesMappings: DeclarativeMappings = [
  {
    source: {
      path: "$.attributes.name",
    },
    target: {
      path: "name",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.binomial_name",
    },
    target: {
      path: "scientificName",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.description",
    },
    target: {
      path: "description",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.main_image_path",
    },
    target: {
      path: "imageUrl",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.sun_requirements",
    },
    target: {
      path: "requirements.sun",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.spread",
    },
    target: {
      path: "physicalCharacteristics.spread",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.row_spacing",
    },
    target: {
      path: "physicalCharacteristics.spacing",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.height",
    },
    target: {
      path: "physicalCharacteristics.height",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.attributes.sowing_method",
    },
    target: {
      path: "gardeningInfo.sowingMethod",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.id",
    },
    target: {
      path: "externalIdentifiers.openFarmSlug",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
];

export const openFarmPlantVarietyMappings: DeclarativeMappings = [
  ...openFarmPlantSpeciesMappings,
  {
    source: {
      path: "$.attributes.name",
    },
    target: {
      path: "characteristics",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
];


import { DeclarativeMappings } from "@graviola/edb-data-mapping";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

export const powoPlantSpeciesMappings: DeclarativeMappings = [
  {
    source: {
      path: "$.name",
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
      path: "$.name",
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
      path: "$.family",
    },
    target: {
      path: "family",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.family",
    },
    target: {
      path: "taxonomy.family",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.rank",
    },
    target: {
      path: "taxonomy.rank",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.fqId",
    },
    target: {
      path: "externalIdentifiers.powoId",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
];

export const powoPlantVarietyMappings: DeclarativeMappings = [
  ...powoPlantSpeciesMappings,
];


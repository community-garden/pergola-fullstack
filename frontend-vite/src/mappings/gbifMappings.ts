import { DeclarativeMappings } from "@graviola/edb-data-mapping";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

export const gbifPlantSpeciesMappings: DeclarativeMappings = [
  // Basic identification - name and scientific name
  {
    source: {
      path: "$.canonicalName",
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
      path: "$.scientificName",
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
      path: "$.authorship",
    },
    target: {
      path: "scientificNameAuthorship",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  
  // Common names - take first English vernacular name
  {
    source: {
      path: "$.vernacularNames[?(@.language=='eng')].vernacularName",
    },
    target: {
      path: "commonName",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  
  // Taxonomy - complete hierarchy
  {
    source: {
      path: "$.kingdom",
    },
    target: {
      path: "taxonomy.kingdom",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.phylum",
    },
    target: {
      path: "taxonomy.phylum",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.class",
    },
    target: {
      path: "taxonomy.class",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.order",
    },
    target: {
      path: "taxonomy.order",
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
      path: "$.genus",
    },
    target: {
      path: "taxonomy.genus",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.species",
    },
    target: {
      path: "taxonomy.species",
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
  
  // External identifiers
  {
    source: {
      path: "$.key",
    },
    target: {
      path: "externalIdentifiers.gbifKey",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.taxonID",
    },
    target: {
      path: "externalIdentifiers.taxonID",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.nubKey",
    },
    target: {
      path: "externalIdentifiers.nubKey",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  
  // Status information
  {
    source: {
      path: "$.taxonomicStatus",
    },
    target: {
      path: "taxonomicStatus",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  {
    source: {
      path: "$.extinct",
    },
    target: {
      path: "extinct",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
  
  // Descriptions - take first description
  {
    source: {
      path: "$.descriptions[0].description",
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
  
  // Habitats - join as string
  {
    source: {
      path: "$.habitats",
    },
    target: {
      path: "habitat",
    },
    mapping: {
      strategy: {
        id: "takeFirst",
      },
    },
  },
];

export const gbifPlantVarietyMappings: DeclarativeMappings = [
  ...gbifPlantSpeciesMappings,
];


import { DeclarativeMapping } from "@graviola/edb-data-mapping";
import { NormDataMappings } from "@graviola/edb-core-types";
import {
  gbifPlantSpeciesMappings,
  gbifPlantVarietyMappings,
} from "./gbifMappings";

// Type map for GBIF (mapping external type names to our type names)
const gbifTypeMap: Record<string, string> = {
  "SPECIES": "PlantSpecies",
  "VARIETY": "PlantVariety",
  "SUBSPECIES": "PlantVariety",
};

// GBIF mappings structured per type
const gbifMappings: DeclarativeMapping = {
  PlantSpecies: gbifPlantSpeciesMappings,
  PlantVariety: gbifPlantVarietyMappings,
};

// Structure as NormDataMappings (authorityIRI -> {label, mapping, sameAsTypeMap})
export const plantMappings: NormDataMappings<DeclarativeMapping> = {
  "https://api.gbif.org": {
    label: "GBIF",
    sameAsTypeMap: gbifTypeMap,
    mapping: gbifMappings,
  },
};


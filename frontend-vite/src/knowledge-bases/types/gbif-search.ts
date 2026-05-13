/**
 * Auto-generated types from gbif-search.jsonl
 * Generated: 2025-12-10T11:54:46.574Z
 * Samples: 4
 * 
 * DO NOT EDIT MANUALLY - regenerate with: bun generate-types.ts
 */

export interface GbifSearch {
    offset:       number;
    limit:        number;
    endOfRecords: boolean;
    count:        number;
    results:      Result[];
    facets:       any[];
}

export interface Result {
    key:                     number;
    datasetKey:              string;
    parentKey?:              number;
    parent?:                 string;
    kingdom?:                string;
    phylum?:                 string;
    order?:                  string;
    family?:                 string;
    genus?:                  string;
    species:                 string;
    kingdomKey?:             number;
    phylumKey?:              number;
    classKey?:               number;
    orderKey?:               number;
    familyKey?:              number;
    genusKey?:               number;
    speciesKey:              number;
    scientificName:          string;
    canonicalName?:          string;
    nameType:                NameType;
    taxonomicStatus:         TaxonomicStatus;
    rank:                    Rank;
    origin:                  Origin;
    numDescendants:          number;
    numOccurrences:          number;
    taxonID:                 string;
    habitats:                string[];
    nomenclaturalStatus:     any[];
    threatStatuses:          string[];
    descriptions:            Description[];
    vernacularNames:         VernacularName[];
    synonym:                 boolean;
    higherClassificationMap: { [key: string]: string };
    class?:                  string;
    nubKey?:                 number;
    nameKey?:                number;
    constituentKey?:         string;
    authorship?:             string;
    extinct?:                boolean;
    publishedIn?:            string;
    acceptedKey?:            number;
    accepted?:               string;
}

export interface Description {
    description: string;
}

export enum NameType {
    Scientific = "SCIENTIFIC",
    Virus = "VIRUS",
}

export enum Origin {
    Source = "SOURCE",
}

export enum Rank {
    Species = "SPECIES",
}

export enum TaxonomicStatus {
    Accepted = "ACCEPTED",
    Synonym = "SYNONYM",
}

export interface VernacularName {
    vernacularName: string;
    language?:      string;
}

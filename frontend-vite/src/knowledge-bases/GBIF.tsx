import { FinderKnowledgeBaseDescription } from "@graviola/semantic-jsonform-types";
import { IconButton, Stack } from "@mui/material";
import { Check, Public } from "@mui/icons-material";
import { ClassicResultListItem } from "@graviola/edb-basic-components";
import { KBFetcher, defaultFetcher } from "./types";

// GBIF API types
interface GBIFSpecies {
  key: number;
  scientificName: string;
  canonicalName?: string;
  authorship?: string;
  rank?: string;
  status?: string;
  kingdom?: string;
  phylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  kingdomKey?: number;
  phylumKey?: number;
  classKey?: number;
  orderKey?: number;
  familyKey?: number;
  genusKey?: number;
  speciesKey?: number;
  acceptedKey?: number;
  accepted?: string;
  vernacularNames?: Array<{
    vernacularName: string;
    language: string;
  }>;
}

interface GBIFSearchResponse {
  results: GBIFSpecies[];
  count: number;
  limit: number;
  offset: number;
}

const GBIF_BASE_URL = "https://api.gbif.org/v1";
const AUTHORITY_IRI = "https://api.gbif.org";

export const createGBIFKB = (
  fetcher: KBFetcher = defaultFetcher
): FinderKnowledgeBaseDescription => ({
  id: "gbif",
  label: "GBIF",
  authorityIRI: AUTHORITY_IRI,
  description: "Global Biodiversity Information Facility",
  icon: <Public />,
  
  find: async (searchString, typeIRI, typeName, findOptions) => {
    try {
      const url = new URL(`${GBIF_BASE_URL}/species/search`);
      url.searchParams.set("q", searchString);
      url.searchParams.set("limit", String(findOptions?.limit || 10));
      url.searchParams.set("rank", "SPECIES");
      
      const data: GBIFSearchResponse = await fetcher(
        ["gbif", "search", searchString],
        { url: url.toString() }
      );
      
      return data.results.map((species) => ({
        id: String(species.key),
        key: species.key,
        title: species.scientificName,
        description: [
          species.family && `Family: ${species.family}`,
          species.rank && `Rank: ${species.rank}`,
          species.status && `Status: ${species.status}`,
        ].filter(Boolean).join(" • "),
        species,
      }));
    } catch (error) {
      console.error("GBIF search error:", error);
      return [];
    }
  },
  
  getEntity: async (id, typeIRI) => {
    try {
      const url = `${GBIF_BASE_URL}/species/${id}`;
      
      const data: GBIFSpecies = await fetcher(
        ["gbif", "entity", id],
        { url }
      );
      return data;
    } catch (error) {
      console.error("GBIF getEntity error:", error);
      return null;
    }
  },
  
  listItemRenderer: (entry, idx, typeIRI, selected, onSelect, onAccept) => {
    const data = entry as any;
    const gbifIRI = `${AUTHORITY_IRI}/species/${data.key}`;
    
    const handleAccept = async () => {
      try {
        const url = `${GBIF_BASE_URL}/species/${data.key}`;
        const fullData: GBIFSpecies = await fetcher(
          ["gbif", "accept", String(data.key)],
          { url }
        );
        
        onAccept?.(gbifIRI, {
          ...data,
          allProps: fullData,
        });
      } catch (error) {
        console.error("Error fetching full GBIF data:", error);
      }
    };
    
    return (
      <ClassicResultListItem
        key={data.key}
        id={gbifIRI}
        index={idx}
        onSelected={(id, index) => onSelect?.(id, index)}
        label={data.title}
        secondary={data.description}
        altAvatar={String(idx + 1)}
        selected={selected}
        onEnter={handleAccept}
        listItemProps={{
          secondaryAction: (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={handleAccept} size="small">
                <Check />
              </IconButton>
            </Stack>
          ),
        }}
      />
    );
  },
});

// Default instance using default fetcher
export const GBIF = createGBIFKB();


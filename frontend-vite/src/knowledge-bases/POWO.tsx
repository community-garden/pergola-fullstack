import { FinderKnowledgeBaseDescription } from "@graviola/semantic-jsonform-types";
import { IconButton, Stack } from "@mui/material";
import { Check, LocalFlorist } from "@mui/icons-material";
import { ClassicResultListItem } from "@graviola/edb-basic-components";
import { KBFetcher, defaultFetcher } from "./types";

// POWO API types
interface POWOTaxon {
  fqId: string;
  name: string;
  author?: string;
  rank?: string;
  family?: string;
  accepted?: boolean;
  synonym?: boolean;
  imageLinks?: string[];
  distribution?: {
    natives?: string[];
    introduced?: string[];
  };
}

interface POWOSearchResult {
  fqId: string;
  name: string;
  author?: string;
  rank?: string;
  family?: string;
  accepted?: boolean;
}

interface POWOSearchResponse {
  results: POWOSearchResult[];
  cursor?: string;
}

const POWO_BASE_URL = "http://www.plantsoftheworldonline.org/api/1";
const AUTHORITY_IRI = "http://www.plantsoftheworldonline.org";

export const createPOWOKB = (
  fetcher: KBFetcher = defaultFetcher
): FinderKnowledgeBaseDescription => ({
  id: "powo",
  label: "POWO",
  authorityIRI: AUTHORITY_IRI,
  description: "Plants of the World Online (Kew)",
  icon: <LocalFlorist />,
  
  find: async (searchString, typeIRI, typeName, findOptions) => {
    try {
      const url = new URL(`${POWO_BASE_URL}/search`);
      url.searchParams.set("q", searchString);
      url.searchParams.set("limit", String(findOptions?.limit || 10));
      
      const data: POWOSearchResponse = await fetcher(
        ["powo", "search", searchString],
        { url: url.toString() }
      );
      
      return data.results.map((taxon) => ({
        id: taxon.fqId,
        key: taxon.fqId,
        title: `${taxon.name}${taxon.author ? ` ${taxon.author}` : ""}`,
        description: [
          taxon.family && `Family: ${taxon.family}`,
          taxon.rank && `Rank: ${taxon.rank}`,
          taxon.accepted !== undefined && (taxon.accepted ? "Accepted" : "Synonym"),
        ].filter(Boolean).join(" • "),
        taxon,
      }));
    } catch (error) {
      console.error("POWO search error:", error);
      return [];
    }
  },
  
  getEntity: async (id, typeIRI) => {
    try {
      const url = `${POWO_BASE_URL}/taxon/${encodeURIComponent(id)}`;
      
      const data: POWOTaxon = await fetcher(
        ["powo", "entity", id],
        { url }
      );
      return data;
    } catch (error) {
      console.error("POWO getEntity error:", error);
      return null;
    }
  },
  
  listItemRenderer: (entry, idx, typeIRI, selected, onSelect, onAccept) => {
    const data = entry as any;
    const powoIRI = `${AUTHORITY_IRI}/taxon/${encodeURIComponent(data.key)}`;
    
    const handleAccept = async () => {
      try {
        const url = `${POWO_BASE_URL}/taxon/${encodeURIComponent(data.key)}`;
        const fullData: POWOTaxon = await fetcher(
          ["powo", "accept", data.key],
          { url }
        );
        
        onAccept?.(powoIRI, {
          ...data,
          allProps: fullData,
        });
      } catch (error) {
        console.error("Error fetching full POWO data:", error);
      }
    };
    
    return (
      <ClassicResultListItem
        key={data.key}
        id={powoIRI}
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
export const POWO = createPOWOKB();


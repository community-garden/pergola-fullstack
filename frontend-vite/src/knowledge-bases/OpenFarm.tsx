import { FinderKnowledgeBaseDescription } from "@graviola/semantic-jsonform-types";
import { IconButton, Stack } from "@mui/material";
import { Check, Grass } from "@mui/icons-material";
import { ClassicResultListItem } from "@graviola/edb-basic-components";
import { KBFetcher, defaultFetcher } from "./types";

// OpenFarm API types
interface OpenFarmCropAttributes {
  name: string;
  binomial_name?: string;
  description?: string;
  sun_requirements?: string;
  sowing_method?: string;
  spread?: number;
  row_spacing?: number;
  height?: number;
  processing_pictures?: number;
  main_image_path?: string;
  taxon?: string;
  guides_count?: number;
}

interface OpenFarmCrop {
  id: string;
  type: "crops";
  attributes: OpenFarmCropAttributes;
}

interface OpenFarmSearchResponse {
  data: OpenFarmCrop[];
}

interface OpenFarmEntityResponse {
  data: OpenFarmCrop;
  included?: any[];
}

const OPENFARM_BASE_URL = "https://openfarm.cc/api/v1";
const AUTHORITY_IRI = "https://openfarm.cc";

export const createOpenFarmKB = (
  fetcher: KBFetcher = defaultFetcher
): FinderKnowledgeBaseDescription => ({
  id: "openfarm",
  label: "OpenFarm",
  authorityIRI: AUTHORITY_IRI,
  description: "Open source farming and gardening knowledge",
  icon: <Grass />,
  
  find: async (searchString, typeIRI, typeName, findOptions) => {
    try {
      const url = new URL(`${OPENFARM_BASE_URL}/crops`);
      url.searchParams.set("filter", searchString);
      
      const data: OpenFarmSearchResponse = await fetcher(
        ["openfarm", "search", searchString],
        { url: url.toString() }
      );
      const limit = findOptions?.limit || 10;
      
      return data.data.slice(0, limit).map((crop) => ({
        id: crop.id,
        key: crop.id,
        title: crop.attributes.name,
        description: crop.attributes.binomial_name || crop.attributes.description?.substring(0, 100),
        thumbnail: crop.attributes.main_image_path ? {
          url: crop.attributes.main_image_path,
        } : undefined,
        attributes: crop.attributes,
      }));
    } catch (error) {
      console.error("OpenFarm search error:", error);
      return [];
    }
  },
  
  getEntity: async (id, typeIRI) => {
    try {
      const url = `${OPENFARM_BASE_URL}/crops/${id}`;
      
      const data: OpenFarmEntityResponse = await fetcher(
        ["openfarm", "entity", id],
        { url }
      );
      return data.data;
    } catch (error) {
      console.error("OpenFarm getEntity error:", error);
      return null;
    }
  },
  
  listItemRenderer: (entry, idx, typeIRI, selected, onSelect, onAccept) => {
    const data = entry as any;
    const openFarmIRI = `${AUTHORITY_IRI}/crops/${data.key}`;
    
    const handleAccept = async () => {
      try {
        const url = `${OPENFARM_BASE_URL}/crops/${data.key}`;
        const fullData: OpenFarmEntityResponse = await fetcher(
          ["openfarm", "accept", data.key],
          { url }
        );
        
        onAccept?.(openFarmIRI, {
          ...data,
          allProps: fullData.data,
        });
      } catch (error) {
        console.error("Error fetching full OpenFarm data:", error);
      }
    };
    
    return (
      <ClassicResultListItem
        key={data.key}
        id={openFarmIRI}
        index={idx}
        onSelected={(id, index) => onSelect?.(id, index)}
        label={data.title}
        secondary={data.description}
        avatar={data.thumbnail?.url}
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
export const OpenFarm = createOpenFarmKB();


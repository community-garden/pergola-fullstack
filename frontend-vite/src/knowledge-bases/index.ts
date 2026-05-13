import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FinderKnowledgeBaseDescription } from "@graviola/semantic-jsonform-types";
import { createGBIFKB } from "./GBIF";
import { createQueryClientFetcher } from "./types";

export { createGBIFKB } from "./GBIF";
export type { KBFetcher } from "./types";
export { defaultFetcher, createProxyFetcher, createQueryClientFetcher } from "./types";

const PROXY_URL = "http://localhost:4000";

export const usePlantKnowledgeBases = (): FinderKnowledgeBaseDescription[] => {
  const queryClient = useQueryClient();
  
  const fetcher = useMemo(
    () => createQueryClientFetcher(queryClient, PROXY_URL),
    [queryClient]
  );
  
  return useMemo(
    () => [createGBIFKB(fetcher)],
    [fetcher]
  );
};


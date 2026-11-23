import { useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { FinderKnowledgeBaseDescription } from "@graviola/semantic-jsonform-types";
import config from "@config/index";
import { createGBIFKB } from "./GBIF";
import { createQueryClientFetcher } from "./types";

export { createGBIFKB } from "./GBIF";
export type { KBFetcher } from "./types";
export { defaultFetcher, createProxyFetcher, createQueryClientFetcher } from "./types";

// Optional proxy (VITE_KB_PROXY_URL); empty = fetch the APIs directly (GBIF allows CORS).
const PROXY_URL = config.kbProxyUrl || undefined;

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


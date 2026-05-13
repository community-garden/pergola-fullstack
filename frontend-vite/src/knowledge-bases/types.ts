import type { QueryClient } from "@tanstack/react-query";

/**
 * Fetcher function type for knowledge base API calls
 * Used to enable proxying, testing, and response time measurement
 */
export type KBFetcher = (
  queryKey: string[],
  options: { url: string; headers?: Record<string, string> }
) => Promise<any>;

/**
 * Default fetcher implementation - direct fetch without proxy
 */
export const defaultFetcher: KBFetcher = async (_queryKey, options) => {
  const response = await fetch(options.url, {
    method: "GET",
    headers: options.headers || { Accept: "application/json" },
  });
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

/**
 * Proxy fetcher - routes requests through local proxy server
 * @param proxyUrl The proxy server URL (e.g., "http://localhost:4000")
 */
export const createProxyFetcher = (proxyUrl: string): KBFetcher => {
  return async (queryKey, options) => {
    const proxyURL = new URL(proxyUrl);
    proxyURL.searchParams.set("url", options.url);
    proxyURL.searchParams.set("queryKey", JSON.stringify(queryKey));
    
    const response = await fetch(proxyURL.toString(), {
      method: "GET",
      headers: options.headers || {},
    });
    
    if (!response.ok) throw new Error(response.statusText);
    const result = await response.json();
    
    // Proxy returns { data, meta }, extract data
    return result.data || result;
  };
};

/**
 * QueryClient fetcher - integrates with React Query for caching and DevTools
 * @param queryClient The React Query client instance
 * @param proxyUrl Optional proxy URL (if null, uses direct fetch)
 */
export const createQueryClientFetcher = (
  queryClient: QueryClient,
  proxyUrl?: string
): KBFetcher => {
  const baseFetcher = proxyUrl ? createProxyFetcher(proxyUrl) : defaultFetcher;
  
  return async (queryKey, options) => {
    // Use queryKey for React Query cache key
    return queryClient.fetchQuery({
      queryKey: [...queryKey, options.url],
      queryFn: async () => baseFetcher(queryKey, options),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    });
  };
};


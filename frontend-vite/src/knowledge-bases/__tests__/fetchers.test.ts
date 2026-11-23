import { afterEach, describe, expect, it, mock } from "bun:test";
import { QueryClient } from "@tanstack/react-query";
import { createQueryClientFetcher } from "../types";

const realFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = realFetch;
});

const mockFetch = () => {
  const fn = mock(async () => new Response(JSON.stringify({ data: { ok: 1 } }), { status: 200 }));
  globalThis.fetch = fn as unknown as typeof fetch;
  return fn;
};

describe("createQueryClientFetcher", () => {
  it("calls the API directly without a proxy", async () => {
    const fn = mockFetch();
    const fetcher = createQueryClientFetcher(new QueryClient());
    await fetcher(["gbif", "search", "x"], { url: "https://api.gbif.org/v1/species/search?q=x" });
    expect((fn.mock.calls[0] as unknown[])[0]).toBe("https://api.gbif.org/v1/species/search?q=x");
  });

  it("goes through the proxy when one is given", async () => {
    const fn = mockFetch();
    const fetcher = createQueryClientFetcher(new QueryClient(), "http://proxy.test:4000");
    await fetcher(["gbif", "search", "x"], { url: "https://api.gbif.org/v1/species/search?q=x" });
    const called = new URL(String((fn.mock.calls[0] as unknown[])[0]));
    expect(called.origin).toBe("http://proxy.test:4000");
    expect(called.searchParams.get("url")).toBe("https://api.gbif.org/v1/species/search?q=x");
  });
});

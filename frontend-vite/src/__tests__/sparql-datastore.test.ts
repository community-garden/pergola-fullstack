import { describe, it, expect, beforeAll } from "bun:test";
import N3 from "n3";
import datasetFactory from "@rdfjs/dataset";
import { traverseGraphExtractBySchema } from "@graviola/edb-graph-traversal";
import {
  makeSPARQLConstructQuery,
  load,
} from "@graviola/sparql-schema";
import { oxigraphCrudOptions } from "@graviola/remote-query-implementations";
import { bringDefinitionToTop } from "@graviola/json-schema-utils";
import type { JSONSchema7 } from "json-schema";
import type { WalkerOptions } from "@graviola/edb-core-types";

const SPARQL_API_URL =
  process.env.VITE_SPARQL_API_URL || "http://localhost:7878/query";
const BASE_IRI = "https://ontology.semantic-desk.top/garden#";
const TEST_ENTITY_IRI =
  "https://data.semantic-desk.top/garden/Garden/Wurzelwerk";

/**
 * Debugging "empty geoFeatures" in a generated CONSTRUCT: confirm the store with SELECT first.
 * CONSTRUCT omits triples whose variables are unbound inside OPTIONAL, so an empty geoFeatures
 * block usually means no `garden:geoFeatures` triples for that garden IRI.
 *
 * Example (POST to SPARQL_API_URL):
 * PREFIX garden: <https://ontology.semantic-desk.top/garden#>
 * SELECT ?o WHERE { <https://data.semantic-desk.top/garden/Garden/Wurzelwerk> garden:geoFeatures ?o . }
 */

const endpoint = {
  endpoint: SPARQL_API_URL,
  label: "SPARQL service",
  provider: "oxigraph" as const,
  active: true,
};

const walkerOptions: Partial<WalkerOptions> = {
  maxRecursion: 2,
  maxRecursionEachRef: 1,
};

let schema: JSONSchema7;
let crudFunctions: ReturnType<typeof oxigraphCrudOptions>;

beforeAll(async () => {
  const { schema: gardenSchema } = await import("../schema/garden-schema");
  schema = gardenSchema as JSONSchema7;
  crudFunctions = oxigraphCrudOptions(endpoint);
});

const sparqlSelect = async (query: string) => {
  const res = await fetch(SPARQL_API_URL, {
    headers: {
      accept: "application/sparql-results+json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `query=${encodeURIComponent(query)}`,
    method: "POST",
  });
  return res.json();
};

const sparqlConstruct = async (query: string) => {
  const res = await fetch(SPARQL_API_URL, {
    headers: {
      accept: "application/n-triples,*/*;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `query=${encodeURIComponent(query)}`,
    method: "POST",
  });
  return res;
};

// ---------------------------------------------------------------------------
// Step 1: Raw SPARQL endpoint reachability
// ---------------------------------------------------------------------------
describe("Step 1: SPARQL endpoint connectivity", () => {
  it("should reach the SPARQL endpoint with a simple ASK query", async () => {
    const res = await fetch(SPARQL_API_URL, {
      headers: {
        accept: "application/sparql-results+json",
        "content-type": "application/x-www-form-urlencoded",
      },
      body: `query=${encodeURIComponent("ASK { ?s ?p ?o }")}`,
      method: "POST",
    });

    expect(res.ok).toBe(true);
    const json = await res.json();
    console.log("ASK result:", json);
    expect(json).toHaveProperty("boolean");
  });

  it("should return triples with a simple CONSTRUCT", async () => {
    const query = `CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o } LIMIT 10`;
    const res = await sparqlConstruct(query);

    expect(res.ok).toBe(true);
    const ntriples = await res.text();
    console.log("Raw N-Triples (first 500 chars):", ntriples.slice(0, 500));
    console.log("N-Triples response length:", ntriples.length);
    expect(ntriples.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Step 2: N3 parsing + DatasetCore creation
// ---------------------------------------------------------------------------
describe("Step 2: N3 parsing into DatasetCore", () => {
  it("should parse N-Triples response into a dataset with quads", async () => {
    const query = `CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o } LIMIT 10`;
    const res = await sparqlConstruct(query);
    const ntriples = await res.text();

    const reader = new N3.Parser();
    const quads = reader.parse(ntriples);
    console.log("Parsed quad count:", quads.length);
    expect(quads.length).toBeGreaterThan(0);

    const ds = datasetFactory.dataset(quads);
    console.log("Dataset size:", ds.size);
    expect(ds.size).toBeGreaterThan(0);
  });

  it("should match what constructFetch returns", async () => {
    const query = `CONSTRUCT { ?s ?p ?o } WHERE { ?s ?p ?o } LIMIT 10`;
    const ds = await crudFunctions.constructFetch(query);
    console.log("constructFetch dataset size:", ds.size);
    expect(ds.size).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Step 3: Verify Wurzelwerk entity exists with data
// ---------------------------------------------------------------------------
describe("Step 3: Verify Wurzelwerk entity in the store", () => {
  it("should have rdf:type Garden", async () => {
    const json = await sparqlSelect(
      `ASK { <${TEST_ENTITY_IRI}> a <${BASE_IRI}Garden> }`,
    );
    console.log("Wurzelwerk is a Garden:", json.boolean);
    expect(json.boolean).toBe(true);
  });

  it("should list all triples for Wurzelwerk", async () => {
    const json = await sparqlSelect(
      `SELECT ?p ?o WHERE { <${TEST_ENTITY_IRI}> ?p ?o }`,
    );
    const bindings = json.results?.bindings || [];
    console.log(`Wurzelwerk triples (${bindings.length}):`);
    for (const b of bindings) {
      const obj =
        b.o?.type === "uri" ? `<${b.o?.value}>` : `"${b.o?.value}"`;
      console.log(`  <${b.p?.value}> ${obj}`);
    }
    expect(bindings.length).toBeGreaterThan(1);
  });
});

// ---------------------------------------------------------------------------
// Step 4: CONSTRUCT query generation from schema
// ---------------------------------------------------------------------------
describe("Step 4: CONSTRUCT query generation", () => {
  it("should generate a valid CONSTRUCT query for Wurzelwerk", () => {
    const gardenSchema = bringDefinitionToTop(schema, "Garden");
    console.log("Garden schema properties:", Object.keys((gardenSchema as any)?.properties || {}));

    const constructQuery = makeSPARQLConstructQuery(
      TEST_ENTITY_IRI,
      `${BASE_IRI}Garden`,
      gardenSchema as any,
      {
        defaultPrefix: BASE_IRI,
        queryBuildOptions: { prefixes: { "": BASE_IRI } },
        maxRecursion: walkerOptions.maxRecursion,
      } as any,
    );

    console.log("Generated CONSTRUCT query:\n", constructQuery);
    expect(constructQuery).toContain("CONSTRUCT");
    expect(constructQuery).toContain("Wurzelwerk");
  });

  it("should return non-empty N-Triples when executed", async () => {
    const gardenSchema = bringDefinitionToTop(schema, "Garden");
    const constructQuery = makeSPARQLConstructQuery(
      TEST_ENTITY_IRI,
      `${BASE_IRI}Garden`,
      gardenSchema as any,
      {
        defaultPrefix: BASE_IRI,
        queryBuildOptions: { prefixes: { "": BASE_IRI } },
        maxRecursion: walkerOptions.maxRecursion,
      } as any,
    );

    const res = await sparqlConstruct(constructQuery);
    expect(res.ok).toBe(true);

    const ntriples = await res.text();
    console.log("CONSTRUCT N-Triples response length:", ntriples.length);
    console.log("CONSTRUCT N-Triples:\n", ntriples.slice(0, 2000));

    const reader = new N3.Parser();
    const quads = reader.parse(ntriples);
    console.log("Parsed quads from CONSTRUCT:", quads.length);
    for (const q of quads.slice(0, 20)) {
      console.log(`  ${q.subject.value}  ${q.predicate.value}  ${q.object.value}`);
    }
    expect(quads.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Step 5: constructFetch (oxigraph CRUD function)
// ---------------------------------------------------------------------------
describe("Step 5: constructFetch via oxigraphCrudOptions", () => {
  it("should return a populated dataset for Wurzelwerk", async () => {
    const gardenSchema = bringDefinitionToTop(schema, "Garden");
    const constructQuery = makeSPARQLConstructQuery(
      TEST_ENTITY_IRI,
      `${BASE_IRI}Garden`,
      gardenSchema as any,
      {
        defaultPrefix: BASE_IRI,
        queryBuildOptions: { prefixes: { "": BASE_IRI } },
        maxRecursion: walkerOptions.maxRecursion,
      } as any,
    );

    const ds = await crudFunctions.constructFetch(constructQuery);
    console.log("constructFetch dataset size:", ds.size);

    let count = 0;
    for (const quad of ds) {
      if (count < 30) {
        console.log(`  [dataset] ${quad.subject.value}  ${quad.predicate.value}  ${quad.object.value}`);
      }
      count++;
    }
    console.log(`Total quads in dataset: ${count}`);
    expect(ds.size).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Step 6: Graph extraction (traverseGraphExtractBySchema)
// ---------------------------------------------------------------------------
describe("Step 6: traverseGraphExtractBySchema", () => {
  it("should extract a non-empty document from the dataset", async () => {
    const gardenSchema = bringDefinitionToTop(schema, "Garden");
    const constructQuery = makeSPARQLConstructQuery(
      TEST_ENTITY_IRI,
      `${BASE_IRI}Garden`,
      gardenSchema as any,
      {
        defaultPrefix: BASE_IRI,
        queryBuildOptions: { prefixes: { "": BASE_IRI } },
        maxRecursion: walkerOptions.maxRecursion,
      } as any,
    );

    const ds = await crudFunctions.constructFetch(constructQuery);
    console.log("Dataset size before extraction:", ds.size);

    const document = traverseGraphExtractBySchema(
      BASE_IRI,
      TEST_ENTITY_IRI,
      ds,
      gardenSchema as JSONSchema7,
      walkerOptions,
    );

    console.log("Extracted document:", JSON.stringify(document, null, 2));
    const keys = Object.keys(document || {});
    console.log("Document keys:", keys);

    expect(document).toBeDefined();
    expect(document?.name || document?.["name"]).toBeTruthy();
  });

  it("should compare schema property names with actual predicate IRIs", async () => {
    const gardenSchema = bringDefinitionToTop(schema, "Garden");

    const predJson = await sparqlSelect(
      `SELECT DISTINCT ?p WHERE { <${TEST_ENTITY_IRI}> ?p ?o }`,
    );
    const predicates = (predJson.results?.bindings || []).map(
      (b: any) => b.p.value,
    );

    console.log("Predicates in the store for Wurzelwerk:");
    for (const p of predicates) {
      console.log(`  ${p}`);
    }

    console.log("\nSchema property names (expanded with baseIRI):");
    const props = Object.keys((gardenSchema as any)?.properties || {});
    for (const prop of props) {
      const expanded =
        prop.includes(":") || prop.startsWith("http")
          ? prop
          : `${BASE_IRI}${prop}`;
      const match = predicates.includes(expanded);
      console.log(`  ${prop} -> ${expanded} ${match ? "MATCH" : "NO MATCH"}`);
    }
  });
});

// ---------------------------------------------------------------------------
// Step 7: Full load() pipeline (end-to-end)
// ---------------------------------------------------------------------------
describe("Step 7: Full load() pipeline", () => {
  it("should load Wurzelwerk document end-to-end", async () => {
    const gardenSchema = bringDefinitionToTop(schema, "Garden");

    const result = await load(
      TEST_ENTITY_IRI,
      `${BASE_IRI}Garden`,
      gardenSchema as any,
      crudFunctions.constructFetch,
      {
        defaultPrefix: BASE_IRI,
        queryBuildOptions: { prefixes: { "": BASE_IRI } },
        walkerOptions,
        maxRecursion: walkerOptions.maxRecursion,
      } as any,
    );

    console.log("load() result.document:", JSON.stringify(result.document, null, 2));
    const keys = Object.keys(result.document || {});
    console.log("Document keys:", keys);
    console.log("Document key count:", keys.length);

    expect(result.document).toBeDefined();
    expect(result.document?.name || result.document?.["name"]).toBeTruthy();
  });

  it("load() geoFeatures length matches store when garden:geoFeatures triples exist", async () => {
    const countJson = await sparqlSelect(
      `SELECT (COUNT(?o) AS ?c) WHERE { <${TEST_ENTITY_IRI}> <${BASE_IRI}geoFeatures> ?o . }`,
    );
    const raw = countJson.results?.bindings?.[0]?.c?.value;
    const storeCount = raw !== undefined ? parseInt(String(raw), 10) : 0;
    if (Number.isNaN(storeCount) || storeCount === 0) {
      return;
    }

    const gardenSchema = bringDefinitionToTop(schema, "Garden");
    const result = await load(
      TEST_ENTITY_IRI,
      `${BASE_IRI}Garden`,
      gardenSchema as any,
      crudFunctions.constructFetch,
      {
        defaultPrefix: BASE_IRI,
        queryBuildOptions: { prefixes: { "": BASE_IRI } },
        walkerOptions,
        maxRecursion: walkerOptions.maxRecursion,
      } as any,
    );

    expect(result.document?.geoFeatures?.length).toBe(storeCount);
  });
});

/**
 * Builds the Graviola SPARQL store the way the app does (GraviolaProvider →
 * SparqlStoreProvider), so integration tests exercise the same schema, IRI
 * mapping and query options as the UI.
 *
 * Runs against a live Oxigraph; set VITE_SPARQL_API_URL (the local stack is
 * http://localhost:7880/query).
 */
import { initSPARQLStore } from "@graviola/sparql-db-impl";
import { oxigraphCrudOptions } from "@graviola/remote-query-implementations";
import { createSemanticConfig, createStubSchema } from "@graviola/semantic-json-form";
import type { CrudDatastoreStore } from "@graviola/edb-state-hooks";
import type { JSONSchema7 } from "json-schema";
import { gardenConfiguration } from "../../schema/garden-schema";
import type { PergolaRegistry } from "../../schema/registry";

export const SPARQL_API_URL = process.env.VITE_SPARQL_API_URL || "http://localhost:7880/query";
export const BASE_IRI = "https://ontology.semantic-desk.top/garden#";
export const ENTITY_BASE_IRI = "https://data.semantic-desk.top/garden/";

export const createPergolaTestStore = () => {
  const config = createSemanticConfig({ baseIRI: BASE_IRI });
  const schema = gardenConfiguration.schema as JSONSchema7;
  const store = initSPARQLStore({
    defaultPrefix: config.jsonLDConfig.defaultPrefix,
    jsonldContext: config.jsonLDConfig.jsonldContext ?? {},
    typeNameToTypeIRI: config.typeNameToTypeIRI,
    queryBuildOptions: {
      ...config.queryBuildOptions,
      primaryFields: gardenConfiguration.primaryFields,
      sparqlFlavour: "oxigraph",
    },
    walkerOptions: { maxRecursion: 2, maxRecursionEachRef: 2 },
    sparqlQueryFunctions: oxigraphCrudOptions({
      endpoint: SPARQL_API_URL,
      label: "SPARQL service",
      provider: "oxigraph",
      active: true,
    }),
    schema,
    defaultLimit: 20,
    makeStubSchema: (s: JSONSchema7) =>
      createStubSchema(s, {
        entityBaseIRI: ENTITY_BASE_IRI,
        definitionToTypeIRI: (name: string) => `${BASE_IRI}${name}`,
      }),
    enableInversePropertiesFeature: true,
  });
  return store as unknown as CrudDatastoreStore<PergolaRegistry>;
};

/** Run a SELECT and return the bindings as plain `{ var: value }` rows. */
export const sparqlRows = async (query: string): Promise<Record<string, string>[]> => {
  const res = await fetch(SPARQL_API_URL, {
    method: "POST",
    headers: {
      accept: "application/sparql-results+json",
      "content-type": "application/x-www-form-urlencoded",
    },
    body: `query=${encodeURIComponent(query)}`,
  });
  if (!res.ok) throw new Error(`SPARQL ${res.status}: ${await res.text()}`);
  const json = (await res.json()) as {
    results: { bindings: Record<string, { value: string }>[] };
  };
  return json.results.bindings.map((b) =>
    Object.fromEntries(Object.entries(b).map(([k, v]) => [k, v.value])),
  );
};

export const sparqlCount = async (query: string): Promise<number> => {
  const [row] = await sparqlRows(query);
  return Number(row ? Object.values(row)[0] : 0);
};

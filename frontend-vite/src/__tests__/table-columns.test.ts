/**
 * Graviola tables (SemanticTable, rowShape "sparql-select") load a page of
 * flat rows through store.findDocumentsAsFlatResultSet. This test checks, for
 * every type that has data, that each scalar column of the first page is
 * filled wherever the entity really has that property — unsorted and sorted
 * by the label column.
 *
 * Regression for @graviola/sparql-schema 1.8.1: paged list queries left
 * *required* properties unbound outside their subquery, so every table showed
 * no names (PlantSpecies, Person, Patch, …) and no BedNote text. Fixed in
 * sparql-schema 1.8.3.
 *
 * Relation columns read the related entity's label from `<relation>_label_pri`.
 * Before sparql-schema 1.9.1 it was missing for stub schemas (`<Type>Stub`
 * references), so a variety's species or a planting's bed showed nothing.
 *
 * Runs against a live Oxigraph (VITE_SPARQL_API_URL; the local stack is
 * http://localhost:7880/query).
 */
import { describe, it, expect } from "bun:test";
import { gardenConfiguration } from "../schema/garden-schema";
import { createPergolaTestStore, sparqlRows, BASE_IRI } from "./helpers/pergolaTestStore";

type FlatRow = Record<string, { value: string } | undefined>;
type JsonSchema = { type?: string; properties?: Record<string, JsonSchema> };

const PAGE_SIZE = 25;
const definitions = (gardenConfiguration.schema as { definitions: Record<string, JsonSchema> }).definitions;
const primaryFields = gardenConfiguration.primaryFields as Record<string, { label?: string }>;
const isScalar = (s: JsonSchema) => ["string", "number", "integer", "boolean"].includes(s.type ?? "");

describe("table columns show the stored values", () => {
  const store = createPergolaTestStore() as unknown as {
    findDocumentsAsFlatResultSet: (
      typeName: string,
      query: Record<string, unknown>,
      limit: number,
    ) => Promise<{ results: { bindings: FlatRow[] } }>;
  };

  // Types without data pass trivially below; make sure the store is not empty.
  it("has rows to check (PlantSpecies)", async () => {
    const res = await store.findDocumentsAsFlatResultSet(
      "PlantSpecies",
      { pagination: { pageIndex: 0, pageSize: PAGE_SIZE } },
      PAGE_SIZE,
    );
    expect(res.results.bindings.length).toBeGreaterThan(0);
  });

  for (const [typeName, schema] of Object.entries(definitions)) {
    const label = primaryFields[typeName]?.label;
    const variants: [string, Record<string, unknown>][] = [["unsorted", {}]];
    if (label) variants.push([`sorted by ${label}`, { sorting: [{ id: `${label}_single`, desc: false }] }]);

    for (const [variant, query] of variants) {
      it(`${typeName} (${variant})`, async () => {
        const res = await store.findDocumentsAsFlatResultSet(
          typeName,
          { ...query, pagination: { pageIndex: 0, pageSize: PAGE_SIZE } },
          PAGE_SIZE,
        );
        const rows = res.results.bindings;
        const iris = rows.map((r) => r.entity?.value).filter((v): v is string => Boolean(v));
        if (iris.length === 0) return; // no data of this type

        const stored = await sparqlRows(
          `SELECT DISTINCT ?e ?p WHERE { VALUES ?e { ${iris.map((i) => `<${i}>`).join(" ")} } ?e ?p ?o FILTER(isLiteral(?o)) }`,
        );
        const has = new Set(stored.map((s) => `${s.e} ${s.p.replace(BASE_IRI, "")}`));

        const gaps: string[] = [];
        for (const [property, propertySchema] of Object.entries(schema.properties ?? {})) {
          if (property.startsWith("@") || !isScalar(propertySchema)) continue;
          const expected = iris.filter((iri) => has.has(`${iri} ${property}`)).length;
          const shown = rows.filter((r) => r[`${property}_single`]?.value !== undefined).length;
          if (shown < expected) gaps.push(`${property}${property === label ? " (label)" : ""}: ${shown}/${expected}`);
        }
        // single relations: the related entity's label (relation column chip)
        for (const [property, propertySchema] of Object.entries(schema.properties ?? {})) {
          const ref = (propertySchema as { $ref?: string }).$ref;
          const targetLabel = ref ? primaryFields[ref.split("/").pop()!]?.label : undefined;
          if (!targetLabel) continue;
          const linked = await sparqlRows(
            `SELECT DISTINCT ?e WHERE { VALUES ?e { ${iris.map((i) => `<${i}>`).join(" ")} } ?e <${BASE_IRI}${property}> ?t . ?t <${BASE_IRI}${targetLabel}> ?l }`,
          );
          const shown = rows.filter((r) => r[`${property}_label_pri`]?.value !== undefined).length;
          if (shown < linked.length) gaps.push(`${property} (relation label): ${shown}/${linked.length}`);
        }
        expect(gaps).toEqual([]);
      });
    }
  }
});

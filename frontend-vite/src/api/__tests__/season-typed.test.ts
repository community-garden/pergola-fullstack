/**
 * The season planner's read model (api/season.ts) loads through Graviola's
 * typed store API. This test checks it against the flat SPARQL queries it
 * replaced, field by field, on the live store (VITE_SPARQL_API_URL; the local
 * stack is http://localhost:7880/query).
 */
import { describe, it, expect } from "bun:test";
import { fetchPatches, fetchPersons, fetchPlantings, fetchPlants } from "../season";
import { createPergolaTestStore } from "../../__tests__/helpers/pergolaTestStore";
import {
  referenceFetchPatches,
  referenceFetchPersons,
  referenceFetchPlantings,
  referenceFetchPlants,
} from "../../__tests__/helpers/seasonSparqlReference";

const GARDEN = "https://data.semantic-desk.top/garden/Garden/Wurzelwerk";

/** Order-independent comparison; drops undefined fields like JSON does. */
const normalize = <T extends { iri: string }>(items: T[]) =>
  JSON.parse(JSON.stringify([...items].sort((a, b) => a.iri.localeCompare(b.iri)))) as T[];

const timed = async <T>(label: string, f: () => Promise<T>): Promise<T> => {
  const start = performance.now();
  const result = await f();
  console.log(`${label}: ${Math.round(performance.now() - start)} ms`);
  return result;
};

describe("season read model: typed store API matches the former SPARQL queries", () => {
  const store = createPergolaTestStore();

  it("plants (species and varieties with growing season)", async () => {
    const typed = await timed("typed fetchPlants", () => fetchPlants(store));
    const reference = await timed("sparql fetchPlants", () => referenceFetchPlants());
    expect(typed.length).toBeGreaterThan(0);
    expect(normalize(typed)).toEqual(normalize(reference));
  });

  it("persons, sorted by name", async () => {
    const typed = await fetchPersons(store);
    const reference = await referenceFetchPersons();
    expect(typed).toEqual(reference);
  });

  it("beds of the garden incl. beds without geometry", async () => {
    const typed = await timed("typed fetchPatches", () => fetchPatches(store, GARDEN));
    const reference = await timed("sparql fetchPatches", () => referenceFetchPatches(GARDEN));
    const withSortedPersons = (patches: typeof typed) =>
      patches.map((p) => ({
        ...p,
        responsiblePersons: [...p.responsiblePersons].sort((a, b) => a.iri.localeCompare(b.iri)),
      }));
    expect(typed.length).toBeGreaterThan(0);
    expect(normalize(withSortedPersons(typed))).toEqual(normalize(withSortedPersons(reference)));
  });

  it("plantings", async () => {
    const typed = await timed("typed fetchPlantings", () => fetchPlantings(store));
    const reference = await timed("sparql fetchPlantings", () => referenceFetchPlantings());
    expect(typed.length).toBeGreaterThan(0);
    expect(normalize(typed)).toEqual(normalize(reference));
  });
});

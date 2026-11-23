/**
 * Garden events through the real Graviola store (live Oxigraph; the local
 * stack is http://localhost:7880/query): saving, reading by garden, the iCal
 * bookkeeping (CREATED / LAST-MODIFIED / SEQUENCE), copying and removing.
 *
 * Only touches events it creates itself (IRIs `GardenEvent/test-events-<run>-…`)
 * and removes them again; the garden's own triples must stay as they were.
 */
import { describe, it, expect, afterAll } from "bun:test";
import { createPergolaTestStore, sparqlRows, BASE_IRI, ENTITY_BASE_IRI } from "./helpers/pergolaTestStore";
import { duplicatedEventDoc, fetchEvents, newEventDoc, stampSavedEvent } from "../api/events";

const GARDEN = `${ENTITY_BASE_IRI}Garden/Wurzelwerk`;
const OTHER_GARDEN = `${ENTITY_BASE_IRI}Garden/test-events-other-garden`;
const run = Date.now();
const eventIri = (n: string) => `${ENTITY_BASE_IRI}GardenEvent/test-events-${run}-${n}`;

const A = eventIri("a"); // in the garden, timed
const B = eventIri("b"); // in another garden
const C = eventIri("c"); // saved without a garden (e.g. created through another dialog)
const D = eventIri("d"); // a copy of A
const ALL = [A, B, C, D];

const store = createPergolaTestStore();
const triplesOf = (iri: string) => sparqlRows(`SELECT ?p ?o WHERE { <${iri}> ?p ?o } ORDER BY ?p ?o`);
const names = async (gardenIri: string) => (await fetchEvents(store, gardenIri)).map((e) => e.iri);
const stored = (iri: string) => store.filterOne("GardenEvent", iri, { include: { garden: { maxRecursion: 0 } } } as never) as Promise<
  Record<string, any> | null
>;

describe("garden events in the store", () => {
  const gardenBefore = triplesOf(GARDEN);

  afterAll(async () => {
    // safety net if a test failed halfway
    for (const iri of ALL) await store.remove("GardenEvent", iri).catch(() => undefined);
  });

  it("an event comes back for its own garden only, with date and time as saved", async () => {
    await store.upsert(
      "GardenEvent",
      A,
      {
        ...newEventDoc(A, GARDEN, "2027-05-15"),
        name: "Test: Gartenfest",
        startsAt: "18:00:00",
        endsAt: "20:30:00",
        place: "Beet 5",
        eventCategory: "celebration",
        url: "https://example.org/fest",
      } as never,
    );
    await store.upsert("GardenEvent", B, { ...newEventDoc(B, OTHER_GARDEN, "2027-06-01"), name: "Test: anderer Garten" } as never);

    const mine = await fetchEvents(store, GARDEN);
    const a = mine.find((e) => e.iri === A);
    expect(a).toMatchObject({
      name: "Test: Gartenfest",
      startsOn: "2027-05-15",
      startsAt: "18:00:00",
      endsAt: "20:30:00",
      timeZone: "Europe/Berlin",
      eventStatus: "confirmed",
      place: "Beet 5",
      eventCategory: "celebration",
      url: "https://example.org/fest",
    });
    expect(mine.map((e) => e.iri)).not.toContain(B);
    expect(await names(OTHER_GARDEN)).toEqual([B]);
  });

  it("stores dates and times as plain text values, the way iCal needs them", async () => {
    const rows = await sparqlRows(
      `SELECT ?p ?o WHERE { <${A}> ?p ?o FILTER(?p IN (<${BASE_IRI}startsOn>, <${BASE_IRI}startsAt>, <${BASE_IRI}endsAt>)) }`,
    );
    const byProperty = Object.fromEntries(rows.map((r) => [r.p.replace(BASE_IRI, ""), r.o]));
    expect(byProperty).toEqual({ startsOn: "2027-05-15", startsAt: "18:00:00", endsAt: "20:30:00" });
  });

  it("the stamp sets creation, change time and revision, and counts up on every save", async () => {
    await stampSavedEvent(store, A, GARDEN, "2027-01-01T10:00:00.000Z");
    const first = await stored(A);
    expect(first).toMatchObject({
      createdAt: "2027-01-01T10:00:00.000Z",
      modifiedAt: "2027-01-01T10:00:00.000Z",
      sequence: 0,
      timeZone: "Europe/Berlin",
    });
    expect(first?.garden?.["@id"]).toBe(GARDEN);

    await stampSavedEvent(store, A, GARDEN, "2027-01-02T08:30:00.000Z");
    const second = await stored(A);
    expect(second).toMatchObject({
      createdAt: "2027-01-01T10:00:00.000Z",
      modifiedAt: "2027-01-02T08:30:00.000Z",
      sequence: 1,
    });
    // everything the form entered is still there
    expect(second).toMatchObject({ name: "Test: Gartenfest", startsOn: "2027-05-15", startsAt: "18:00:00", place: "Beet 5" });
  });

  it("the stamp puts an event without a garden into the current garden", async () => {
    await store.upsert(
      "GardenEvent",
      C,
      { "@id": C, "@type": `${BASE_IRI}GardenEvent`, name: "Test: ohne Garten", startsOn: "2027-07-01" } as never,
    );
    expect(await names(GARDEN)).not.toContain(C);
    await stampSavedEvent(store, C, GARDEN, "2027-01-03T09:00:00.000Z");
    expect(await names(GARDEN)).toContain(C);
    expect(await stored(C)).toMatchObject({ sequence: 0, timeZone: "Europe/Berlin" });
  });

  it("a copy is a new event: new UID, confirmed, no creation time or revision", async () => {
    const original = (await store.loadOne("GardenEvent", A)) as Record<string, unknown>;
    const copy = duplicatedEventDoc(original, D, GARDEN);
    expect(copy).not.toHaveProperty("createdAt");
    expect(copy).not.toHaveProperty("sequence");
    await store.upsert("GardenEvent", D, copy as never);

    const d = await stored(D);
    expect(d).toMatchObject({ name: "Test: Gartenfest", startsOn: "2027-05-15", startsAt: "18:00:00", eventStatus: "confirmed" });
    expect(d?.createdAt).toBeUndefined();
    expect(await names(GARDEN)).toEqual(expect.arrayContaining([A, D]));
    // the original is untouched
    expect(await stored(A)).toMatchObject({ sequence: 1 });
  });

  it("removing the events leaves nothing behind and the garden as it was", async () => {
    for (const iri of ALL) await store.remove("GardenEvent", iri);
    for (const iri of ALL) expect(await triplesOf(iri)).toEqual([]);
    expect(await names(GARDEN)).not.toEqual(expect.arrayContaining([A]));
    expect(await triplesOf(GARDEN)).toEqual(await gardenBefore);
  });
});

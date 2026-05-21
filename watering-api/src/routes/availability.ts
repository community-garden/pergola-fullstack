import { Hono } from "hono";
import { store } from "../store";
import {
  WateringAvailabilityInputSchema,
  type WateringAvailability,
  DATA_BASE,
} from "../schema/watering-availability";
import { personIRI, type AnonymousPerson } from "../schema/anonymous-person";

const app = new Hono();

function availabilityIRI(personId: string, gardenIri: string): string {
  const gardenSlug = gardenIri.split("/").pop() ?? "unknown";
  return `${DATA_BASE}WateringAvailability/${gardenSlug}-${personId}`;
}

// POST /api/watering/availability
app.post("/", async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  const parsed = WateringAvailabilityInputSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }

  const { gardenIri, personId, nickname, maximumTasksPerMonth, availableDates } = parsed.data;
  const gardenSlug = gardenIri.split("/").pop() ?? "unknown";

  // 1. Upsert AnonymousPerson — proper JSON-LD entity with @id and @type
  const pIRI = personIRI(personId);
  const person: Omit<AnonymousPerson, "@id" | "@type"> = {
    ...(nickname ? { name: nickname } : {}),
  };
  await store.upsertDocument("AnonymousPerson", pIRI, person);

  // 2. Upsert WateringAvailability — references person and garden via @id
  const availIRI = availabilityIRI(personId, gardenIri);
  const label = `${nickname ?? personId.slice(0, 8)} @ ${gardenSlug}`;

  const doc: Omit<WateringAvailability, "@id" | "@type"> = {
    name: label,
    person: { "@id": pIRI },
    garden: { "@id": gardenIri },
    maximumTasksPerMonth,
    availableDates,
    submittedAt: new Date().toISOString(),
  };

  await store.upsertDocument("WateringAvailability", availIRI, doc);

  return c.json({ "@id": availIRI, ...doc }, 201);
});

// GET /api/watering/availability?gardenIri=...
app.get("/", async (c) => {
  const gardenIri = c.req.query("gardenIri");
  if (!gardenIri) {
    return c.json({ error: "gardenIri query param required" }, 400);
  }

  const gardenSlug = gardenIri.split("/").pop() ?? "";

  // listDocuments requires entities with a name/title/description field — now satisfied.
  // Filter by IRI pattern: all availability IRIs for a garden contain "/{gardenSlug}-".
  const all = await store.listDocuments("WateringAvailability", 500);
  const slugPattern = `/${gardenSlug}-`;
  const matchingIRIs = (all as Array<{ "@id": string }>)
    .map((e) => e["@id"])
    .filter((id) => id.includes(slugPattern));

  // Load full documents (with nested person reference) for each matching IRI
  const docs = await Promise.all(
    matchingIRIs.map((iri) => store.loadDocument("WateringAvailability", iri))
  );

  return c.json(docs.filter(Boolean));
});

// DELETE /api/watering/availability/:id
// :id is the slug portion of the IRI, e.g. "Wurzelwerk-some-uuid"
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const entityIRI = `${DATA_BASE}WateringAvailability/${id}`;

  await store.removeDocument("WateringAvailability", entityIRI);

  return c.json({ deleted: entityIRI });
});

export default app;

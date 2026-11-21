import { Hono } from "hono";
import { store, loadExisting, availabilitiesOf, removeDocument } from "../store";
import {
  WateringAvailabilityInputSchema,
  RemoveAvailabilityDateSchema,
  type WateringAvailability,
  DATA_BASE,
} from "../schema/watering-availability";
import { personIRI, type AnonymousPerson } from "../schema/anonymous-person";

const app = new Hono();

function availabilityIRI(personId: string, gardenIri: string, targetMonth: string): string {
  const gardenSlug = (gardenIri.split("/").pop() ?? "unknown").toLowerCase();
  return `${DATA_BASE}WateringAvailability/${gardenSlug}-${personId}-${targetMonth}`;
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

  const { gardenIri, personId, nickname, maximumTasksPerMonth, availableDates, targetMonth } =
    parsed.data;
  const gardenSlug = gardenIri.split("/").pop() ?? "unknown";

  // 1. Upsert AnonymousPerson — proper JSON-LD entity with @id and @type
  const pIRI = personIRI(personId);
  const person: Omit<AnonymousPerson, "@id" | "@type"> = {
    ...(nickname ? { name: nickname } : {}),
  };
  await store.upsert("AnonymousPerson", pIRI, person as AnonymousPerson);

  // 2. Upsert WateringAvailability — month-scoped IRI prevents cross-month accumulation
  const availIRI = availabilityIRI(personId, gardenIri, targetMonth);
  const label = `${nickname ?? personId.slice(0, 8)} @ ${gardenSlug}`;

  const doc: Omit<WateringAvailability, "@id" | "@type"> = {
    name: label,
    person: { "@id": pIRI },
    garden: { "@id": gardenIri },
    maximumTasksPerMonth,
    availableDates,
    submittedAt: new Date().toISOString(),
    targetMonth,
  };

  // An upsert replaces the whole document, arrays included (Graviola ≥ 2026-11).
  await store.upsert("WateringAvailability", availIRI, doc as WateringAvailability);

  return c.json({ "@id": availIRI, ...doc }, 201);
});

// GET /api/watering/availability?gardenIri=...&month=YYYY-MM&personId=UUID (month + personId optional)
// When personId is provided, returns the single entry for that person directly (204 when not found).
app.get("/", async (c) => {
  const gardenIri = c.req.query("gardenIri");
  if (!gardenIri) {
    return c.json({ error: "gardenIri query param required" }, 400);
  }

  const month = c.req.query("month");
  const personId = c.req.query("personId");

  if (personId) {
    if (!month) return c.json({ error: "month is required when personId is provided" }, 400);
    const entryIRI = availabilityIRI(personId, gardenIri, month);
    const entry = await loadExisting("WateringAvailability", entryIRI, "targetMonth");
    return entry ? c.json(entry) : c.json(null, 404);
  }

  return c.json(await availabilitiesOf(gardenIri, month));
});

// DELETE /api/watering/availability/date
// Body: { gardenIri, personIri, targetMonth, date }
app.delete("/date", async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  const parsed = RemoveAvailabilityDateSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }

  const { gardenIri, personIri, targetMonth, date } = parsed.data;
  const personId = personIri.split("/").pop();
  if (!personId) {
    return c.json({ error: "Invalid personIri" }, 400);
  }

  const availIRI = availabilityIRI(personId, gardenIri, targetMonth);
  const existing = await loadExisting("WateringAvailability", availIRI, "targetMonth");
  if (!existing) {
    return c.json({ error: "Availability entry not found" }, 404);
  }

  const availableDates = (existing.availableDates ?? []).filter((d) => d !== date);
  if (availableDates.length === (existing.availableDates ?? []).length) {
    return c.json({ error: "Date not found in availability" }, 404);
  }

  if (availableDates.length === 0) {
    await removeDocument("WateringAvailability", availIRI);
    return c.json({ deleted: availIRI });
  }

  const doc: Omit<WateringAvailability, "@id" | "@type"> = {
    name: existing.name,
    person: existing.person,
    garden: existing.garden,
    maximumTasksPerMonth: existing.maximumTasksPerMonth,
    availableDates,
    submittedAt: existing.submittedAt,
    targetMonth: existing.targetMonth,
  };

  await store.upsert("WateringAvailability", availIRI, doc as WateringAvailability);

  return c.json({ "@id": availIRI, ...doc });
});

// DELETE /api/watering/availability/:id
// :id is the slug portion of the IRI, e.g. "Wurzelwerk-some-uuid-2026-06"
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const entityIRI = `${DATA_BASE}WateringAvailability/${id}`;

  await removeDocument("WateringAvailability", entityIRI);

  return c.json({ deleted: entityIRI });
});

export default app;

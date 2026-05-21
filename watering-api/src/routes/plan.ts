import { Hono } from "hono";
import { store } from "../store";
import { CalculatePlanInputSchema, type WateringPlan } from "../schema/watering-plan";
import { type WateringAvailability, DATA_BASE } from "../schema/watering-availability";
import { planAssignments } from "@pergola/letitrain";

// Local structural types matching @pergola/letitrain's Person and Task interfaces
interface Person { id: string; maximum_tasks: number }
interface Task<D> { date: D; target_count: number; available: Person[]; assigned: Person[] }

const app = new Hono();

function planIRI(gardenIri: string): string {
  const gardenSlug = gardenIri.split("/").pop() ?? "unknown";
  return `${DATA_BASE}WateringPlan/${gardenSlug}-current`;
}

// GET /api/watering/plan?gardenIri=...
app.get("/", async (c) => {
  const gardenIri = c.req.query("gardenIri");
  if (!gardenIri) {
    return c.json({ error: "gardenIri query param required" }, 400);
  }

  const entityIRI = planIRI(gardenIri);
  const plan = await store.loadDocument("WateringPlan", entityIRI);

  if (!plan) {
    return c.json({ error: "No plan found for this garden" }, 404);
  }

  return c.json(plan);
});

// POST /api/watering/plan/calculate
app.post("/calculate", async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  const parsed = CalculatePlanInputSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }

  const { gardenIri, targetPersonsPerTask } = parsed.data;
  const gardenSlug = gardenIri.split("/").pop() ?? "";

  // Load all availability entries for this garden using the same IRI-pattern filter
  const all = await store.listDocuments("WateringAvailability", 500);
  const slugPattern = `/${gardenSlug}-`;
  const matchingIRIs = (all as Array<{ "@id": string }>)
    .map((e) => e["@id"])
    .filter((id) => id.includes(slugPattern));

  const rawEntries = await Promise.all(
    matchingIRIs.map((iri) => store.loadDocument("WateringAvailability", iri))
  );
  const entries = rawEntries.filter(Boolean) as WateringAvailability[];

  if (entries.length === 0) {
    return c.json({ error: "No availability entries found for this garden" }, 422);
  }

  // Use person["@id"] as the stable person identifier for the algorithm
  const persons: Person[] = entries.map((e) => ({
    id: e.person["@id"],
    maximum_tasks: e.maximumTasksPerMonth,
  }));

  const allDates = [...new Set(entries.flatMap((e) => e.availableDates))].sort();

  const tasks: Task<string>[] = allDates.map((date) => ({
    date,
    target_count: targetPersonsPerTask,
    available: entries
      .filter((e) => e.availableDates.includes(date))
      .map((e) => ({ id: e.person["@id"], maximum_tasks: e.maximumTasksPerMonth })),
    assigned: [],
  }));

  const assignedTasks = planAssignments(tasks);

  // Store person IRIs in assignments — callers can resolve them to nicknames
  const assignments = assignedTasks.flatMap((t) =>
    t.assigned.map((p) => ({ date: t.date, personIri: p.id }))
  );

  const now = new Date().toISOString();
  const validFrom = allDates[0] ?? now.slice(0, 10);
  const validUntil = allDates[allDates.length - 1] ?? validFrom;

  const plan: Omit<WateringPlan, "@id" | "@type"> = {
    gardenIri,
    calculatedAt: now,
    validFrom,
    validUntil,
    assignments,
  };

  const entityIRI = planIRI(gardenIri);
  // Remove before upsert: Graviola appends array triples rather than replacing,
  // so a stale plan would accumulate duplicate assignment entries.
  await store.removeDocument("WateringPlan", entityIRI);
  await store.upsertDocument("WateringPlan", entityIRI, plan);

  return c.json({ "@id": entityIRI, ...plan });
});

export default app;

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
  const plan = await store.loadOne("WateringPlan", entityIRI);

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

  // Load all availability entries for this garden
  const all = await store.list("WateringAvailability");
  const entries = (all as WateringAvailability[]).filter(
    (doc) => doc.gardenIri === gardenIri
  );

  if (entries.length === 0) {
    return c.json({ error: "No availability entries found for this garden" }, 422);
  }

  // Build Person[] for LetItRain
  const persons: Person[] = entries.map((e) => ({
    id: e.personId,
    maximum_tasks: e.maximumTasksPerMonth,
  }));

  // Collect all unique dates
  const allDates = [...new Set(entries.flatMap((e) => e.availableDates))].sort();

  // Build Task[] — one task per unique date
  const tasks: Task<string>[] = allDates.map((date) => ({
    date,
    target_count: targetPersonsPerTask,
    available: entries
      .filter((e) => e.availableDates.includes(date))
      .map((e) => ({ id: e.personId, maximum_tasks: e.maximumTasksPerMonth })),
    assigned: [],
  }));

  // Run LetItRain
  const assignedTasks = planAssignments(tasks);

  // Flatten to assignment list
  const assignments = assignedTasks.flatMap((t) =>
    t.assigned.map((p) => ({ date: t.date, personId: p.id }))
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
  await store.upsert("WateringPlan", entityIRI, plan);

  return c.json({ "@id": entityIRI, ...plan });
});

export default app;

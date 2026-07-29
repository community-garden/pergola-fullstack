import { Hono } from "hono";
import { z } from "zod";
import { store } from "../store";
import { CalculatePlanInputSchema, RemovePlanAssignmentSchema, type WateringPlan } from "../schema/watering-plan";
import { type WateringAvailability, DATA_BASE } from "../schema/watering-availability";
import { planAssignments } from "@pergola/letitrain";

// Local structural types matching @pergola/letitrain's Person and Task interfaces
interface Person { id: string; maximum_tasks: number }
interface Task<D> { date: D; target_count: number; available: Person[]; assigned: Person[] }

const app = new Hono();

function currentMonthYYYYMM(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function nextMonthYYYYMM(): string {
  const d = new Date();
  d.setMonth(d.getMonth() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

function planIRI(gardenIri: string, targetMonth: string): string {
  const gardenSlug = (gardenIri.split("/").pop() ?? "unknown").toLowerCase();
  return `${DATA_BASE}WateringPlan/${gardenSlug}-${targetMonth}`;
}

// GET /api/watering/plan?gardenIri=...&month=YYYY-MM (month defaults to current month)
app.get("/", async (c) => {
  const gardenIri = c.req.query("gardenIri");
  if (!gardenIri) {
    return c.json({ error: "gardenIri query param required" }, 400);
  }

  const month = c.req.query("month") ?? currentMonthYYYYMM();
  const entityIRI = planIRI(gardenIri, month);
  const plan = await store.loadDocument("WateringPlan", entityIRI);

  if (!plan) {
    return c.json({ error: "No plan found for this garden and month" }, 404);
  }

  // Resolve person names for all assigned persons
  const assignments = (plan as WateringPlan).assignments ?? [];
  const uniqueIris = [...new Set(assignments.map((a) => a.personIri))];
  const personNames: Record<string, string> = {};
  await Promise.all(
    uniqueIris.map(async (iri) => {
      const person = await store.loadDocument("AnonymousPerson", iri) as { name?: string } | null;
      if (person?.name) personNames[iri] = person.name;
    })
  );

  if (!isPlanCalculated(plan as WateringPlan)) {
    return c.json({ error: "No plan found for this garden and month" }, 404);
  }

  return c.json({ ...plan, personNames });
});

function isPlanCalculated(plan: WateringPlan | null | undefined): boolean {
  return !!plan?.calculatedAt;
}

// DELETE /api/watering/plan/:id/assignments
// Body: { date: "YYYY-MM-DD", personIri: string }
app.delete("/:id/assignments", async (c) => {
  const id = c.req.param("id");
  const entityIRI = `${DATA_BASE}WateringPlan/${id}`;

  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON" }, 400);
  }

  const parsed = RemovePlanAssignmentSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }

  const plan = await store.loadDocument("WateringPlan", entityIRI) as WateringPlan | null;
  if (!plan) {
    return c.json({ error: "Plan not found" }, 404);
  }

  const { date, personIri } = parsed.data;
  const assignments = (plan.assignments ?? []).filter(
    (a) => !(a.date === date && a.personIri === personIri)
  );

  if (assignments.length === (plan.assignments ?? []).length) {
    return c.json({ error: "Assignment not found" }, 404);
  }

  const updated: Omit<WateringPlan, "@id" | "@type"> = {
    gardenIri: plan.gardenIri,
    targetMonth: plan.targetMonth,
    calculatedAt: plan.calculatedAt,
    validFrom: plan.validFrom,
    validUntil: plan.validUntil,
    assignments,
  };

  await store.removeDocument("WateringPlan", entityIRI);
  await store.upsertDocument("WateringPlan", entityIRI, updated);

  return c.json({ "@id": entityIRI, ...updated });
});

// POST /api/watering/plan/restore
// Writes an explicit assignment list without recalculating. Use to restore or manually adjust a plan.
const RestorePlanSchema = z.object({
  gardenIri: z.string().url(),
  targetMonth: z.string().regex(/^\d{4}-\d{2}$/),
  assignments: z.array(z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    personIri: z.string().url(),
  })),
  calculatedAt: z.string().optional(),
});

app.post("/restore", async (c) => {
  let body: unknown;
  try { body = await c.req.json(); } catch { return c.json({ error: "Invalid JSON" }, 400); }

  const parsed = RestorePlanSchema.safeParse(body);
  if (!parsed.success) return c.json({ error: parsed.error.flatten() }, 400);

  const { gardenIri, targetMonth, assignments, calculatedAt } = parsed.data;
  const dates = assignments.map((a) => a.date).sort();

  const plan: Omit<WateringPlan, "@id" | "@type"> = {
    gardenIri,
    targetMonth,
    calculatedAt: calculatedAt ?? new Date().toISOString(),
    validFrom: dates[0] ?? `${targetMonth}-01`,
    validUntil: dates[dates.length - 1] ?? `${targetMonth}-31`,
    assignments,
  };

  const entityIRI = planIRI(gardenIri, targetMonth);
  await store.removeDocument("WateringPlan", entityIRI);
  await store.upsertDocument("WateringPlan", entityIRI, plan);

  return c.json({ "@id": entityIRI, ...plan });
});

// DELETE /api/watering/plan/:id
// :id is the slug portion of the IRI, e.g. "wurzelwerk-2026-07"
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const entityIRI = `${DATA_BASE}WateringPlan/${id}`;

  await store.removeDocument("WateringPlan", entityIRI);

  return c.json({ deleted: entityIRI });
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

  const { gardenIri, targetPersonsPerTask, targetMonth: rawTargetMonth } = parsed.data;
  const targetMonth = rawTargetMonth ?? nextMonthYYYYMM();
  const gardenSlug = (gardenIri.split("/").pop() ?? "").toLowerCase();

  // Load availability entries scoped to this garden AND target month
  const all = await store.listDocuments("WateringAvailability", 500);
  const slugPattern = `/${gardenSlug}-`;
  const monthSuffix = `-${targetMonth}`;
  const matchingIRIs = (all as Array<{ "@id": string }>)
    .map((e) => e["@id"])
    .filter((id) => id.includes(slugPattern) && id.endsWith(monthSuffix));

  const rawEntries = await Promise.all(
    matchingIRIs.map((iri) => store.loadDocument("WateringAvailability", iri))
  );
  const entries = rawEntries.filter(Boolean) as WateringAvailability[];

  if (entries.length === 0) {
    return c.json({ error: "No availability entries found for this garden and month" }, 422);
  }

  const persons: Person[] = entries.map((e) => ({
    id: e.person["@id"],
    maximum_tasks: e.maximumTasksPerMonth,
  }));

  // Only use dates that fall within the target month
  const allDates = [...new Set(entries.flatMap((e) => e.availableDates))]
    .filter((d) => d.startsWith(targetMonth))
    .sort();

  if (allDates.length === 0) {
    return c.json({ error: "No available dates within the target month" }, 422);
  }

  const tasks: Task<string>[] = allDates.map((date) => ({
    date,
    target_count: targetPersonsPerTask,
    available: entries
      .filter((e) => e.availableDates.includes(date))
      .map((e) => ({ id: e.person["@id"], maximum_tasks: e.maximumTasksPerMonth })),
    assigned: [],
  }));

  const assignedTasks = planAssignments(tasks);

  const assignments = assignedTasks.flatMap((t) =>
    t.assigned.map((p) => ({ date: t.date, personIri: p.id }))
  );

  const now = new Date().toISOString();
  const validFrom = allDates[0];
  const validUntil = allDates[allDates.length - 1];

  const plan: Omit<WateringPlan, "@id" | "@type"> = {
    gardenIri,
    targetMonth,
    calculatedAt: now,
    validFrom,
    validUntil,
    assignments,
  };

  const entityIRI = planIRI(gardenIri, targetMonth);
  // Remove before upsert: Graviola appends array triples rather than replacing
  await store.removeDocument("WateringPlan", entityIRI);
  await store.upsertDocument("WateringPlan", entityIRI, plan);

  return c.json({ "@id": entityIRI, ...plan });
});

export default app;

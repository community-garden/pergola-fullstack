import { Hono } from "hono";
import { z } from "zod";
import { store } from "../store";
import {
  WateringAvailabilityInputSchema,
  type WateringAvailability,
  DATA_BASE,
} from "../schema/watering-availability";

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

  const { gardenIri, personId, maximumTasksPerMonth, availableDates } = parsed.data;
  const entityIRI = availabilityIRI(personId, gardenIri);

  const doc: Omit<WateringAvailability, "@id" | "@type"> = {
    gardenIri,
    personId,
    maximumTasksPerMonth,
    availableDates,
    submittedAt: new Date().toISOString(),
  };

  await store.upsert("WateringAvailability", entityIRI, doc);

  return c.json({ "@id": entityIRI, ...doc }, 201);
});

// GET /api/watering/availability?gardenIri=...
app.get("/", async (c) => {
  const gardenIri = c.req.query("gardenIri");
  if (!gardenIri) {
    return c.json({ error: "gardenIri query param required" }, 400);
  }

  const results = await store.list("WateringAvailability");
  const filtered = (results as WateringAvailability[]).filter(
    (doc) => doc.gardenIri === gardenIri
  );

  return c.json(filtered);
});

// DELETE /api/watering/availability/:id
app.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const entityIRI = `${DATA_BASE}WateringAvailability/${id}`;

  await store.remove("WateringAvailability", entityIRI);

  return c.json({ deleted: entityIRI });
});

export default app;

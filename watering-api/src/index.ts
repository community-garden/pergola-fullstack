import { Hono } from "hono";
import { cors } from "hono/cors";
import availabilityRoutes from "./routes/availability";
import planRoutes from "./routes/plan";

const app = new Hono();

app.use("*", cors());

app.get("/api/watering/health", (c) => c.json({ status: "ok" }));
app.route("/api/watering/availability", availabilityRoutes);
app.route("/api/watering/plan", planRoutes);

const port = parseInt(process.env.PORT ?? "3000");
console.log(`watering-api listening on :${port}`);

export default { port, fetch: app.fetch };

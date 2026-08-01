import { z } from "zod";
import type { JSONSchema7 } from "json-schema";

export const ONTOLOGY = "https://ontology.semantic-desk.top/garden#";
export const DATA_BASE = "https://data.semantic-desk.top/garden/";

export const WateringAvailabilityTypeIRI = `${ONTOLOGY}WateringAvailability`;

// ── Input schema (what the frontend sends) ────────────────────────────────────
// personId is the raw device UUID; the server converts it to an AnonymousPerson IRI.
// gardenIri is the full IRI of the Garden entity.
export const WateringAvailabilityInputSchema = z.object({
  gardenIri: z.string().url(),
  personId: z.string().min(1),
  nickname: z.string().optional(),
  maximumTasksPerMonth: z.number().int().min(1).max(30),
  availableDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).min(1),
  targetMonth: z.string().regex(/^\d{4}-\d{2}$/),
});

export type WateringAvailabilityInput = z.infer<typeof WateringAvailabilityInputSchema>;

export const RemoveAvailabilityDateSchema = z.object({
  gardenIri: z.string().url(),
  personIri: z.string().url(),
  targetMonth: z.string().regex(/^\d{4}-\d{2}$/),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type RemoveAvailabilityDateInput = z.infer<typeof RemoveAvailabilityDateSchema>;

// ── TypeScript shape of a stored WateringAvailability document ────────────────
// Uses proper JSON-LD: person and garden are @id references, not plain strings.
export interface WateringAvailability {
  "@id": string;
  "@type": string;
  /** Human-readable label: "{nickname} @ {gardenSlug}" — required by Graviola listDocuments */
  name: string;
  /** Reference to the AnonymousPerson entity */
  person: { "@id": string; name?: string };
  /** Reference to the Garden entity */
  garden: { "@id": string };
  maximumTasksPerMonth: number;
  availableDates: string[];
  submittedAt: string;
  targetMonth: string;
}

// ── JSON Schema for Graviola store ────────────────────────────────────────────
// @type MUST be a const set to the full type IRI — this is the Graviola convention
// that allows the store to map between type names and RDF class IRIs.
// Inline AnonymousPerson ref rather than $ref to keep the schema self-contained.
export const WateringAvailabilityJsonSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    WateringAvailability: {
      type: "object",
      title: "Watering Availability",
      properties: {
        "@id": { type: "string" },
        "@type": { type: "string", const: WateringAvailabilityTypeIRI },
        name: { type: "string", title: "Label" },
        person: {
          type: "object",
          title: "Person",
          properties: {
            "@id": { type: "string" },
            "@type": { type: "string" },
            name: { type: "string" },
          },
          required: ["@id"],
        },
        garden: {
          type: "object",
          title: "Garden",
          properties: {
            "@id": { type: "string" },
          },
          required: ["@id"],
        },
        maximumTasksPerMonth: { type: "integer", title: "Max tasks / month" },
        availableDates: {
          type: "array",
          title: "Available dates",
          items: { type: "string" },
        },
        submittedAt: { type: "string", title: "Submitted at" },
        targetMonth: { type: "string", title: "Target month (YYYY-MM)" },
      },
      required: ["@id", "@type", "name", "person", "garden", "maximumTasksPerMonth", "availableDates", "targetMonth"],
      additionalProperties: true,
    },
  },
};

import { z } from "zod";
import type { JSONSchema7 } from "json-schema";

export const ONTOLOGY = "https://ontology.semantic-desk.top/garden#";
export const DATA_BASE = "https://data.semantic-desk.top/garden/";

export const WateringAvailabilityTypeIRI = `${ONTOLOGY}WateringAvailability`;

export const WateringAvailabilityInputSchema = z.object({
  gardenIri: z.string().url(),
  personId: z.string().min(1),
  maximumTasksPerMonth: z.number().int().min(1).max(30),
  availableDates: z.array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
});

export type WateringAvailabilityInput = z.infer<typeof WateringAvailabilityInputSchema>;

export interface WateringAvailability extends WateringAvailabilityInput {
  "@id": string;
  "@type": string;
  submittedAt: string;
}

export const WateringAvailabilityJsonSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    WateringAvailability: {
      type: "object",
      properties: {
        "@id": { type: "string" },
        "@type": { type: "string", const: WateringAvailabilityTypeIRI },
        gardenIri: { type: "string" },
        personId: { type: "string" },
        maximumTasksPerMonth: { type: "integer" },
        availableDates: { type: "array", items: { type: "string" } },
        submittedAt: { type: "string" },
      },
      required: ["@id", "@type", "gardenIri", "personId", "maximumTasksPerMonth", "availableDates"],
    },
  },
};

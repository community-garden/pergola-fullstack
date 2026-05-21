import { z } from "zod";
import type { JSONSchema7 } from "json-schema";
import { ONTOLOGY } from "./watering-availability";

export const WateringPlanTypeIRI = `${ONTOLOGY}WateringPlan`;

export const CalculatePlanInputSchema = z.object({
  gardenIri: z.string().url(),
  targetPersonsPerTask: z.number().int().min(1).max(10).default(2),
});

export type CalculatePlanInput = z.infer<typeof CalculatePlanInputSchema>;

export interface WateringAssignment {
  date: string;
  personId: string;
}

export interface WateringPlan {
  "@id": string;
  "@type": string;
  gardenIri: string;
  calculatedAt: string;
  validFrom: string;
  validUntil: string;
  assignments: WateringAssignment[];
}

export const WateringPlanJsonSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    WateringPlan: {
      type: "object",
      properties: {
        "@id": { type: "string" },
        "@type": { type: "string", const: WateringPlanTypeIRI },
        gardenIri: { type: "string" },
        calculatedAt: { type: "string" },
        validFrom: { type: "string" },
        validUntil: { type: "string" },
        assignments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string" },
              personId: { type: "string" },
            },
            required: ["date", "personId"],
          },
        },
      },
      required: ["@id", "@type", "gardenIri", "calculatedAt"],
    },
  },
};

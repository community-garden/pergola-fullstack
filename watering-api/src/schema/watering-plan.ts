import { z } from "zod";
import type { JSONSchema7 } from "json-schema";
import { ONTOLOGY } from "./watering-availability";

export const WateringPlanTypeIRI = `${ONTOLOGY}WateringPlan`;

export const CalculatePlanInputSchema = z.object({
  gardenIri: z.string().url(),
  targetPersonsPerTask: z.number().int().min(1).max(10).default(2),
  targetMonth: z.string().regex(/^\d{4}-\d{2}$/).optional(),
});

export type CalculatePlanInput = z.infer<typeof CalculatePlanInputSchema>;

export interface WateringAssignment {
  date: string;
  /** Full IRI of the AnonymousPerson entity */
  personIri: string;
}

export interface WateringPlan {
  "@id": string;
  "@type": string;
  gardenIri: string;
  targetMonth: string;
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
        targetMonth: { type: "string", title: "Target month (YYYY-MM)" },
        calculatedAt: { type: "string" },
        validFrom: { type: "string" },
        validUntil: { type: "string" },
        assignments: {
          type: "array",
          items: {
            type: "object",
            properties: {
              date: { type: "string" },
              personIri: { type: "string" },
            },
            required: ["date", "personIri"],
          },
        },
      },
      required: ["@id", "@type", "gardenIri", "targetMonth", "calculatedAt"],
    },
  },
};

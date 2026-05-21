import type { JSONSchema7 } from "json-schema";
import { ONTOLOGY, DATA_BASE } from "./watering-availability";

export const AnonymousPersonTypeIRI = `${ONTOLOGY}AnonymousPerson`;

export function personIRI(uuid: string): string {
  return `${DATA_BASE}Person/${uuid}`;
}

export const AnonymousPersonJsonSchema: JSONSchema7 = {
  type: "object",
  definitions: {
    AnonymousPerson: {
      type: "object",
      properties: {
        "@id": { type: "string" },
        "@type": { type: "string", const: AnonymousPersonTypeIRI },
        name: { type: "string", title: "Nickname" },
      },
      required: ["@id", "@type"],
      additionalProperties: true,
    },
  },
};

export interface AnonymousPerson {
  "@id": string;
  "@type": string;
  name?: string;
}

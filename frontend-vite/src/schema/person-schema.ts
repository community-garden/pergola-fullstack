import { z } from "zod";
import { generateDefaultUISchema } from "@graviola/edb-ui-utils";
import { bringDefinitionToTop, JsonSchema } from "@graviola/json-schema-utils";
import { mergeSchemaDefinitions } from "./utils/mergeSchemaDefinitions";

const GARDEN_IRI = "https://ontology.semantic-desk.top/garden#";

/**
 * A gardener of the community garden. Deliberately minimal: a (nick)name and
 * a free note. No contact data — this is not a member registry.
 */
export const PersonSchema = z
  .object({
    "@id": z.string().optional(),
    "@type": z.literal(`${GARDEN_IRI}Person`),
    name: z.string().min(1).describe("Name or nickname"),
    description: z.string().optional().describe("Note, e.g. what the person takes care of"),
  })
  .loose()
  .meta({
    id: "Person",
    title: "Person",
    description: "A gardener of the community garden",
  });

const personDefinitions: NonNullable<JsonSchema["definitions"]> = {
  Person: {
    type: "object",
    title: "Person",
    description: "A gardener of the community garden",
    properties: {
      "@id": { type: "string", title: "ID" },
      "@type": { type: "string", const: `${GARDEN_IRI}Person`, title: "Type" },
      name: { type: "string", minLength: 1, title: "Name", description: "Name or nickname" },
      description: {
        type: "string",
        title: "Note",
        description: "Note, e.g. what the person takes care of",
      },
    },
    required: ["name"],
    additionalProperties: true,
  },
};

export const personSchema: JsonSchema = mergeSchemaDefinitions([
  { definitions: personDefinitions } as JsonSchema,
]);

/** Reference to a Person — always rendered as a dropdown, never via the entity finder. */
export const personRef = {
  $ref: "#/definitions/Person",
};

export const personConfiguration = {
  schema: personSchema,
  primaryFields: {
    Person: {
      label: "name",
      description: "description",
    },
  },
  typeNameLabelMap: {
    Person: "Person",
  },
  typeNameUiSchemaOptionsMap: {
    Person: {
      dropdown: true,
    },
  },
  uischemata: {
    Person: generateDefaultUISchema(
      bringDefinitionToTop(personSchema as any, "Person") as any,
      {}
    ),
  },
};

export type Person = z.infer<typeof PersonSchema>;

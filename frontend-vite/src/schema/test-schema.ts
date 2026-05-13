import { JSONSchema7 } from "json-schema";

export const schema: JSONSchema7 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    TestEntity: {
      type: "object",
      title: "Test Entity",
      properties: {
        name: {
          type: "string",
          title: "Name",
        },
        description: {
          type: "string",
          title: "Description",
        },
      },
      required: ["name"],
    },
  },
};

export const testConfiguration = {
  schema: schema,
  primaryFields: {
    TestEntity: {
      label: "name",
      description: "description",
    },
  },
  typeNameLabelMap: {
    TestEntity: "Test Entity",
  },
  typeNameUiSchemaOptionsMap: {
    TestEntity: {
      dropdown: true,
    },
  },
  uischemata: {},
};


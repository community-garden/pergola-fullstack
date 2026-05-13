import { and, isObjectArray, JsonFormsRendererRegistryEntry, rankWith, scopeEndsWith } from "@jsonforms/core";
import { materialArrayChipsLayoutTester } from "@graviola/edb-linked-data-renderer";
import { MaterialArrayOfLinkedItemChipsRenderer } from "@graviola/edb-linked-data-renderer";
import { inlineSemanticFormsRendererTester } from "@graviola/edb-linked-data-renderer";
import { InlineCondensedSemanticFormsRenderer } from "@graviola/edb-linked-data-renderer";
import { inlineDropdownRendererTester } from "@graviola/edb-linked-data-renderer";
import { InlineDropdownSemanticFormsRenderer } from "@graviola/edb-linked-data-renderer";
import { materialLinkedObjectControlTester } from "@graviola/edb-linked-data-renderer";
import { MaterialLinkedObjectRenderer } from "@graviola/edb-linked-data-renderer";
import { MaterialArrayOfLinkedItemRenderer } from "@graviola/edb-linked-data-renderer";
import { resolveSchema, type JsonSchema } from "@graviola/json-schema-utils";
import { type Tester, schemaMatches } from "@jsonforms/core";

export const isArrayOfLinkedItems: Tester = (schema, rootSchema, context) =>
  schemaMatches((_schema, _rootSchema) => {
    if (_schema.type === "array" && typeof _schema.items === "object") {
      console.log("schema", _schema);
      console.log("rootSchema", _rootSchema);
      const resolvedSchema = resolveSchema(
        _schema.items as JsonSchema,
        undefined,
        _rootSchema as JsonSchema,
      );
      return Boolean(resolvedSchema?.properties?.["@id"]);
    }
    return false;
  })(schema, rootSchema, context);
export const materialArrayOfLinkedItemTester = rankWith(
  5,
  and(isObjectArray, isArrayOfLinkedItems),
);


export const graviolaRenderers: JsonFormsRendererRegistryEntry[] = [
  {
    tester: materialArrayChipsLayoutTester,
    renderer: MaterialArrayOfLinkedItemChipsRenderer,
  },
  {
    tester: inlineSemanticFormsRendererTester,
    renderer: InlineCondensedSemanticFormsRenderer,
  },
  {
    tester: inlineDropdownRendererTester,
    renderer: InlineDropdownSemanticFormsRenderer,
  },
  {
    tester: materialLinkedObjectControlTester,
    renderer: MaterialLinkedObjectRenderer,
  },
  {
    tester: materialArrayOfLinkedItemTester,
    renderer: MaterialArrayOfLinkedItemRenderer,
  },
  {
    tester: rankWith(10, scopeEndsWith("@id")),
    renderer: () => null,
  },
  {
    tester: rankWith(10, scopeEndsWith("@type")),
    renderer: () => null,
  },
];
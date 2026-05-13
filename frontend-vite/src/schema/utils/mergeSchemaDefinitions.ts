import { fixAllOfSchema } from "./fixAllOfSchema";
import { JsonSchema } from "@graviola/json-schema-utils";

/**
 * Merges $defs from multiple JSON schemas into a single schema with combined definitions.
 * 
 * This utility function:
 * - Collects all $defs from the provided schemas
 * - Removes the 'id' property from each definition (to avoid conflicts)
 * - Applies fixAllOfSchema to unwrap single-entry allOf arrays with $ref
 * - Returns a complete JSON Schema 7 with all merged definitions
 * 
 * @param schemas - Array of JSON Schema 7 objects that may contain $defs
 * @returns A JSON Schema 7 with all merged definitions
 * 
 * @example
 * ```typescript
 * const schema = mergeSchemaDefinitions([
 *   gardenJsonSchema,
 *   patchSchema,
 *   geoFeatureSchema,
 *   featureTypesSchema
 * ]);
 * ```
 */
export function mergeSchemaDefinitions(schemas: JsonSchema[]): JsonSchema {
  // Merge all definitions from the provided schemas
  const allDefinitions = schemas.reduce((acc, schema) => {
    const {id, definitions, ...rest} = schema as any;
    return {
      ...acc,
      ...(schema.definitions || {}),
      ...(id ? { [id]: rest } : {}),
    };
  }, {});


  // Build the complete schema with all definitions
  // Remove 'id' property from each definition to avoid conflicts
  const definitions = Object.fromEntries(
    Object.entries(allDefinitions).map(([key, value]) => {
      // @ts-ignore - 'id' may exist on the definition object
      const { id: _, ...restVal } = value;
      return [key, restVal];
    })
  );

  // Apply fixAllOfSchema to unwrap single-entry allOf arrays with $ref (Zod workaround)
  return fixAllOfSchema({
    definitions,
    $schema: "http://json-schema.org/draft-07/schema#",
  });
}


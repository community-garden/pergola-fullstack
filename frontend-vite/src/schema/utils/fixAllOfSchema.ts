import { cloneDeepWith, isArray, isPlainObject } from "lodash-es";

/**
 * Fixes JSON Schema by unwrapping single-entry allOf arrays that contain only a $ref.
 * 
 * This is a workaround for Zod's toJSONSchema() which wraps $refs in allOf when 
 * combined with .describe(), which Graviola's relationship system doesn't support yet.
 * 
 * Transforms:
 * ```json
 * {
 *   "description": "Reference to geographic feature",
 *   "allOf": [{ "$ref": "#/definitions/GeoFeature" }]
 * }
 * ```
 * 
 * Into:
 * ```json
 * { "$ref": "#/definitions/GeoFeature" }
 * ```
 * 
 * @param schema - The JSON Schema to fix (can be any nested object)
 * @returns A deep clone with allOf arrays unwrapped
 */
export function fixAllOfSchema(schema: any): any {
  return cloneDeepWith(schema, (value) => {
    // Check if this is a plain object with an allOf array
    if (isPlainObject(value) && isArray(value.allOf) && value.allOf.length === 1) {
      const singleEntry = value.allOf[0];
      
      // If the single entry has a $ref, unwrap it
      if (isPlainObject(singleEntry) && singleEntry.$ref) {
        // Return just the $ref object (discarding description and other properties)
        return { $ref: singleEntry.$ref };
      }
    }
    
    // Return undefined to use default cloning behavior
    return undefined;
  });
}



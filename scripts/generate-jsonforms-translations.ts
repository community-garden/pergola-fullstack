/**
 * Generates JsonForms-compatible translation scaffold files from the app's JSON Schemas.
 * Uses extractTranslationKeysFromSchema + bringDefinitionToTop from @graviola/json-schema-utils.
 *
 * Run from workspace root:
 *   docker run --rm -v $(pwd):/workspace -w /workspace oven/bun:1.3.10-alpine bun scripts/generate-jsonforms-translations.ts
 *
 * Output:
 *   frontend-vite/src/i18n/de/jsonforms.json  (scaffold — fill in German values)
 *   frontend-vite/src/i18n/en/jsonforms.json  (scaffold — fill in English values)
 */
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import {
  extractTranslationKeysFromSchema,
  bringDefinitionToTop,
} from "@graviola/json-schema-utils";
import { featureTypesSchema } from "../frontend-vite/src/schema/feature-types-schema";
import { patchSchema } from "../frontend-vite/src/schema/patch-schema";
import { geoFeatureSchema } from "../frontend-vite/src/schema/geo-feature-schema";
import { schema as gardenSchema } from "../frontend-vite/src/schema/garden-schema";

// Entity types per combined schema
const FEATURE_TYPES = ["Workshop", "Shed", "BeeStand", "Path", "Seating", "FirePlace", "WaterBody"] as const;
const PATCH_TYPES = [
  "Patch",
  "PlantingPlan",
  "PlantingPlanItem",
  "PlantSpecies",
  "PlantVariety",
  "GrowingSeason",
  "Requirements",
  "PhysicalCharacteristics",
  "Timing",
] as const;
const GEO_TYPES = ["GeoFeature"] as const;
// Season planning types (resolved against the merged garden schema — they reference plants, beds and persons)
const SEASON_TYPES = ["Person", "Planting", "SeedStock"] as const;

function deepMerge(target: Record<string, any>, source: Record<string, any>): Record<string, any> {
  const result = { ...target };
  for (const [k, v] of Object.entries(source)) {
    if (v && typeof v === "object" && !Array.isArray(v) && result[k] && typeof result[k] === "object") {
      result[k] = deepMerge(result[k], v);
    } else if (!(k in result)) {
      result[k] = v;
    }
  }
  return result;
}

let merged: Record<string, any> = {};

for (const typeName of FEATURE_TYPES) {
  try {
    const top = bringDefinitionToTop(featureTypesSchema as any, typeName);
    const keys = extractTranslationKeysFromSchema(top as any);
    merged = deepMerge(merged, keys);
    console.log(`✓ ${typeName}: ${Object.keys(keys).length} top-level keys`);
  } catch (e) {
    console.error(`✗ ${typeName}:`, e);
  }
}

for (const typeName of PATCH_TYPES) {
  try {
    const top = bringDefinitionToTop(patchSchema as any, typeName);
    const keys = extractTranslationKeysFromSchema(top as any);
    merged = deepMerge(merged, keys);
    console.log(`✓ ${typeName}: ${Object.keys(keys).length} top-level keys`);
  } catch (e) {
    console.error(`✗ ${typeName}:`, e);
  }
}

for (const typeName of GEO_TYPES) {
  try {
    const top = bringDefinitionToTop(geoFeatureSchema as any, typeName);
    const keys = extractTranslationKeysFromSchema(top as any);
    merged = deepMerge(merged, keys);
    console.log(`✓ ${typeName}: ${Object.keys(keys).length} top-level keys`);
  } catch (e) {
    console.error(`✗ ${typeName}:`, e);
  }
}

for (const typeName of SEASON_TYPES) {
  try {
    const top = bringDefinitionToTop(gardenSchema as any, typeName);
    const keys = extractTranslationKeysFromSchema(top as any);
    merged = deepMerge(merged, keys);
    console.log(`✓ ${typeName}: ${Object.keys(keys).length} top-level keys`);
  } catch (e) {
    console.error(`✗ ${typeName}:`, e);
  }
}

// Sort keys alphabetically for stable output
function sortObjectKeys(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => [k, v && typeof v === "object" && !Array.isArray(v) ? sortObjectKeys(v) : v])
  );
}

const scaffold = sortObjectKeys(merged);
const outDir = join(import.meta.dir, "..", "frontend-vite", "src", "i18n");

writeFileSync(join(outDir, "de", "jsonforms.json"), JSON.stringify(scaffold, null, 2) + "\n");
writeFileSync(join(outDir, "en", "jsonforms.json"), JSON.stringify(scaffold, null, 2) + "\n");

console.log(`\nWrote scaffold to:`);
console.log(`  frontend-vite/src/i18n/de/jsonforms.json`);
console.log(`  frontend-vite/src/i18n/en/jsonforms.json`);
console.log(`\nNext: fill in translated values in both files.`);

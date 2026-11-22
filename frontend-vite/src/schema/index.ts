import { Path } from 'react-router-dom';
import { Workshop, Shed, BeeStand, Seating, FirePlace, WaterBody } from './feature-types-schema';
import { Garden } from './garden-schema';
import { GeoFeature } from './geo-feature-schema';
import { Person } from './person-schema';
import { MapOverlay } from './map-overlay-schema';
import { Planting, PlantPlacement, SeedStock } from './planting-schema';
import { GrowingSeason, Patch, PhysicalCharacteristics, PlantingPlan, PlantingPlanItem, PlantSpecies, PlantVariety, Requirements, Timing } from './patch-schema';

// JSON Schema exports
export { schema, gardenConfiguration, GardenSchema } from './garden-schema';
export {
  patchSchema,
  patchConfiguration,
  PatchSchema,
  PlantingPlanSchema,
  PlantSpeciesSchema,
  PlantVarietySchema,
  PlantingPlanItemSchema,
  GrowingSeasonSchema,
  RequirementsSchema,
  PhysicalCharacteristicsSchema,
  TimingSchema,
} from './patch-schema';

export { PersonSchema, personSchema } from './person-schema';
export { MapOverlaySchema, mapOverlaySchema, MAP_OVERLAY_TYPES } from './map-overlay-schema';
export type { MapOverlay } from './map-overlay-schema';
export {
  PlantingSchema,
  PlantPlacementSchema,
  SeedStockSchema,
  plantingSchema,
  PLANTING_ROLES,
  PLANTING_STATUSES,
  PLANTING_QUANTITY_UNITS,
  SEED_UNITS,
} from './planting-schema';
export { NUTRIENT_DEMANDS } from './plant-schema';

// Type exports
export type { Person } from './person-schema';
export type { Planting, PlantPlacement, SeedStock } from './planting-schema';
export type { Garden } from './garden-schema';
export type {
  Patch,
  PlantingPlan,
  PlantSpecies,
  PlantVariety,
  PlantingPlanItem,
  GrowingSeason,
  Requirements,
  PhysicalCharacteristics,
  Timing,
} from './patch-schema';

export type GardenDefinitions = {
  Patch: Patch,
  PlantingPlan: PlantingPlan,
  PlantSpecies: PlantSpecies,
  PlantVariety: PlantVariety,
  PlantingPlanItem: PlantingPlanItem,
  GrowingSeason: GrowingSeason,
  Requirements: Requirements,
  PhysicalCharacteristics: PhysicalCharacteristics,
  Timing: Timing,
  GeoFeature: GeoFeature,
  Workshop: Workshop,
  Shed: Shed,
  BeeStand: BeeStand,
  Path: Path,
  Seating: Seating,
  FirePlace: FirePlace,
  WaterBody: WaterBody,
  Person: Person,
  Planting: Planting,
  SeedStock: SeedStock,
  PlantPlacement: PlantPlacement,
  MapOverlay: MapOverlay,
  Garden: Garden,
}

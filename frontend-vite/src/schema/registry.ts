import type { PlantSpecies, PlantVariety } from './plant-schema';
import type { Person } from './person-schema';
import type { Patch } from './patch-schema';
import type { Planting, BedNote, PlantPlacement, SeedStock } from './planting-schema';
import type { Garden } from './garden-schema';
import type { GeoFeature, GeoFeatureVersion } from './geo-feature-schema';
import type { MapOverlay } from './map-overlay-schema';
import type { GardenEvent } from './event-schema';

/**
 * Type registry for Graviola's typed store API (`filterOne` / `filterMany`).
 *
 * Maps the store's type names to the zod-inferred document types, so `where`,
 * `include` and `select` are checked against the model:
 *
 * ```ts
 * const { store } = usePergolaStore();
 * store.filterMany('Planting', { where: { status: 'planned' }, include: { patch: true } });
 * ```
 */
export type PergolaRegistry = {
  PlantSpecies: PlantSpecies;
  PlantVariety: PlantVariety;
  Person: Person;
  Patch: Patch;
  Planting: Planting;
  SeedStock: SeedStock;
  PlantPlacement: PlantPlacement;
  BedNote: BedNote;
  Garden: Garden;
  GeoFeature: GeoFeature;
  GeoFeatureVersion: GeoFeatureVersion;
  MapOverlay: MapOverlay;
  GardenEvent: GardenEvent;
};

export type PergolaTypeName = keyof PergolaRegistry;

/**
 * Relations of a garden that are loaded together with it.
 *
 * Graviola's filterOne / filterMany load named relations only when they are
 * listed in `include`, and saving the garden (e.g. after drawing a feature on
 * the map) writes the whole document back — a relation missing here would be
 * deleted on the next save. `__tests__/sparql-datastore.test.ts` checks that
 * every relation of the Garden schema is listed.
 */
export const GARDEN_RELATIONS = {
  geoFeatures: true,
  patches: true,
  mainGeoFeature: true,
  mapOverlays: true,
} as const;

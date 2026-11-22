/**
 * Read and write model of the bed plan (`PlantPlacement`), through Graviola's
 * typed store like the season read model (api/season.ts).
 */
import { wktToGeoJSON } from '@terraformer/wkt';
import { shapeFromWkt, shapeToWkt } from '../components/bed-planner/bedLayout';
import type { BedPlacement } from '../components/bed-planner/types';
import type { PergolaRegistry } from '../schema/registry';
import { GARDEN_NS, REF, idOf, sparqlSelect, type SeasonStore } from './season';

export const PLACEMENT_QUERY_KEY = ['season', 'placements'] as const;

export const PLACEMENT_TYPE_IRI = `${GARDEN_NS}PlantPlacement`;
export const PLANTING_TYPE_IRI = `${GARDEN_NS}Planting`;

const asNumber = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

/** All placements of the store. Placements whose planting is gone cannot be resolved and are dropped. */
export async function fetchPlacements(store: SeasonStore): Promise<BedPlacement[]> {
  const docs = await store.filterMany('PlantPlacement', { include: { planting: REF } });
  return docs.flatMap((doc): BedPlacement[] => {
    const iri = doc['@id'];
    const plantingIri = idOf(doc.planting);
    const x = asNumber(doc.x);
    const y = asNumber(doc.y);
    if (!iri || !plantingIri || x === undefined || y === undefined) return [];
    return [
      {
        iri,
        plantingIri,
        x,
        y,
        shape: shapeFromWkt(doc.shape),
        spacing: asNumber(doc.spacing),
        rowSpacing: asNumber(doc.rowSpacing),
      },
    ];
  });
}

/**
 * The document an upsert stores for a placement: the planting only as a link,
 * the shape as WKT. `base` is the stored document, so fields the planner does
 * not know (`name`, `notes` from the generic form) are kept.
 */
export const placementDoc = (
  p: BedPlacement,
  base: Record<string, unknown> = {},
): PergolaRegistry['PlantPlacement'] => {
  const doc: Record<string, unknown> = {
    ...base,
    '@id': p.iri,
    '@type': PLACEMENT_TYPE_IRI,
    planting: { '@id': p.plantingIri, '@type': PLANTING_TYPE_IRI },
    x: p.x,
    y: p.y,
    shape: p.shape ? shapeToWkt(p.shape) : undefined,
    spacing: p.spacing,
    rowSpacing: p.rowSpacing,
  };
  // no `undefined` values in a document that goes to the store
  for (const key of Object.keys(doc)) if (doc[key] === undefined) delete doc[key];
  return doc as PergolaRegistry['PlantPlacement'];
};

/**
 * Placements that point to a planting, found by plain SPARQL: once the planting
 * is deleted the typed API can no longer resolve the link.
 */
export async function placementIrisOfPlanting(plantingIri: string): Promise<string[]> {
  const rows = await sparqlSelect(
    `SELECT DISTINCT ?pp WHERE { ?pp a g:PlantPlacement ; g:planting <${plantingIri}> }`,
  );
  return rows.flatMap((r) => (r.pp?.value ? [r.pp.value] : []));
}

/** Geometry of every feature of a garden, by the IRI of its `GeoFeature`. */
export async function fetchGardenGeometries(
  store: SeasonStore,
  gardenIri: string,
): Promise<Map<string, GeoJSON.Geometry>> {
  const [garden, features] = await Promise.all([
    store.filterOne('Garden', gardenIri, { include: { geoFeatures: REF } }),
    store.filterMany('GeoFeature', {}),
  ]);
  const inGarden = new Set((garden?.geoFeatures ?? []).map(idOf).filter(Boolean));
  const geometries = new Map<string, GeoJSON.Geometry>();
  for (const feature of features) {
    const iri = feature['@id'];
    if (!iri || !feature.geo || !inGarden.has(iri)) continue;
    try {
      geometries.set(iri, wktToGeoJSON(feature.geo) as GeoJSON.Geometry);
    } catch {
      // not WKT: the feature is not drawn
    }
  }
  return geometries;
}

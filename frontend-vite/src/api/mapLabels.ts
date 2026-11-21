import { sparqlSelect } from './season';

/** Natural sort so "Einzelbeet 2" comes before "Einzelbeet 10". */
const collator = new Intl.Collator('de', { numeric: true, sensitivity: 'base' });

/**
 * Names of everything that sits on the garden's geo features.
 *
 * GeoFeatures carry no name themselves; beds, sheds, ponds … point to them via
 * `g:geoFeature`. One geo feature can carry several objects (e.g. a polytunnel
 * and the bed inside it), so the result maps each geo feature to all names.
 * The query is type-agnostic, new feature types are picked up automatically.
 */
export async function fetchGeoFeatureNames(gardenIri: string): Promise<Map<string, string[]>> {
  const rows = await sparqlSelect(`
    SELECT DISTINCT ?gf ?e ?name WHERE {
      <${gardenIri}> g:geoFeatures ?gf .
      ?e g:geoFeature ?gf ; g:name ?name .
    }`);
  const byFeature = new Map<string, Map<string, string>>();
  rows.forEach((b) => {
    const gf = b.gf?.value;
    const entity = b.e?.value;
    const name = b.name?.value?.trim();
    if (!gf || !entity || !name) return;
    if (!byFeature.has(gf)) byFeature.set(gf, new Map());
    // one name per entity, even if it has several types or names
    if (!byFeature.get(gf)!.has(entity)) byFeature.get(gf)!.set(entity, name);
  });
  const result = new Map<string, string[]>();
  byFeature.forEach((entities, gf) => {
    result.set(gf, [...new Set(entities.values())].sort(collator.compare));
  });
  return result;
}

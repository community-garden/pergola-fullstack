/**
 * Read model for season planning.
 *
 * The planner needs *all* beds, plantings, plants and persons of a garden at
 * once. They are loaded through Graviola's typed store API (`filterMany` with
 * `include`, checked against `PergolaRegistry`) and flattened into the small
 * view types below; writes go through the same store — see
 * hooks/usePlantingMutations.
 *
 * Graviola's SPARQL `where` cannot express "relation is missing" (wishes have
 * no bed, some beds have no geometry) and has no `@id: { in }`, so the
 * garden scoping of beds and plantings stays on the client.
 */
import type { CrudDatastoreStore } from '@graviola/edb-state-hooks';
import type { PergolaRegistry } from '../schema/registry';

export const SPARQL_QUERY_URL: string =
  import.meta.env.VITE_SPARQL_API_URL || 'http://localhost:7878/query';

export const GARDEN_NS = 'https://ontology.semantic-desk.top/garden#';

type Binding = Record<string, { type: string; value: string; datatype?: string } | undefined>;

const PREFIXES = `PREFIX g: <${GARDEN_NS}>\n`;

/**
 * Plain SPARQL SELECT. Only api/mapLabels.ts still needs it: its query follows
 * an inverse relation over every feature type, which the typed API cannot do.
 */
export async function sparqlSelect(query: string): Promise<Binding[]> {
  const res = await fetch(SPARQL_QUERY_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/sparql-results+json',
    },
    body: new URLSearchParams({ query: PREFIXES + query }),
  });
  if (!res.ok) throw new Error(`SPARQL ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.results.bindings as Binding[];
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MonthRange = [number, number];

export interface PlantPhases {
  preCultivation?: MonthRange;
  sowing?: MonthRange;
  planting?: MonthRange;
  harvest?: MonthRange;
}

export interface PlantInfo {
  iri: string;
  kind: 'species' | 'variety';
  name: string;
  icon?: string;
  /** Main image (URL, may be relative to the app root) — shown instead of the icon */
  imageUrl?: string;
  family?: string;
  nutrientDemand?: string;
  perennial?: boolean;
  /** For varieties: the species IRI */
  speciesIri?: string;
  /** Recommended spacing in the row, in cm (bed planner: diameter of a plant) */
  spacing?: number;
  /** Recommended spacing between rows, in cm */
  rowSpacing?: number;
  /** Days from sowing to germination / to harvest (calendar columns) */
  germinationDays?: number;
  daysToHarvest?: number;
  phases: PlantPhases;
}

export interface PersonInfo {
  iri: string;
  name: string;
}

export interface PatchInfo {
  iri: string;
  name: string;
  icon?: string;
  /** Main image (URL, may be relative to the app root), e.g. the bed's animal on community beds */
  imageUrl?: string;
  patchType?: string;
  description?: string;
  geoFeatureIri?: string;
  /** rotation of the bed plan in degrees; undefined: automatic */
  planRotation?: number;
  responsiblePersons: PersonInfo[];
}

export interface PlantingInfo {
  iri: string;
  name?: string;
  patchIri?: string;
  speciesIri?: string;
  varietyIri?: string;
  role?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  quantity?: number;
  quantityUnit?: string;
  requestedByIri?: string;
  notes?: string;
}

// ---------------------------------------------------------------------------
// Queries (typed store API)
// ---------------------------------------------------------------------------

export type SeasonStore = Pick<CrudDatastoreStore<PergolaRegistry>, 'filterMany' | 'filterOne'>;

/** `{ '@id' }` of a loaded relation; Graviola returns `{}` for a missing one. */
export const idOf = (ref: unknown): string | undefined => {
  const iri = (ref as { '@id'?: unknown } | undefined)?.['@id'];
  return typeof iri === 'string' && iri ? iri : undefined;
};

/** Plant types are `.loose()`, so fields not shared by species and varieties are `unknown`. */
const asString = (v: unknown) => (typeof v === 'string' ? v : undefined);
const asBoolean = (v: unknown) => (typeof v === 'boolean' ? v : undefined);
const asNumber = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

const range = (start?: number, end?: number): MonthRange | undefined =>
  start !== undefined && end !== undefined ? [start, end] : undefined;

/** Only the link of a relation is needed: load it as a stub. */
export const REF = { maxRecursion: 0 } as const;

export async function fetchPlants(store: SeasonStore): Promise<PlantInfo[]> {
  const [species, varieties] = await Promise.all([
    store.filterMany('PlantSpecies', {}),
    store.filterMany('PlantVariety', { include: { species: REF } }),
  ]);
  const toInfo = (
    doc: PergolaRegistry['PlantSpecies'] | PergolaRegistry['PlantVariety'],
    kind: PlantInfo['kind'],
  ): PlantInfo => {
    const gs = doc.growingSeason;
    const pc = doc.physicalCharacteristics;
    return {
      iri: doc['@id']!,
      kind,
      name: doc.name,
      icon: doc.icon,
      imageUrl: doc.imageUrl,
      family: asString(doc.family),
      nutrientDemand: asString(doc.nutrientDemand),
      perennial: asBoolean(doc.perennial),
      speciesIri: 'species' in doc ? idOf(doc.species) : undefined,
      spacing: asNumber(pc?.spacing),
      rowSpacing: asNumber(pc?.rowSpacing),
      germinationDays: asNumber(doc.timing?.germinationDays),
      daysToHarvest: asNumber(doc.timing?.daysToHarvest),
      phases: {
        preCultivation: range(gs?.preCultivationStart, gs?.preCultivationEnd),
        sowing: range(gs?.sowingStart, gs?.sowingEnd),
        planting: range(gs?.plantingStart, gs?.plantingEnd),
        harvest: range(gs?.harvestStart, gs?.harvestEnd),
      },
    };
  };
  return [
    ...species.filter((d) => d['@id'] && d.name).map((d) => toInfo(d, 'species')),
    ...varieties.filter((d) => d['@id'] && d.name).map((d) => toInfo(d, 'variety')),
  ];
}

export async function fetchPersons(store: SeasonStore): Promise<PersonInfo[]> {
  const persons = await store.filterMany('Person', {});
  return persons
    .filter((p) => p['@id'] && p.name)
    .map((p) => ({ iri: p['@id']!, name: p.name! }))
    .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0));
}

/**
 * Beds of a garden: patches whose geo feature belongs to the garden, plus
 * patches without geometry (e.g. raised beds not drawn on the map yet).
 */
export async function fetchPatches(store: SeasonStore, gardenIri: string): Promise<PatchInfo[]> {
  const [garden, patches] = await Promise.all([
    store.filterOne('Garden', gardenIri, { include: { geoFeatures: REF } }),
    store.filterMany('Patch', {
      include: { geoFeature: REF, responsiblePersons: { maxRecursion: 1 } },
    }),
  ]);
  const gardenGeoFeatures = new Set((garden?.geoFeatures ?? []).map(idOf).filter(Boolean));
  return patches
    .filter((p) => p['@id'] && p.name)
    .filter((p) => {
      const geo = idOf(p.geoFeature);
      return !geo || gardenGeoFeatures.has(geo);
    })
    .map((p) => ({
      iri: p['@id']!,
      name: p.name,
      icon: p.icon,
      imageUrl: p.imageUrl,
      patchType: p.patchType,
      description: p.description,
      geoFeatureIri: idOf(p.geoFeature),
      planRotation: asNumber(p.planRotation),
      responsiblePersons: (p.responsiblePersons ?? []).flatMap((person): PersonInfo[] => {
        const iri = idOf(person);
        return iri ? [{ iri, name: asString(person.name) ?? iri }] : [];
      }),
    }));
}

export async function fetchPlantings(store: SeasonStore): Promise<PlantingInfo[]> {
  const plantings = await store.filterMany('Planting', {
    include: { patch: REF, plantSpecies: REF, plantVariety: REF, requestedBy: REF },
  });
  return plantings
    .filter((p) => p['@id'])
    .map((p) => ({
      iri: p['@id']!,
      name: p.name,
      patchIri: idOf(p.patch),
      speciesIri: idOf(p.plantSpecies),
      varietyIri: idOf(p.plantVariety),
      role: p.role,
      status: p.status,
      startDate: p.startDate?.slice(0, 10),
      endDate: p.endDate?.slice(0, 10),
      quantity: p.quantity,
      quantityUnit: p.quantityUnit,
      requestedByIri: idOf(p.requestedBy),
      notes: p.notes,
    }));
}

/** React Query key prefix for everything season-planning related. */
export const SEASON_QUERY_KEY = ['season'] as const;

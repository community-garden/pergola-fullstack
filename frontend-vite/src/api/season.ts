/**
 * Read model for season planning.
 *
 * The planner needs *all* beds, plantings, plants and persons of a garden at
 * once (Graviola's typed document loader pages at 20 and walks nested
 * documents, which is slow for a 100-row timeline). So the read side uses a few
 * flat SPARQL SELECTs against the same endpoint; writes still go through the
 * Graviola store (schema-validated upsert) — see hooks/usePlantingMutations.
 */

export const SPARQL_QUERY_URL: string =
  import.meta.env.VITE_SPARQL_API_URL || 'http://localhost:7878/query';

export const GARDEN_NS = 'https://ontology.semantic-desk.top/garden#';

type Binding = Record<string, { type: string; value: string; datatype?: string } | undefined>;

const PREFIXES = `PREFIX g: <${GARDEN_NS}>\n`;

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

const str = (b: Binding, key: string): string | undefined => b[key]?.value;
const num = (b: Binding, key: string): number | undefined => {
  const v = b[key]?.value;
  if (v === undefined) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
};
const bool = (b: Binding, key: string): boolean | undefined => {
  const v = b[key]?.value;
  return v === undefined ? undefined : v === 'true' || v === '1';
};

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
  patchType?: string;
  description?: string;
  geoFeatureIri?: string;
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
// Queries
// ---------------------------------------------------------------------------

const range = (b: Binding, s: string, e: string): MonthRange | undefined => {
  const start = num(b, s);
  const end = num(b, e);
  return start !== undefined && end !== undefined ? [start, end] : undefined;
};

export async function fetchPlants(): Promise<PlantInfo[]> {
  const rows = await sparqlSelect(`
    SELECT ?s ?type ?name ?icon ?image ?family ?nd ?per ?species
           ?pcS ?pcE ?soS ?soE ?plS ?plE ?haS ?haE
    WHERE {
      VALUES ?type { g:PlantSpecies g:PlantVariety }
      ?s a ?type ; g:name ?name .
      OPTIONAL { ?s g:icon ?icon }
      OPTIONAL { ?s g:imageUrl ?image }
      OPTIONAL { ?s g:family ?family }
      OPTIONAL { ?s g:nutrientDemand ?nd }
      OPTIONAL { ?s g:perennial ?per }
      OPTIONAL { ?s g:species ?species }
      OPTIONAL {
        ?s g:growingSeason ?gs .
        OPTIONAL { ?gs g:preCultivationStart ?pcS } OPTIONAL { ?gs g:preCultivationEnd ?pcE }
        OPTIONAL { ?gs g:sowingStart ?soS }         OPTIONAL { ?gs g:sowingEnd ?soE }
        OPTIONAL { ?gs g:plantingStart ?plS }       OPTIONAL { ?gs g:plantingEnd ?plE }
        OPTIONAL { ?gs g:harvestStart ?haS }        OPTIONAL { ?gs g:harvestEnd ?haE }
      }
    }`);
  const byIri = new Map<string, PlantInfo>();
  rows.forEach((b) => {
    const iri = str(b, 's')!;
    if (byIri.has(iri)) return;
    byIri.set(iri, {
      iri,
      kind: str(b, 'type') === `${GARDEN_NS}PlantVariety` ? 'variety' : 'species',
      name: str(b, 'name')!,
      icon: str(b, 'icon'),
      imageUrl: str(b, 'image'),
      family: str(b, 'family'),
      nutrientDemand: str(b, 'nd'),
      perennial: bool(b, 'per'),
      speciesIri: str(b, 'species'),
      phases: {
        preCultivation: range(b, 'pcS', 'pcE'),
        sowing: range(b, 'soS', 'soE'),
        planting: range(b, 'plS', 'plE'),
        harvest: range(b, 'haS', 'haE'),
      },
    });
  });
  return [...byIri.values()];
}

export async function fetchPersons(): Promise<PersonInfo[]> {
  const rows = await sparqlSelect(`
    SELECT ?p ?name WHERE { ?p a g:Person ; g:name ?name } ORDER BY LCASE(?name)`);
  return rows.map((b) => ({ iri: str(b, 'p')!, name: str(b, 'name')! }));
}

/**
 * Beds of a garden: patches whose geo feature belongs to the garden, plus
 * patches without geometry (e.g. raised beds not drawn on the map yet).
 */
export async function fetchPatches(gardenIri: string): Promise<PatchInfo[]> {
  const rows = await sparqlSelect(`
    SELECT ?p ?name ?icon ?type ?desc ?geo ?person ?personName WHERE {
      ?p a g:Patch ; g:name ?name .
      OPTIONAL { ?p g:geoFeature ?geo }
      FILTER(!BOUND(?geo) || EXISTS { <${gardenIri}> g:geoFeatures ?geo })
      OPTIONAL { ?p g:icon ?icon }
      OPTIONAL { ?p g:patchType ?type }
      OPTIONAL { ?p g:description ?desc }
      OPTIONAL { ?p g:responsiblePersons ?person . OPTIONAL { ?person g:name ?personName } }
    }`);
  const byIri = new Map<string, PatchInfo>();
  rows.forEach((b) => {
    const iri = str(b, 'p')!;
    let patch = byIri.get(iri);
    if (!patch) {
      patch = {
        iri,
        name: str(b, 'name')!,
        icon: str(b, 'icon'),
        patchType: str(b, 'type'),
        description: str(b, 'desc'),
        geoFeatureIri: str(b, 'geo'),
        responsiblePersons: [],
      };
      byIri.set(iri, patch);
    }
    const personIri = str(b, 'person');
    if (personIri && !patch.responsiblePersons.some((p) => p.iri === personIri)) {
      patch.responsiblePersons.push({ iri: personIri, name: str(b, 'personName') ?? personIri });
    }
  });
  return [...byIri.values()];
}

export async function fetchPlantings(): Promise<PlantingInfo[]> {
  const rows = await sparqlSelect(`
    SELECT ?p ?name ?patch ?species ?variety ?role ?status ?start ?end ?qty ?unit ?req ?notes WHERE {
      ?p a g:Planting .
      OPTIONAL { ?p g:name ?name }
      OPTIONAL { ?p g:patch ?patch }
      OPTIONAL { ?p g:plantSpecies ?species }
      OPTIONAL { ?p g:plantVariety ?variety }
      OPTIONAL { ?p g:role ?role }
      OPTIONAL { ?p g:status ?status }
      OPTIONAL { ?p g:startDate ?start }
      OPTIONAL { ?p g:endDate ?end }
      OPTIONAL { ?p g:quantity ?qty }
      OPTIONAL { ?p g:quantityUnit ?unit }
      OPTIONAL { ?p g:requestedBy ?req }
      OPTIONAL { ?p g:notes ?notes }
    }`);
  const byIri = new Map<string, PlantingInfo>();
  rows.forEach((b) => {
    const iri = str(b, 'p')!;
    if (byIri.has(iri)) return;
    byIri.set(iri, {
      iri,
      name: str(b, 'name'),
      patchIri: str(b, 'patch'),
      speciesIri: str(b, 'species'),
      varietyIri: str(b, 'variety'),
      role: str(b, 'role'),
      status: str(b, 'status'),
      startDate: str(b, 'start')?.slice(0, 10),
      endDate: str(b, 'end')?.slice(0, 10),
      quantity: num(b, 'qty'),
      quantityUnit: str(b, 'unit'),
      requestedByIri: str(b, 'req'),
      notes: str(b, 'notes'),
    });
  });
  return [...byIri.values()];
}

/** React Query key prefix for everything season-planning related. */
export const SEASON_QUERY_KEY = ['season'] as const;

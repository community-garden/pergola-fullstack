/**
 * Fixtures for the bed planner stories: two beds of the Wurzelwerk garden
 * (geometry only) and plants as the season import stores them (names, emoji,
 * main image, spacing, months). "Mais" and "Radieschen" are not in the plant
 * database yet; they exist only here, without images, as in the workshop
 * sketch of the Igel-Beet (Karotten | Mais | Kürbis | Mais | Karotten).
 */
import { wktToGeoJSON } from '@terraformer/wkt';
import type { PlantInfo, PlantingInfo } from '../../api/season';
import type { BedPlacement, BedPlanData } from '../../components/bed-planner/types';

const SPECIES = 'https://data.semantic-desk.top/garden/PlantSpecies/';
const PATCH = 'https://ontology.semantic-desk.top/garden#Patch/';

const geometry = (wkt: string) => wktToGeoJSON(wkt) as GeoJSON.Geometry;

/** Igel-Beet: a skewed quadrilateral, bounding box 300 × 509 cm. */
export const IGEL_BED = {
  iri: `${PATCH}8vfrdlxuyq9`,
  name: 'Igel-Beet',
  geometry: geometry(
    'POLYGON ((13.731424521 51.083282497, 13.73146509 51.083276705, 13.731447488 51.083322409, 13.731422174 51.083318829, 13.731424521 51.083282497))',
  ),
};

/** Käfer-Beet: six corners, bounding box 250 × 217 cm; its north-east corner of the box is not bed. */
export const KAEFER_BED = {
  iri: `${PATCH}7023t3i4tct`,
  name: 'Käfer-Beet',
  geometry: geometry(
    'POLYGON ((13.731493688 51.083481593, 13.731512296 51.083484015, 13.731509446 51.083491387, 13.731490839 51.083501075, 13.731476589 51.083500233, 13.731479272 51.083488965, 13.731493688 51.083481593))',
  ),
};

/** Regenwurm-Beet, a neighbour west of the Igel-Beet (context). */
export const REGENWURM_GEOMETRY = geometry(
  'POLYGON ((13.731327659 51.083293146, 13.731372251 51.083291039, 13.731374598 51.083317156, 13.731332856 51.083321368, 13.731327659 51.083293146))',
);

const plant = (
  id: string,
  name: string,
  icon: string,
  spacing: number | undefined,
  start: number,
  harvestEnd: number,
  withImage = true,
): PlantInfo => ({
  iri: `${SPECIES}${id}`,
  kind: 'species',
  name,
  icon,
  imageUrl: withImage ? `/media/plants/${id}/frucht.webp` : undefined,
  spacing,
  phases: { planting: [start, start + 1], harvest: [harvestEnd - 2, harvestEnd] },
});

export const PLANTS: PlantInfo[] = [
  plant('karotte', 'Karotten', '🥕', 20, 3, 10),
  plant('kuerbis-spaghetti-hokkaido', 'Kürbis', '🎃', 100, 5, 10),
  plant('knoblauch', 'Knoblauch', '🧄', 10, 10, 8),
  plant('salat', 'Salat', '🥬', 30, 4, 10),
  plant('zwiebel', 'Zwiebel', '🧅', 6, 3, 9),
  plant('kamille', 'Kamille', '🌼', undefined, 3, 8),
  plant('freilandtomate', 'Tomaten', '🍅', 60, 5, 10),
  plant('basilikum', 'Basilikum', '🌿', 20, 5, 10),
  plant('rote-bete', 'Rote Bete', '🟣', 25, 4, 10),
  plant('zucchini', 'Zucchini', '🥒', 80, 5, 10),
  plant('mais', 'Mais', '🌽', 30, 5, 9, false),
  plant('radieschen', 'Radieschen', '🔴', 5, 3, 5, false),
];

const planting = (
  id: string,
  bedIri: string,
  speciesId: string,
  startDate: string,
  endDate: string,
  extra: Partial<PlantingInfo> = {},
): PlantingInfo => ({
  iri: `urn:fixture:Planting/${id}`,
  patchIri: bedIri,
  speciesIri: `${SPECIES}${speciesId}`,
  role: 'main',
  status: 'planned',
  startDate,
  endDate,
  ...extra,
});

/** The Igel-Beet as sketched in the workshop, plus Knoblauch with a planned number of plants. */
export const IGEL_PLANTINGS: PlantingInfo[] = [
  planting('igel-karotten', IGEL_BED.iri, 'karotte', '2027-03-01', '2027-10-31'),
  planting('igel-mais', IGEL_BED.iri, 'mais', '2027-05-01', '2027-09-30'),
  planting('igel-kuerbis', IGEL_BED.iri, 'kuerbis-spaghetti-hokkaido', '2027-04-01', '2027-10-31'),
  planting('igel-radieschen', IGEL_BED.iri, 'radieschen', '2027-03-01', '2027-05-31', { role: 'pre_crop' }),
  planting('igel-knoblauch', IGEL_BED.iri, 'knoblauch', '2026-10-15', '2027-07-31', {
    quantity: 12,
    quantityUnit: 'plants',
  }),
  // another season: not listed
  planting('igel-tomaten-2026', IGEL_BED.iri, 'freilandtomate', '2026-05-01', '2026-09-30'),
];

export const KAEFER_PLANTINGS: PlantingInfo[] = [
  planting('kaefer-salat', KAEFER_BED.iri, 'salat', '2027-04-01', '2027-07-31'),
  planting('kaefer-zwiebel', KAEFER_BED.iri, 'zwiebel', '2027-03-15', '2027-08-31'),
  planting('kaefer-kamille', KAEFER_BED.iri, 'kamille', '2027-04-01', '2027-08-31'),
];

const placement = (plantingId: string, n: number, x: number, y: number): BedPlacement => ({
  iri: `urn:fixture:PlantPlacement/${plantingId}-${n}`,
  plantingIri: `urn:fixture:Planting/${plantingId}`,
  x,
  y,
});

/** A row of carrots, a pumpkin, a row of garlic — and two carrots too close together. */
export const IGEL_PLACEMENTS: BedPlacement[] = [
  ...[40, 60, 80, 100, 120, 140, 160].map((x, i) => placement('igel-karotten', i, x, 110)),
  placement('igel-karotten', 7, 50, 200),
  placement('igel-karotten', 8, 62, 204),
  placement('igel-kuerbis', 0, 150, 280),
  ...[60, 75, 90, 105, 120, 135].map((x, i) => placement('igel-knoblauch', i, x, 410)),
  placement('igel-mais', 0, 190, 200),
];

const shaped = (
  plantingId: string,
  n: number,
  kind: 'line' | 'area',
  points: [number, number][],
  spacing: number,
): BedPlacement => ({
  iri: `urn:fixture:PlantPlacement/${plantingId}-${kind}-${n}`,
  plantingIri: `urn:fixture:Planting/${plantingId}`,
  x: points[0][0],
  y: points[0][1],
  shape: { kind, points: points.map(([x, y]) => ({ x, y })) },
  spacing,
});

/**
 * The workshop sketch of the Igel-Beet with rows and areas, strips along the
 * bed: Karotten | Mais | Kürbis | Mais | Karotten, radishes as pre-crop between
 * the pumpkins and a row of twelve garlic plants across the south end.
 */
export const IGEL_STRIPS: BedPlacement[] = [
  shaped('igel-karotten', 0, 'area', [[8, 55], [37, 49], [71, 440], [27, 430]], 20),
  shaped('igel-mais', 0, 'line', [[59, 49], [96, 369]], 30),
  placement('igel-kuerbis', 0, 107, 143),
  shaped('igel-radieschen', 0, 'area', [[100, 211], [135, 212], [146, 277], [108, 274]], 5),
  placement('igel-kuerbis', 1, 139, 349),
  shaped('igel-mais', 1, 'line', [[125, 37], [190, 384]], 30),
  shaped('igel-karotten', 1, 'area', [[146, 28], [175, 22], [284, 486], [239, 476]], 20),
  shaped('igel-knoblauch', 0, 'line', [[87, 405], [211, 429]], 10),
];

export const igelData = (placements: BedPlacement[] = []): BedPlanData => ({
  bed: IGEL_BED,
  season: 2027,
  plantings: IGEL_PLANTINGS,
  plants: PLANTS,
  placements,
  context: [REGENWURM_GEOMETRY],
});

export const kaeferData = (): BedPlanData => ({
  bed: KAEFER_BED,
  season: 2027,
  plantings: KAEFER_PLANTINGS,
  plants: PLANTS,
  placements: [],
});

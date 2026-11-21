import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchPatches,
  fetchPersons,
  fetchPlantings,
  fetchPlants,
  SEASON_QUERY_KEY,
  type PatchInfo,
  type PersonInfo,
  type PlantInfo,
  type PlantingInfo,
} from '../api/season';
import { useCurrentGarden } from './useCurrentGarden';

export interface SeasonData {
  patches: PatchInfo[];
  plantings: PlantingInfo[];
  plants: PlantInfo[];
  persons: PersonInfo[];
  plantsByIri: Map<string, PlantInfo>;
  patchesByIri: Map<string, PatchInfo>;
  personsByIri: Map<string, PersonInfo>;
}

const EMPTY: SeasonData = {
  patches: [],
  plantings: [],
  plants: [],
  persons: [],
  plantsByIri: new Map(),
  patchesByIri: new Map(),
  personsByIri: new Map(),
};

/** Natural sort so "Einzelbeet 2" comes before "Einzelbeet 10". */
const collator = new Intl.Collator('de', { numeric: true, sensitivity: 'base' });

/** Community beds first, then single beds, then everything else. */
const patchRank = (patch: PatchInfo) => {
  if (/^Einzelbeet/i.test(patch.name)) return 1;
  if (patch.patchType === 'bed' && /-Beet$/i.test(patch.name)) return 0;
  return 2;
};

export const sortPatches = (patches: PatchInfo[]) =>
  [...patches].sort((a, b) => patchRank(a) - patchRank(b) || collator.compare(a.name, b.name));

/**
 * Everything the season planner needs for the current garden, loaded with a
 * handful of flat SPARQL queries. Invalidate `SEASON_QUERY_KEY` after writes.
 */
export const useSeasonData = () => {
  const { gardenIRI } = useCurrentGarden();
  const query = useQuery({
    queryKey: [...SEASON_QUERY_KEY, gardenIRI],
    enabled: Boolean(gardenIRI),
    staleTime: 30_000,
    queryFn: async () => {
      const [patches, plantings, plants, persons] = await Promise.all([
        fetchPatches(gardenIRI!),
        fetchPlantings(),
        fetchPlants(),
        fetchPersons(),
      ]);
      return { patches: sortPatches(patches), plantings, plants, persons };
    },
  });

  const data = useMemo<SeasonData>(() => {
    if (!query.data) return EMPTY;
    const { patches, plantings, plants, persons } = query.data;
    const patchesByIri = new Map(patches.map((p) => [p.iri, p]));
    return {
      patches,
      // Plantings of other gardens are dropped; wishes (no bed) are kept.
      plantings: plantings.filter((p) => !p.patchIri || patchesByIri.has(p.patchIri)),
      plants,
      persons,
      plantsByIri: new Map(plants.map((p) => [p.iri, p])),
      patchesByIri,
      personsByIri: new Map(persons.map((p) => [p.iri, p])),
    };
  }, [query.data]);

  return { ...query, data };
};

/** Display helpers shared by timeline, map card and lists. */
export const plantingPlant = (planting: PlantingInfo, data: SeasonData) => {
  const variety = planting.varietyIri ? data.plantsByIri.get(planting.varietyIri) : undefined;
  const species =
    (planting.speciesIri ? data.plantsByIri.get(planting.speciesIri) : undefined) ??
    (variety?.speciesIri ? data.plantsByIri.get(variety.speciesIri) : undefined);
  return { species, variety };
};

export const plantingLabel = (planting: PlantingInfo, data: SeasonData) => {
  const { species, variety } = plantingPlant(planting, data);
  const icon = variety?.icon ?? species?.icon ?? '🌱';
  /** main image of the variety, else of the species */
  const image = variety?.imageUrl ?? species?.imageUrl;
  const name = [species?.name, variety?.name].filter(Boolean).join(' · ') || planting.name || '–';
  return { icon, image, name, species, variety };
};

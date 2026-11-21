import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAdbContext, useDataStore } from '@graviola/edb-state-hooks';
import { useCreateOrEditModal } from './useCreateOrEditModal';
import { GARDEN_NS, SEASON_QUERY_KEY } from '../api/season';
import { toReferences } from '../utils/toReferences';

const PLANTING_TYPE_IRI = `${GARDEN_NS}Planting`;

type Ref = { '@id': string; name?: string };

export interface NewPlantingDefaults {
  patch?: Ref;
  plantSpecies?: Ref;
  plantVariety?: Ref;
  startDate?: string;
  endDate?: string;
  status?: string;
  role?: string;
  quantity?: number;
  quantityUnit?: string;
  notes?: string;
}

/** Fields of an existing planting that a copy takes over. */
const COPIED_FIELDS = [
  'patch', 'plantSpecies', 'plantVariety', 'role', 'startDate', 'endDate', 'quantity', 'quantityUnit', 'notes',
] as const;

/**
 * Write side of the season planner. All writes go through the Graviola store
 * (schema-aware upsert); the flat SPARQL read model is invalidated afterwards.
 */
export const usePlantingMutations = () => {
  const { dataStore, ready } = useDataStore();
  const { createEntityIRI } = useAdbContext();
  const queryClient = useQueryClient();
  const createOrEditModal = useCreateOrEditModal();

  const invalidate = useCallback(
    () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEY }),
        queryClient.invalidateQueries({ queryKey: ['anyOfFilterStore'] }),
      ]),
    [queryClient],
  );

  /** Persist new dates of a planting (timeline move / resize). */
  const updateDates = useCallback(
    async (plantingIri: string, startDate: string, endDate: string) => {
      if (!ready || !dataStore) throw new Error('DataStore not ready');
      const doc = (await dataStore.loadOne('Planting', plantingIri)) as Record<string, unknown> | null;
      if (!doc) throw new Error(`Planting ${plantingIri} not found`);
      await dataStore.upsert('Planting', plantingIri, {
        ...toReferences(doc),
        '@id': plantingIri,
        '@type': PLANTING_TYPE_IRI,
        startDate,
        endDate,
      } as any);
    },
    [dataStore, ready],
  );

  /** Open the edit dialog of an existing planting. */
  const editPlanting = useCallback(
    async (plantingIri: string) => {
      await createOrEditModal(plantingIri, PLANTING_TYPE_IRI).catch(() => undefined); // cancelled
      await invalidate();
    },
    [createOrEditModal, invalidate],
  );

  /** Open the dialog for a new planting, prefilled (bed, dates, …). */
  const createPlanting = useCallback(
    async (defaults: NewPlantingDefaults) => {
      const iri = createEntityIRI('Planting');
      await createOrEditModal(iri, PLANTING_TYPE_IRI, {
          '@id': iri,
          '@type': PLANTING_TYPE_IRI,
          role: 'main',
          status: 'planned',
          ...defaults,
          ...(defaults.patch && {
            patch: { '@type': `${GARDEN_NS}Patch`, ...defaults.patch },
          }),
          ...(defaults.plantSpecies && {
            plantSpecies: { '@type': `${GARDEN_NS}PlantSpecies`, ...defaults.plantSpecies },
          }),
          ...(defaults.plantVariety && {
            plantVariety: { '@type': `${GARDEN_NS}PlantVariety`, ...defaults.plantVariety },
          }),
        }).catch(() => undefined); // cancelled
      await invalidate();
    },
    [createEntityIRI, createOrEditModal, invalidate],
  );

  /** Open the dialog for a new planting that copies bed, plant, period and amount of an existing one. */
  const duplicatePlanting = useCallback(
    async (plantingIri: string) => {
      if (!ready || !dataStore) throw new Error('DataStore not ready');
      const doc = (await dataStore.loadOne('Planting', plantingIri)) as Record<string, unknown> | null;
      if (!doc) throw new Error(`Planting ${plantingIri} not found`);
      const refs = toReferences(doc);
      const defaults = Object.fromEntries(
        COPIED_FIELDS.filter((key) => refs[key] !== undefined).map((key) => [key, refs[key]]),
      ) as NewPlantingDefaults;
      await createPlanting({ ...defaults, status: 'planned' });
    },
    [createPlanting, dataStore, ready],
  );

  return { updateDates, editPlanting, createPlanting, duplicatePlanting, invalidate };
};

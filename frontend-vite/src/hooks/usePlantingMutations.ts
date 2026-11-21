import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAdbContext, useDataStore } from '@graviola/edb-state-hooks';
import { useCreateOrEditModal } from './useCreateOrEditModal';
import { GARDEN_NS, SEASON_QUERY_KEY } from '../api/season';
import { toReferences } from '../utils/toReferences';

const PLANTING_TYPE_IRI = `${GARDEN_NS}Planting`;

export interface NewPlantingDefaults {
  patch?: { '@id': string; name?: string };
  startDate?: string;
  endDate?: string;
  status?: string;
  role?: string;
}

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
        }).catch(() => undefined); // cancelled
      await invalidate();
    },
    [createEntityIRI, createOrEditModal, invalidate],
  );

  return { updateDates, editPlanting, createPlanting, invalidate };
};

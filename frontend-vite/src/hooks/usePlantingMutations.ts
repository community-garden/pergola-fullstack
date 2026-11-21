import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAdbContext, useDataStore } from '@graviola/edb-state-hooks';
import { useCreateOrEditModal } from './useCreateOrEditModal';
import { GARDEN_NS, SEASON_QUERY_KEY } from '../api/season';

const PLANTING_TYPE_IRI = `${GARDEN_NS}Planting`;

/**
 * References inside a loaded document come back as nested documents. For an
 * upsert only the link is relevant — reduce them to `{ '@id' }` so the
 * referenced entities are never rewritten from a possibly partial copy.
 */
const toReferences = (doc: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(doc).map(([key, value]) => {
      if (key.startsWith('@')) return [key, value];
      if (Array.isArray(value)) {
        return [
          key,
          value.map((v) => (v && typeof v === 'object' && '@id' in v ? { '@id': (v as any)['@id'] } : v)),
        ];
      }
      if (value && typeof value === 'object' && '@id' in value) {
        return [key, { '@id': (value as any)['@id'] }];
      }
      return [key, value];
    }),
  );

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

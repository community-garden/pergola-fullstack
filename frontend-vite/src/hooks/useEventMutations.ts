import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAdbContext, useDataStore } from '@graviola/edb-state-hooks';
import { format } from 'date-fns';
import { EVENTS_QUERY_KEY, EVENT_TYPE_IRI, duplicatedEventDoc, newEventDoc } from '../api/events';
import { toReferences } from '../utils/toReferences';
import { useCreateOrEditModal } from './useCreateOrEditModal';
import { useCurrentGarden } from './useCurrentGarden';
import { useInvalidateEntityQueries } from './useInvalidateEntityQueries';

/**
 * Write side of the garden events: open the form for a new event, or for a
 * copy of an existing one. Saving goes through Graviola's edit dialog; the
 * bookkeeping (creation time, revision) is added on the `entity-saved` intent
 * (see PergolaIntentBus).
 */
export const useEventMutations = () => {
  const { dataStore, ready } = useDataStore();
  const { createEntityIRI } = useAdbContext();
  const { gardenIRI } = useCurrentGarden();
  const queryClient = useQueryClient();
  const createOrEditModal = useCreateOrEditModal();

  const invalidateEntities = useInvalidateEntityQueries(EVENT_TYPE_IRI);
  const invalidate = useCallback(
    () =>
      Promise.all([
        queryClient.invalidateQueries({ queryKey: EVENTS_QUERY_KEY }),
        // the table's own list and count caches
        queryClient.invalidateQueries({ queryKey: ['type', EVENT_TYPE_IRI] }),
        invalidateEntities(),
      ]),
    [invalidateEntities, queryClient],
  );

  /** The form for a new event: today, confirmed. */
  const createEvent = useCallback(async () => {
    const iri = createEntityIRI('GardenEvent');
    await createOrEditModal(iri, EVENT_TYPE_IRI, newEventDoc(iri, gardenIRI, format(new Date(), 'yyyy-MM-dd'))).catch(
      () => undefined, // cancelled
    );
    await invalidate();
  }, [createEntityIRI, createOrEditModal, gardenIRI, invalidate]);

  /** The form for a new event that copies title, time and place of an existing one. */
  const duplicateEvent = useCallback(
    async (eventIri: string) => {
      if (!ready || !dataStore) throw new Error('DataStore not ready');
      const stored = (await dataStore.loadOne('GardenEvent', eventIri)) as Record<string, unknown> | null;
      if (!stored) throw new Error(`Event ${eventIri} not found`);
      const iri = createEntityIRI('GardenEvent');
      await createOrEditModal(iri, EVENT_TYPE_IRI, duplicatedEventDoc(toReferences(stored), iri, gardenIRI)).catch(
        () => undefined, // cancelled
      );
      await invalidate();
    },
    [createEntityIRI, createOrEditModal, dataStore, gardenIRI, invalidate, ready],
  );

  return { createEvent, duplicateEvent };
};

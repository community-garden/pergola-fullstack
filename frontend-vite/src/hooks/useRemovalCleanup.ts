import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PLACEMENT_QUERY_KEY, PLANTING_TYPE_IRI, placementIrisOfPlanting } from '../api/bedPlan';
import { NOTES_QUERY_KEY, NOTE_PATCH_TYPE_IRI, noteIrisOfPatch } from '../api/bedNotes';
import { usePergolaStore } from './usePergolaStore';

/**
 * What hangs on a deleted entity goes with it, so no orphans stay in the store:
 * - a planting takes its `PlantPlacement`s (the bed plan),
 * - a bed takes its `BedNote`s.
 * Mounted once in the layout, so it applies to every way of deleting
 * (tables, dialogs, planner).
 */
export const useRemovalCleanup = () => {
  const { store, ready } = usePergolaStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ready || !store?.subscribe) return;
    return store.subscribe((event) => {
      if (event.changeType !== 'remove') return;
      const isPlanting = event.typeName === 'Planting' || event.typeIRI === PLANTING_TYPE_IRI;
      const isPatch = event.typeName === 'Patch' || event.typeIRI === NOTE_PATCH_TYPE_IRI;
      if (!isPlanting && !isPatch) return;
      void (async () => {
        try {
          if (isPlanting) {
            const placements = await placementIrisOfPlanting(event.entityIRI);
            await Promise.all(placements.map((iri) => store.remove('PlantPlacement', iri)));
            if (placements.length > 0) await queryClient.invalidateQueries({ queryKey: PLACEMENT_QUERY_KEY });
          } else {
            const notes = await noteIrisOfPatch(event.entityIRI);
            await Promise.all(notes.map((iri) => store.remove('BedNote', iri)));
            if (notes.length > 0) await queryClient.invalidateQueries({ queryKey: NOTES_QUERY_KEY });
          }
        } catch (e) {
          console.error('Removing what hangs on a deleted planting or bed failed', e);
        }
      })();
    });
  }, [store, ready, queryClient]);
};

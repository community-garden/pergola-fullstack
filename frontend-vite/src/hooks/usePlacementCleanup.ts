import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { PLACEMENT_QUERY_KEY, PLANTING_TYPE_IRI, placementIrisOfPlanting } from '../api/bedPlan';
import { usePergolaStore } from './usePergolaStore';

/**
 * A planting that is deleted takes its bed plan with it: its `PlantPlacement`s
 * are removed too, so no orphans stay in the store. Mounted once in the layout,
 * so it applies to every way of deleting a planting (tables, dialogs, planner).
 */
export const usePlacementCleanup = () => {
  const { store, ready } = usePergolaStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!ready || !store?.subscribe) return;
    return store.subscribe((event) => {
      if (event.changeType !== 'remove') return;
      if (event.typeName !== 'Planting' && event.typeIRI !== PLANTING_TYPE_IRI) return;
      void (async () => {
        try {
          const placements = await placementIrisOfPlanting(event.entityIRI);
          await Promise.all(placements.map((iri) => store.remove('PlantPlacement', iri)));
          if (placements.length > 0) await queryClient.invalidateQueries({ queryKey: PLACEMENT_QUERY_KEY });
        } catch (e) {
          console.error('Bed plan: removing the placements of a deleted planting failed', e);
        }
      })();
    });
  }, [store, ready, queryClient]);
};

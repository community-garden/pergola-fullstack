import { useQuery } from '@tanstack/react-query';
import { useDataStore, useTypedFilterStore } from '@graviola/edb-state-hooks';
import { useCurrentGarden } from './useCurrentGarden';
import { Garden } from 'schema';

/** Relations of a garden that are loaded together with it. */
const GARDEN_RELATIONS = { geoFeatures: true, patches: true, mainGeoFeature: true, mapOverlays: true } as const;

export const useCurrentGardenInfo = () => {
  const { gardenIRI } = useCurrentGarden();
  const { ready } = useDataStore();
  const { loadDocumentAsync } = useTypedFilterStore<Garden>('Garden');

  const gardenQuery = useQuery({
    queryKey: ['garden', gardenIRI],
    queryFn: async () => {
      if (!gardenIRI) return null;
      // Since Graviola's 2026-09 releases, filterOne loads relations only on request.
      // All of them are needed: the map draws geoFeatures, and saving the garden
      // (e.g. after drawing a feature) writes the whole document back.
      return await loadDocumentAsync(gardenIRI, { include: GARDEN_RELATIONS });
    },
    enabled: Boolean(gardenIRI && ready),
    refetchOnWindowFocus: false,
  });

  return {
    garden: gardenQuery.data as Garden,
    isLoading: gardenQuery.isLoading,
    error: gardenQuery.error,
    refetch: gardenQuery.refetch,
  };
};


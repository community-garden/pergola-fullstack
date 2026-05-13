import { useQuery } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';
import { useCurrentGarden } from './useCurrentGarden';
import { Garden } from 'schema';

export const useCurrentGardenInfo = () => {
  const { gardenIRI } = useCurrentGarden();
  const { dataStore, ready } = useDataStore();

  const gardenQuery = useQuery({
    queryKey: ['garden', gardenIRI],
    queryFn: async () => {
      if (!gardenIRI || !ready) return null;
      const result = await dataStore.loadDocument('Garden', gardenIRI);
      return result;
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


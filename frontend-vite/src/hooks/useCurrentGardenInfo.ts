import { useQuery } from '@tanstack/react-query';
import { useDataStore, useTypedFilterStore } from '@graviola/edb-state-hooks';
import { useCurrentGarden } from './useCurrentGarden';
import { Garden } from 'schema';

export const useCurrentGardenInfo = () => {
  const { gardenIRI } = useCurrentGarden();
  const { ready } = useDataStore();
  const { loadDocumentAsync } = useTypedFilterStore<Garden>('Garden');

  const gardenQuery = useQuery({
    queryKey: ['garden', gardenIRI],
    queryFn: async () => {
      if (!gardenIRI) return null;
      return await loadDocumentAsync(gardenIRI);
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


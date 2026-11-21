import { useMutation } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';
import { useInvalidateEntityQueries } from './useInvalidateEntityQueries';

interface DeleteEntityOptions {
  typeIRI: string;
}

/**
 * Hook for deleting entities with a clean interface.
 * Just pass the typeIRI to the hook, get back a delete function.
 * Call delete function with entityIRI.
 */
export const useDeleteEntity = ({ typeIRI }: DeleteEntityOptions) => {
  const { dataStore, ready } = useDataStore();
  const invalidate = useInvalidateEntityQueries(typeIRI);

  return useMutation({
    mutationFn: async (entityIRI: string) => {
      if (!ready || !dataStore) throw new Error('DataStore not ready');
      const typeName = dataStore.typeIRItoTypeName(typeIRI);
      return await dataStore.remove(typeName, entityIRI);
    },
    onSuccess: () => invalidate(),
  });
};

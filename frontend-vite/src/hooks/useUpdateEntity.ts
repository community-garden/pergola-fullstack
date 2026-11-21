import { useMutation } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';
import { useInvalidateEntityQueries } from './useInvalidateEntityQueries';

interface UpdateEntityOptions {
  typeIRI: string;
}

/**
 * Hook for updating entities with a clean interface.
 * Just pass the typeIRI to the hook, get back an update function.
 * Call update function with entityIRI and data.
 *
 * `data` must be the whole document: an upsert replaces the entity's
 * properties, so fields that are left out are removed from the store.
 */
export const useUpdateEntity = ({ typeIRI }: UpdateEntityOptions) => {
  const { dataStore, ready } = useDataStore();
  const invalidate = useInvalidateEntityQueries(typeIRI);

  return useMutation({
    mutationFn: async ({ entityIRI, data }: { entityIRI: string; data: any }) => {
      if (!ready || !dataStore) throw new Error('DataStore not ready');
      const typeName = dataStore.typeIRItoTypeName(typeIRI);
      return await dataStore.upsert(typeName, entityIRI, {
        ...data,
        '@id': entityIRI,
        '@type': typeIRI,
      });
    },
    onSuccess: () => invalidate(),
  });
};

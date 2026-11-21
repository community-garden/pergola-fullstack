import { useMutation } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';
import { useInvalidateEntityQueries } from './useInvalidateEntityQueries';

interface CreateEntityOptions {
  typeIRI: string;
}

/**
 * Hook for creating entities.
 * Just pass the typeIRI to the hook, get back a create function.
 * Call create function with entityIRI and data.
 */
export const useCreateEntity = ({ typeIRI }: CreateEntityOptions) => {
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

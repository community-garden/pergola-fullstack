import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';

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
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async ({ entityIRI, data }: { entityIRI: string; data: any }) => {
      if (!ready) throw new Error('DataStore not ready');
      
      const typeName = dataStore.typeIRItoTypeName(typeIRI);
      
      // Ensure data has @id and @type
      const dataWithType = {
        ...data,
        '@id': entityIRI,
        '@type': typeIRI,
      };
      console.log('dataWithType', dataWithType);
      console.log('typeName', typeName);
      
      return await dataStore.upsert(typeName, entityIRI, dataWithType);
    },
    onSuccess: (result, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['entity', variables.entityIRI] });
      queryClient.invalidateQueries({ queryKey: ['type', typeIRI] });
    },
  });

  return createMutation;
};





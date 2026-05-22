import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';

interface UpdateEntityOptions {
  typeIRI: string;
}

/**
 * Hook for updating entities with a clean interface.
 * Just pass the typeIRI to the hook, get back an update function.
 * Call update function with entityIRI and data.
 */
export const useUpdateEntity = ({ typeIRI }: UpdateEntityOptions) => {
  const { dataStore, ready } = useDataStore();
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: async ({ entityIRI, data }: { entityIRI: string; data: any }) => {
      if (!ready) throw new Error('DataStore not ready');
      
      const typeName = dataStore.typeIRItoTypeName(typeIRI);
      
      // Ensure data has @id and @type
      const dataWithType = {
        ...data,
        '@id': entityIRI,
        '@type': typeIRI,
      };
      
      return await dataStore.upsert(typeName, entityIRI, dataWithType);
    },
    onSuccess: (result, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['entity', variables.entityIRI] });
      queryClient.invalidateQueries({ queryKey: ['type', typeIRI] });
    },
  });

  return updateMutation;
};





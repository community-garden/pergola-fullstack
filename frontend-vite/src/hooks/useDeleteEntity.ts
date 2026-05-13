import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDataStore } from '@graviola/edb-state-hooks';

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
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (entityIRI: string) => {
      if (!ready) throw new Error('DataStore not ready');
      
      const typeName = dataStore.typeIRItoTypeName(typeIRI);
      
      return await dataStore.removeDocument(typeName, entityIRI);
    },
    onSuccess: (result, entityIRI) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['entity', entityIRI] });
      queryClient.invalidateQueries({ queryKey: ['type', typeIRI] });
    },
  });

  return deleteMutation;
};





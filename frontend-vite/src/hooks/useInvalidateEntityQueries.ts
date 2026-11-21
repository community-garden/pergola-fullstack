import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { crudQueryKey, useQueryCacheScope } from '@graviola/edb-state-hooks';

/**
 * Invalidates every cached query that may show entities of `typeIRI`:
 * Graviola's CRUD caches (forms, detail views, tables), the typed filter
 * caches (`useTypedFilterStore`, `useAnyOfFilterStore`) and Pergola's
 * garden document (`useCurrentGardenInfo`), which embeds its geo features.
 */
export const useInvalidateEntityQueries = (typeIRI: string) => {
  const queryClient = useQueryClient();
  const scope = useQueryCacheScope();

  return useCallback(
    () =>
      Promise.all(
        [
          crudQueryKey(scope, 'entity', typeIRI),
          crudQueryKey(scope, 'type', typeIRI),
          ['typedDocument', typeIRI],
          ['typedDocuments', typeIRI],
          ['anyOfFilterStore'],
          ['garden'],
        ].map((queryKey) => queryClient.invalidateQueries({ queryKey })),
      ),
    [queryClient, scope, typeIRI],
  );
};

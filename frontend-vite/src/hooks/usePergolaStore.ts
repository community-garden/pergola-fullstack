import { useDataStore, type CrudDatastoreStore } from '@graviola/edb-state-hooks';
import type { PergolaRegistry } from '../schema/registry';

/**
 * Graviola's store, typed with Pergola's model: `filterMany` / `filterOne`
 * check `where`, `include` and `select` against the zod-inferred types.
 *
 * ```ts
 * const { store } = usePergolaStore();
 * await store?.filterMany('Planting', { where: { status: 'planned' }, include: { patch: true } });
 * ```
 */
export const usePergolaStore = () => {
  const { dataStore, ready } = useDataStore();
  return {
    store: dataStore as unknown as CrudDatastoreStore<PergolaRegistry> | undefined,
    ready,
  };
};

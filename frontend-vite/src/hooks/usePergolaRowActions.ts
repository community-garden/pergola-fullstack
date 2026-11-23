import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ComponentProps } from 'react';
import type { PergolaSemanticTable } from '@components/graviola/table/PergolaSemanticTable';
import type { EntityActionContext, EntityActionEntry } from '@graviola/edb-detail-renderer-core';
import { useDataStore } from '@graviola/edb-state-hooks';
import { usePlantingMutations } from './usePlantingMutations';
import { useEventMutations } from './useEventMutations';

type TableActionRegistry = NonNullable<ComponentProps<typeof PergolaSemanticTable>['actionRegistry']>;

const rowAction = (
  name: string,
  typeNames: string[],
  label: () => string,
  run: (entityIRI: string) => Promise<unknown>,
): EntityActionEntry => ({
  name,
  surfaces: ['tableRow'],
  // Below Graviola's Show (20) and Edit (15), above Delete (4).
  tester: (_schema, ctx: EntityActionContext) => (ctx.typeName && typeNames.includes(ctx.typeName) ? 10 : -1),
  build: (ctx) => {
    const target = ctx.targets[0];
    const entityIRI = target?.entityIRI;
    if (!entityIRI) return undefined;
    return {
      id: name,
      label: label(),
      intent: 'custom',
      run: async () => {
        await run(entityIRI);
      },
    };
  },
});

/**
 * Pergola's own entries in the row menu of Graviola tables (next to the
 * built-in Show / Edit / Delete):
 * - plant species and varieties: "Create planting" (prefilled with the plant)
 * - plantings: "Duplicate" (same bed, plant, period and amount)
 * - garden events: "Duplicate" (same title, time and place; pick a new day)
 *
 * Pass the result as `actionRegistry` to `<PergolaSemanticTable>`. The prop is typed
 * as the legacy TableActionRegistry, but SemanticTable 2.x reads it as
 * EntityActionEntry[] — hence the cast.
 */
export const usePergolaRowActions = (): TableActionRegistry => {
  const { t } = useTranslation('garden');
  const { createPlanting, duplicatePlanting } = usePlantingMutations();
  const { duplicateEvent } = useEventMutations();
  const { dataStore } = useDataStore();

  return useMemo(
    () =>
      [
        rowAction('pergola:create-planting-for-species', ['PlantSpecies'], () => t('tableActions.createPlanting'), (iri) =>
          createPlanting({ plantSpecies: { '@id': iri } }),
        ),
        rowAction('pergola:create-planting-for-variety', ['PlantVariety'], () => t('tableActions.createPlanting'), async (iri) => {
          // A variety belongs to a species; prefill both.
          const variety = (await dataStore?.loadOne('PlantVariety', iri)) as { species?: { '@id'?: string } } | null;
          const speciesIri = variety?.species?.['@id'];
          return createPlanting({
            plantVariety: { '@id': iri },
            ...(speciesIri ? { plantSpecies: { '@id': speciesIri } } : {}),
          });
        }),
        rowAction('pergola:duplicate-planting', ['Planting'], () => t('tableActions.duplicate'), (iri) =>
          duplicatePlanting(iri),
        ),
        rowAction('pergola:duplicate-event', ['GardenEvent'], () => t('tableActions.duplicate'), (iri) =>
          duplicateEvent(iri),
        ),
      ] as unknown as TableActionRegistry,
    [createPlanting, dataStore, duplicateEvent, duplicatePlanting, t],
  );
};

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAdbContext } from '@graviola/edb-state-hooks';
import {
  PLACEMENT_QUERY_KEY,
  PLANTING_TYPE_IRI,
  fetchPlacements,
  placementDoc,
} from '../api/bedPlan';
import { GARDEN_NS, SEASON_QUERY_KEY, type PatchInfo, type PlantInfo } from '../api/season';
import type { LocalPoint } from '../components/bed-planner/bedFrame';
import { defaultPlantingDates, movedPlacement } from '../components/bed-planner/placementOps';
import type { BedPlacement, BedPlanApi, PlacementFields } from '../components/bed-planner/types';
import { toReferences } from '../utils/toReferences';
import { usePergolaStore } from './usePergolaStore';

/** What `useSeasonData` caches under `SEASON_QUERY_KEY` (only the part this hook touches). */
type SeasonQueryData = { patches: PatchInfo[] };

/** A spacing field reports every valid keystroke; only the last value is written. */
const SPACING_DEBOUNCE_MS = 400;

/**
 * The bed plan on Graviola's store: implements `BedPlanApi` for the app, like
 * `useBedPlanState` does in memory for Storybook.
 *
 * Changes show up at once (the cached placements are updated first) and are
 * written one after the other, so a move never overtakes the placement it
 * moves. If a write fails the placements are read again from the store and
 * `error` is set.
 */
export const useBedPlanStore = (bedIri: string | undefined, season: number, plants: PlantInfo[]) => {
  const { store, ready } = usePergolaStore();
  const { createEntityIRI } = useAdbContext();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>();

  const query = useQuery({
    queryKey: PLACEMENT_QUERY_KEY,
    enabled: Boolean(ready && store),
    staleTime: 30_000,
    queryFn: () => fetchPlacements(store!),
  });

  const cached = useCallback(() => queryClient.getQueryData<BedPlacement[]>(PLACEMENT_QUERY_KEY) ?? [], [queryClient]);
  const change = useCallback(
    (update: (placements: BedPlacement[]) => BedPlacement[]) => {
      void queryClient.cancelQueries({ queryKey: PLACEMENT_QUERY_KEY });
      queryClient.setQueryData<BedPlacement[]>(PLACEMENT_QUERY_KEY, (old) => update(old ?? []));
    },
    [queryClient],
  );

  // ── writing: one at a time ─────────────────────────────────────────────────
  const chain = useRef<Promise<unknown>>(Promise.resolve());
  const open = useRef(0);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const cancelTimer = useCallback((iri: string) => {
    const timer = timers.current.get(iri);
    if (timer) clearTimeout(timer);
    timers.current.delete(iri);
  }, []);

  const settle = useCallback(() => {
    if (open.current === 0 && timers.current.size === 0) {
      void queryClient.invalidateQueries({ queryKey: PLACEMENT_QUERY_KEY });
    }
  }, [queryClient]);

  const enqueue = useCallback(
    (write: () => Promise<unknown>) => {
      open.current += 1;
      chain.current = chain.current
        .then(write)
        .catch((e: unknown) => {
          console.error('Bed plan: saving failed', e);
          setError(e instanceof Error ? e.message : String(e));
          void queryClient.invalidateQueries({ queryKey: PLACEMENT_QUERY_KEY });
        })
        .finally(() => {
          open.current -= 1;
          settle();
        });
    },
    [queryClient, settle],
  );

  /** Writes a placement as it is in the cache when its turn comes; keeps fields the planner does not know. */
  const persist = useCallback(
    (iri: string) =>
      enqueue(async () => {
        const placement = cached().find((p) => p.iri === iri);
        if (!placement || !store) return; // removed in the meantime
        const stored = (await store.loadOne('PlantPlacement', iri)) as Record<string, unknown> | null;
        await store.upsert('PlantPlacement', iri, placementDoc(placement, stored ? toReferences(stored) : {}) as never);
      }),
    [cached, enqueue, store],
  );

  const flush = useCallback(() => {
    for (const [iri, timer] of timers.current) {
      clearTimeout(timer);
      persist(iri);
    }
    timers.current.clear();
  }, [persist]);
  // leaving the page must not lose a spacing that was just typed
  const flushRef = useRef(flush);
  flushRef.current = flush;
  useEffect(() => () => flushRef.current(), []);

  // ── BedPlanApi ─────────────────────────────────────────────────────────────
  const api = useMemo<BedPlanApi>(
    () => ({
      addPlacement: (plantingIri: string, fields: PlacementFields) => {
        const iri = createEntityIRI('PlantPlacement');
        change((all) => [...all, { iri, plantingIri, ...fields }]);
        persist(iri);
      },

      movePlacement: (iri: string, to: LocalPoint) => {
        change((all) => all.map((p) => (p.iri === iri ? movedPlacement(p, to) : p)));
        persist(iri);
      },

      updatePlacement: (iri, patch) => {
        change((all) => all.map((p) => (p.iri === iri ? { ...p, ...patch } : p)));
        cancelTimer(iri);
        timers.current.set(
          iri,
          setTimeout(() => {
            timers.current.delete(iri);
            persist(iri);
          }, SPACING_DEBOUNCE_MS),
        );
      },

      removePlacement: (iri: string) => {
        cancelTimer(iri);
        change((all) => all.filter((p) => p.iri !== iri));
        enqueue(async () => {
          await store?.remove('PlantPlacement', iri);
        });
      },

      setRotation: (degrees: number | undefined) => {
        if (!bedIri) return;
        // the page reads the bed from the season data: show the new turn at once
        queryClient.setQueriesData<SeasonQueryData>({ queryKey: SEASON_QUERY_KEY }, (old) =>
          old && 'patches' in old
            ? { ...old, patches: old.patches.map((p) => (p.iri === bedIri ? { ...p, planRotation: degrees } : p)) }
            : old,
        );
        enqueue(async () => {
          const stored = (await store?.loadOne('Patch', bedIri)) as Record<string, unknown> | null;
          if (!stored || !store) return;
          const { planRotation: _old, ...rest } = toReferences(stored);
          await store.upsert('Patch', bedIri, {
            ...rest,
            '@id': bedIri,
            ...(degrees !== undefined && { planRotation: degrees }),
          } as never);
        });
      },

      addPlanting: async (plantIri: string) => {
        if (!store || !bedIri) throw new Error('DataStore not ready');
        const plant = plants.find((p) => p.iri === plantIri);
        const iri = createEntityIRI('Planting');
        const species = plant?.kind === 'variety' ? plant.speciesIri : plantIri;
        await store.upsert('Planting', iri, {
          '@id': iri,
          '@type': PLANTING_TYPE_IRI,
          role: 'main',
          status: 'planned',
          ...defaultPlantingDates(plant, season),
          patch: { '@id': bedIri, '@type': `${GARDEN_NS}Patch` },
          ...(species && { plantSpecies: { '@id': species, '@type': `${GARDEN_NS}PlantSpecies` } }),
          ...(plant?.kind === 'variety' && {
            plantVariety: { '@id': plantIri, '@type': `${GARDEN_NS}PlantVariety` },
          }),
        } as never);
        // wait until the list shows the new planting, so it can be chosen at once
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEY }),
          queryClient.invalidateQueries({ queryKey: ['anyOfFilterStore'] }),
        ]);
        return iri;
      },
    }),
    [bedIri, cancelTimer, change, createEntityIRI, enqueue, persist, plants, queryClient, season, store],
  );

  return {
    placements: query.data ?? EMPTY,
    api,
    isLoading: query.isLoading,
    error,
    clearError: () => setError(undefined),
  };
};

const EMPTY: BedPlacement[] = [];

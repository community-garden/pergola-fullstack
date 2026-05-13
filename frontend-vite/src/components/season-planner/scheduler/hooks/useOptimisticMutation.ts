import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash-es';
import type { SchedulerItem } from '../SchedulerTypes';

// ---------------------------------------------------------------------------
// Optimistic Mutation Pattern — "TanStack Query Optimistic UI with Server
// Reconciliation"
//
// Flow:
//   1. User drags / resizes  → immediate local state update (no debounce)
//   2. Gesture ends          → debounced persist fires (300 ms by default)
//   3. useMutation:
//        onMutate   → snapshot previous items[], apply optimistic state
//        onError    → rollback to snapshot
//        onSettled  → queryClient.invalidateQueries(queryKey)
//                     ↑ fetches server truth; reconciles backend snapping
//
// The debounce is applied only to the mutation trigger, so the drag UI is
// always instant. If the user drags again before the debounce fires, the
// previous debounced call is cancelled and restarted.
//
// `flush()` on unmount ensures no pending mutation is silently dropped.
// ---------------------------------------------------------------------------

export interface OptimisticMutationOptions<TItem> {
  /** Key(s) to invalidate after every mutation (success or error). */
  queryKey?: unknown[];
  /** Debounce delay in ms (default: 300) */
  debounceMs?: number;
  /** The async persist function — called with the updated item */
  persistFn: (item: SchedulerItem<TItem>) => Promise<void>;
  /** Local state setter — called immediately (optimistic) */
  setItems: React.Dispatch<React.SetStateAction<SchedulerItem<TItem>[]>>;
}

export function useOptimisticMutation<TItem = unknown>({
  queryKey = ['scheduler-items'],
  debounceMs = 300,
  persistFn,
  setItems,
}: OptimisticMutationOptions<TItem>) {
  const queryClient = useQueryClient();

  // Snapshot ref used for rollback — holds the state at the moment a mutation
  // was triggered (before the optimistic update).
  const snapshotRef = useRef<SchedulerItem<TItem>[] | null>(null);

  const mutation = useMutation<void, Error, SchedulerItem<TItem>>({
    mutationFn: persistFn,

    onMutate: async (newItem) => {
      // Cancel any in-flight queries to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Capture snapshot for rollback
      setItems((prev) => {
        snapshotRef.current = prev;
        return prev.map((i) => (i.id === newItem.id ? newItem : i));
      });
    },

    onError: () => {
      // Rollback to pre-mutation state
      if (snapshotRef.current) {
        setItems(snapshotRef.current);
        snapshotRef.current = null;
      }
    },

    onSettled: () => {
      // Always re-fetch to reconcile server truth (handles backend snapping /
      // partial updates / unexpected rejections).
      queryClient.invalidateQueries({ queryKey });
      snapshotRef.current = null;
    },
  });

  // Debounced trigger — cancels previous call if user is still dragging
  const debouncedMutate = useMemo(
    () =>
      debounce((item: SchedulerItem<TItem>) => {
        mutation.mutate(item);
      }, debounceMs),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debounceMs],
  );

  // Flush pending debounce on unmount so no mutation is silently lost
  useEffect(() => {
    return () => {
      debouncedMutate.flush();
    };
  }, [debouncedMutate]);

  /**
   * Call this immediately when the user *finishes* a gesture (drag end,
   * resize end). It updates local state optimistically and schedules the
   * debounced persist.
   */
  const commitItem = useCallback(
    (item: SchedulerItem<TItem>) => {
      // Immediate local update (optimistic)
      setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
      // Debounced server persist
      debouncedMutate(item);
    },
    [setItems, debouncedMutate],
  );

  return { commitItem, isPending: mutation.isPending, isError: mutation.isError };
}

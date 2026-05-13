import { useState, useCallback } from 'react';
import type {
  SchedulerItem,
  SchedulerResource,
  UseSchedulerOptions,
  UseSchedulerReturn,
  LeftPanelMode,
} from './SchedulerTypes';

/**
 * Default state management hook for the Scheduler component.
 *
 * Can be used directly or replaced with a custom hook (e.g. one that wires
 * up Redux / Zustand / TanStack Query) and passed via `schedulerState` prop.
 *
 * All motion MotionValue refs live *inside* the Scheduler component tree
 * (not here) so that gesture updates never cause React re-renders.
 */
export function useScheduler<TItem = unknown, TResource = unknown>(
  options: UseSchedulerOptions<TItem, TResource> = {},
): UseSchedulerReturn<TItem, TResource> {
  const {
    initialItems = [],
    initialResources = [],
    initialZoom = 1,
    initialScrollX = 0,
    initialPanelMode = 'full',
  } = options;

  const [items, setItems] = useState<SchedulerItem<TItem>[]>(initialItems);
  const [resources, setResources] =
    useState<SchedulerResource<TResource>[]>(initialResources);
  const [zoom, setZoom] = useState<number>(initialZoom);
  const [scrollX, setScrollX] = useState<number>(initialScrollX);
  const [expandedResourceIds, setExpandedResourceIds] = useState<Set<string>>(
    () => new Set<string>(),
  );
  const [panelMode, setPanelMode] = useState<LeftPanelMode>(initialPanelMode);

  const toggleResource = useCallback((id: string) => {
    setExpandedResourceIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return {
    items,
    resources,
    setItems,
    setResources,
    zoom,
    setZoom,
    scrollX,
    setScrollX,
    expandedResourceIds,
    toggleResource,
    panelMode,
    setPanelMode,
  };
}

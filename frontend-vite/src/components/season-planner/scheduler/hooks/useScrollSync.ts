import { useRef, useCallback } from 'react';

/**
 * Keeps two scroll containers in sync on the Y axis.
 *
 * Returns refs to attach to the left panel rows container and the grid body.
 * When either one scrolls, the other is updated to match.
 */
export function useScrollSync() {
  const leftRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  // Guard against recursive scroll events
  const syncingRef = useRef(false);

  const onLeftScroll = useCallback(() => {
    if (syncingRef.current) return;
    syncingRef.current = true;
    if (gridRef.current && leftRef.current) {
      gridRef.current.scrollTop = leftRef.current.scrollTop;
    }
    syncingRef.current = false;
  }, []);

  const onGridScroll = useCallback(() => {
    if (syncingRef.current) return;
    syncingRef.current = true;
    if (leftRef.current && gridRef.current) {
      leftRef.current.scrollTop = gridRef.current.scrollTop;
    }
    syncingRef.current = false;
  }, []);

  return { leftRef, gridRef, onLeftScroll, onGridScroll };
}

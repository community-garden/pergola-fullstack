import { useMemo } from 'react';

export interface VirtualizedRange {
  startIndex: number;
  endIndex: number;
  /** Pixel offset for the first rendered cell (translate-x value) */
  offsetLeft: number;
}

/**
 * Compute which cell indices are visible in the current scroll viewport,
 * padded by `overscan` cells on each side.
 *
 * Designed to be called in a render path — returns a stable object reference
 * when the inputs haven't changed (via useMemo).
 */
export function useVirtualizedRange({
  scrollX,
  containerWidth,
  effectiveCellWidth,
  totalCells,
  overscan = 5,
}: {
  scrollX: number;
  containerWidth: number;
  effectiveCellWidth: number;
  totalCells: number;
  overscan?: number;
}): VirtualizedRange {
  return useMemo(() => {
    if (effectiveCellWidth <= 0 || totalCells <= 0) {
      return { startIndex: 0, endIndex: 0, offsetLeft: 0 };
    }

    const rawStart = Math.floor(scrollX / effectiveCellWidth);
    const rawEnd = Math.ceil((scrollX + containerWidth) / effectiveCellWidth);

    const startIndex = Math.max(0, rawStart - overscan);
    const endIndex = Math.min(totalCells - 1, rawEnd + overscan);
    const offsetLeft = startIndex * effectiveCellWidth;

    return { startIndex, endIndex, offsetLeft };
  }, [scrollX, containerWidth, effectiveCellWidth, totalCells, overscan]);
}

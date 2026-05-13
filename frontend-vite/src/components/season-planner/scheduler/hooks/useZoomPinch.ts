import { useCallback, useRef } from 'react';
import { usePinch, useWheel } from '@use-gesture/react';
import { clamp } from '../scheduleUtils';

const MIN_ZOOM = 0.2;
const MAX_ZOOM = 10;

interface UseZoomPinchOptions {
  zoom: number;
  setZoom: (z: number) => void;
  /** Element to attach gestures to */
  targetRef: React.RefObject<HTMLElement | null>;
}

/**
 * Attaches pinch and mouse-wheel zoom gestures to `targetRef`.
 * Horizontal-only (the scheduler doesn't support vertical zoom by default).
 *
 * Uses `@use-gesture/react` for gesture detection and updates the zoom
 * value in the scheduler state hook.
 */
export function useZoomPinch({ zoom, setZoom, targetRef }: UseZoomPinchOptions) {
  // Store origin zoom at gesture start to avoid drift
  const originZoomRef = useRef(zoom);

  const applyZoom = useCallback(
    (newZoom: number) => {
      setZoom(clamp(newZoom, MIN_ZOOM, MAX_ZOOM));
    },
    [setZoom],
  );

  // Pinch gesture (touch devices)
  usePinch(
    ({ first, offset: [scale] }) => {
      if (first) originZoomRef.current = zoom;
      applyZoom(originZoomRef.current * scale);
    },
    {
      target: targetRef,
      eventOptions: { passive: false },
    },
  );

  // Mouse-wheel zoom (ctrl+wheel or trackpad pinch-as-wheel)
  useWheel(
    ({ event, delta: [, dy] }) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();
      const factor = dy > 0 ? 0.95 : 1.05;
      applyZoom(clamp(zoom * factor, MIN_ZOOM, MAX_ZOOM));
    },
    {
      target: targetRef,
      eventOptions: { passive: false },
    },
  );
}

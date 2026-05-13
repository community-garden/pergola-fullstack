import type { SchedulerItem, LaneInfo } from './SchedulerTypes';

// ---------------------------------------------------------------------------
// Coordinate conversion
// ---------------------------------------------------------------------------

/**
 * Convert a timeline unit offset (relative to baseUnit) to a pixel position.
 * @param unit        Absolute timeline unit value
 * @param baseUnit    The unit at the left edge of the viewport (pixel 0)
 * @param cellWidth   Width in px of one "base unit step" at zoom 1
 * @param unitsPerCell How many logical units fit in one cell (e.g. 1 day = 86_400_000 ms)
 * @param zoom        Current zoom multiplier (1 = 100 %)
 */
export function toPixels(
  unit: number,
  baseUnit: number,
  cellWidth: number,
  unitsPerCell: number,
  zoom: number,
): number {
  return ((unit - baseUnit) / unitsPerCell) * cellWidth * zoom;
}

/**
 * Convert a pixel offset (from the left edge of the grid) back to a timeline unit.
 */
export function toUnit(
  pixels: number,
  baseUnit: number,
  cellWidth: number,
  unitsPerCell: number,
  zoom: number,
): number {
  return baseUnit + (pixels / (cellWidth * zoom)) * unitsPerCell;
}

// ---------------------------------------------------------------------------
// Snapping
// ---------------------------------------------------------------------------

/**
 * Snap a unit value to the nearest multiple of `step`.
 */
export function snapToStep(unit: number, step: number): number {
  if (step <= 0) return unit;
  return Math.round(unit / step) * step;
}

/**
 * Snap `unit` to the nearest item edge (start or end) within `threshold` units.
 * Returns the original value unchanged when nothing is within range.
 */
export function snapToNearestItem<T>(
  unit: number,
  items: SchedulerItem<T>[],
  threshold: number,
): number {
  let best = unit;
  let bestDist = threshold;
  for (const item of items) {
    const ds = Math.abs(item.start - unit);
    const de = Math.abs(item.end - unit);
    if (ds < bestDist) { bestDist = ds; best = item.start; }
    if (de < bestDist) { bestDist = de; best = item.end; }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Viewport virtualization
// ---------------------------------------------------------------------------

export interface VisibleRange {
  startIndex: number;
  endIndex: number;
}

/**
 * Given the current scroll position and container width, compute the first
 * and last cell indices that should be rendered (with overscan).
 */
export function getVisibleRange(
  scrollX: number,
  containerWidth: number,
  effectiveCellWidth: number,
  totalCells: number,
  overscan = 5,
): VisibleRange {
  const startIndex = Math.max(
    0,
    Math.floor(scrollX / effectiveCellWidth) - overscan,
  );
  const endIndex = Math.min(
    totalCells - 1,
    Math.ceil((scrollX + containerWidth) / effectiveCellWidth) + overscan,
  );
  return { startIndex, endIndex };
}

// ---------------------------------------------------------------------------
// Multi-lane layout  (greedy interval graph coloring)
// ---------------------------------------------------------------------------

/**
 * Assign lane indices to all items within a single resource row so that
 * overlapping items are placed on different lanes.
 *
 * Returns a Map from item.id → LaneInfo.
 * `totalLanes` is populated in a second pass so every item in a group knows
 * the maximum depth of its overlapping cluster.
 */
export function assignLanes<T>(
  items: SchedulerItem<T>[],
): Map<string, LaneInfo> {
  // Sort by start, then by duration descending (wider items get lower lanes)
  const sorted = [...items].sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return (b.end - b.start) - (a.end - a.start);
  });

  // Each lane tracks the furthest end seen so far
  const laneEnds: number[] = [];
  const assignment = new Map<string, LaneInfo>();

  for (const item of sorted) {
    // Find first lane that is free at item.start
    let lane = laneEnds.findIndex((end) => end <= item.start);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(item.end);
    } else {
      laneEnds[lane] = Math.max(laneEnds[lane], item.end);
    }
    assignment.set(item.id, { laneIndex: lane, totalLanes: -1 }); // totalLanes filled below
  }

  const totalLanes = laneEnds.length;

  // Second pass: set totalLanes for every item
  for (const [id, info] of assignment) {
    assignment.set(id, { ...info, totalLanes });
  }

  return assignment;
}

/**
 * Group items by resourceId, run assignLanes on each group, then merge the
 * results into a single flat Map.
 */
export function assignAllLanes<T>(
  items: SchedulerItem<T>[],
): Map<string, LaneInfo> {
  const byResource = new Map<string, SchedulerItem<T>[]>();
  for (const item of items) {
    const bucket = byResource.get(item.resourceId) ?? [];
    bucket.push(item);
    byResource.set(item.resourceId, bucket);
  }

  const result = new Map<string, LaneInfo>();
  for (const group of byResource.values()) {
    for (const [id, info] of assignLanes(group)) {
      result.set(id, info);
    }
  }
  return result;
}

/**
 * Build a Map from resourceId → total lane count.
 */
export function buildResourceLaneCount<T>(
  items: SchedulerItem<T>[],
  laneMap: Map<string, LaneInfo>,
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    const info = laneMap.get(item.id);
    if (!info) continue;
    const existing = counts.get(item.resourceId) ?? 0;
    if (info.totalLanes > existing) counts.set(item.resourceId, info.totalLanes);
  }
  return counts;
}

// ---------------------------------------------------------------------------
// Flat resource list (tree expansion)
// ---------------------------------------------------------------------------

import type { SchedulerResource } from './SchedulerTypes';

/**
 * Flatten a (possibly nested) resource tree into a display-ordered list,
 * respecting the set of expanded node IDs.
 */
export function flattenResources<T>(
  resources: SchedulerResource<T>[],
  expandedIds: Set<string>,
  depth = 0,
): Array<SchedulerResource<T> & { depth: number }> {
  const result: Array<SchedulerResource<T> & { depth: number }> = [];
  for (const resource of resources) {
    result.push({ ...resource, depth });
    if (resource.children?.length && expandedIds.has(resource.id)) {
      result.push(...flattenResources(resource.children, expandedIds, depth + 1));
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Clamp helpers
// ---------------------------------------------------------------------------

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

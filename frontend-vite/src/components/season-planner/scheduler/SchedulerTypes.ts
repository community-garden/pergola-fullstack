import type React from 'react';

// ---------------------------------------------------------------------------
// Core data model
// All timeline positions are plain numbers internally.
// For dates: milliseconds since epoch. For stages: arbitrary index. Etc.
// ---------------------------------------------------------------------------

export interface SchedulerItem<TData = unknown> {
  /** @id IRI or any unique string */
  id: string;
  /** Which resource (row) this item belongs to */
  resourceId: string;
  /** Timeline start (numeric units) */
  start: number;
  /** Timeline end (numeric units) */
  end: number;
  label?: string;
  color?: string;
  /** 'outlined' renders a pale, dashed bar (e.g. tentative / not yet confirmed items) */
  variant?: 'solid' | 'outlined';
  /** Native tooltip shown on hover */
  tooltip?: string;
  /** Drawn with a strong outline (e.g. the item an open side panel is about) */
  selected?: boolean;
  /**
   * Optional sub-ranges drawn as a thin strip at the bottom of the bar
   * (e.g. phases). Ranges are in timeline units and clipped to the item.
   */
  segments?: SchedulerItemSegment[];
  /** Arbitrary application data — carried through all callbacks unchanged */
  data?: TData;
  /** Per-item override; falls back to SchedulerProps.canMoveItems */
  canMove?: boolean;
  /** Per-item override; falls back to SchedulerProps.canResizeItems */
  canResize?: boolean;
}

export interface SchedulerItemSegment {
  start: number;
  end: number;
  color: string;
  label?: string;
}

export interface SchedulerResource<TData = unknown> {
  /** @id IRI or any unique string */
  id: string;
  label: string;
  description?: string;
  /** ReactNode (e.g. MUI icon element), UTF-8 char string, or undefined */
  icon?: React.ReactNode;
  /** For tree-structured resource lists */
  children?: SchedulerResource<TData>[];
  /** Arbitrary application data — carried through all callbacks unchanged */
  data?: TData;
}

// ---------------------------------------------------------------------------
// Timeline header configuration
// ---------------------------------------------------------------------------

export interface TimelineUnit {
  start: number;
  end: number;
}

/**
 * Configures one row in the multi-row timeline header.
 * The scheduler is timeline-agnostic: pass date configs, stage configs,
 * timecode configs, or anything custom.
 */
export interface TimelineHeaderConfig {
  key: string;
  /** Row height in px; defaults to 28 */
  height?: number;
  /**
   * Return every unit-range whose interval intersects [rangeStart, rangeEnd].
   * The scheduler calls this only for the visible viewport (+ overscan).
   *
   * `effectiveCellWidth` (pixels per base logical unit at current zoom) is
   * passed so configs can automatically coarsen their granularity when cells
   * become too narrow to display.  Configs that don't need this can ignore it.
   */
  getUnitsInRange(
    rangeStart: number,
    rangeEnd: number,
    effectiveCellWidth?: number,
  ): TimelineUnit[];
  /** Render the cell for a single unit-range */
  renderCell(unit: TimelineUnit, index: number): React.ReactNode;
}

// ---------------------------------------------------------------------------
// Left panel modes
// ---------------------------------------------------------------------------

export type LeftPanelMode = 'full' | 'medium' | 'minimal';

// ---------------------------------------------------------------------------
// Scheduler state hook types
// ---------------------------------------------------------------------------

export interface UseSchedulerOptions<
  TItem = unknown,
  TResource = unknown,
> {
  initialItems?: SchedulerItem<TItem>[];
  initialResources?: SchedulerResource<TResource>[];
  /** Zoom multiplier: 1 = 100 %, 2 = 200 %, etc. */
  initialZoom?: number;
  /** Initial horizontal scroll in pixels */
  initialScrollX?: number;
  initialPanelMode?: LeftPanelMode;
}

export interface UseSchedulerReturn<
  TItem = unknown,
  TResource = unknown,
> {
  items: SchedulerItem<TItem>[];
  resources: SchedulerResource<TResource>[];
  setItems: React.Dispatch<React.SetStateAction<SchedulerItem<TItem>[]>>;
  setResources: React.Dispatch<
    React.SetStateAction<SchedulerResource<TResource>[]>
  >;
  zoom: number;
  setZoom: (z: number) => void;
  scrollX: number;
  setScrollX: (x: number) => void;
  /** IDs of tree nodes that are currently expanded */
  expandedResourceIds: Set<string>;
  toggleResource: (id: string) => void;
  panelMode: LeftPanelMode;
  setPanelMode: (m: LeftPanelMode) => void;
}

// ---------------------------------------------------------------------------
// Lane assignment (output of scheduleUtils.assignLanes)
// ---------------------------------------------------------------------------

export interface LaneInfo {
  laneIndex: number;
  /** Total lanes in this resource row at this moment */
  totalLanes: number;
}

// ---------------------------------------------------------------------------
// Main Scheduler component props
// ---------------------------------------------------------------------------

export interface SchedulerProps<TItem = unknown, TResource = unknown> {
  // ── Data ──────────────────────────────────────────────────────────────────
  resources: SchedulerResource<TResource>[];
  items: SchedulerItem<TItem>[];

  // ── Timeline ──────────────────────────────────────────────────────────────
  /** Left boundary; omit for infinite scroll */
  timelineStart?: number;
  /** Right boundary; omit for infinite scroll */
  timelineEnd?: number;
  /**
   * Header rows rendered top-to-bottom. Defaults to a year / month / day
   * date config when omitted.
   */
  timelineHeaderRows?: TimelineHeaderConfig[];
  /** Base cell width in px at zoom = 1 (default: 40) */
  cellWidth?: number;
  /** Timeline unit to scroll into view on first render */
  initialScrollTo?: number;

  // ── State injection ───────────────────────────────────────────────────────
  /**
   * Provide a custom hook result to share state across multiple scheduler
   * instances or to wire up Redux / Zustand externally.
   * Omit to use the built-in `useScheduler` hook.
   */
  schedulerState?: UseSchedulerReturn<TItem, TResource>;

  // ── Interactions ──────────────────────────────────────────────────────────
  /** Allow creating new items by clicking/tapping empty space (default: false) */
  canCreateItems?: boolean;
  /** Allow dragging items to move them (default: true) */
  canMoveItems?: boolean;
  /** Allow dragging item edges to resize (default: true) */
  canResizeItems?: boolean;
  /**
   * Snap dragged values to multiples of this unit.
   * For date-based timelines, e.g. pass `86_400_000` (one day in ms).
   */
  snapStep?: number;
  /** In addition to step snapping, also snap to edges of other items */
  snapToItems?: boolean;

  // ── Row sizing ────────────────────────────────────────────────────────────
  /** Height of a single lane within a resource row (default: 40) */
  rowHeight?: number;

  // ── Rendering overrides ───────────────────────────────────────────────────
  /** Custom item renderer; receives item, resource, laneIndex */
  renderItem?: (
    item: SchedulerItem<TItem>,
    resource: SchedulerResource<TResource>,
    laneIndex: number,
  ) => React.ReactNode;
  /** Custom resource row renderer in the left panel */
  renderResource?: (resource: SchedulerResource<TResource>) => React.ReactNode;

  // ── Left panel ────────────────────────────────────────────────────────────
  /** Width of the left panel in px (default: 220) */
  leftPanelWidth?: number;
  /** Show the collapse/expand toggle (default: true) */
  leftPanelCollapsible?: boolean;
  /** Initial display density (default: 'full') */
  leftPanelDefaultMode?: LeftPanelMode;
  /** Optional content rendered in the left panel header area */
  leftPanelHeader?: React.ReactNode;
  /** Small controls (e.g. the edit-mode toggle) shown beside the collapse button. */
  leftPanelActions?: React.ReactNode;

  // ── Callbacks ────────────────────────────────────────────────────────────
  /** Called when user clicks/taps empty space and canCreateItems is true */
  onItemCreate?: (
    resourceId: string,
    start: number,
    end: number,
  ) => void;
  /**
   * Called after a move gesture ends. Return a Promise to trigger the
   * optimistic mutation pattern (rollback on rejection).
   */
  onItemMove?: (
    item: SchedulerItem<TItem>,
    newResourceId: string,
    newStart: number,
    newEnd: number,
  ) => Promise<void> | void;
  /**
   * Called after a resize gesture ends.
   */
  onItemResize?: (
    item: SchedulerItem<TItem>,
    newStart: number,
    newEnd: number,
  ) => Promise<void> | void;
  /** Called on item click/tap (no drag) */
  onItemClick?: (item: SchedulerItem<TItem>) => void;
}

// ---------------------------------------------------------------------------
// Internal context shared between sub-components
// ---------------------------------------------------------------------------

export interface SchedulerContextValue<TItem = unknown, TResource = unknown> {
  state: UseSchedulerReturn<TItem, TResource>;
  props: SchedulerProps<TItem, TResource>;
  /** Effective cell width = cellWidth * zoom */
  effectiveCellWidth: number;
  /** The timeline unit that corresponds to pixel 0 (left edge of grid) */
  baseUnit: number;
  /** Flat, ordered list of visible resources (tree nodes, expanded) */
  flatResources: SchedulerResource<TResource>[];
  /** Lane assignments keyed by item id */
  laneMap: Map<string, LaneInfo>;
  /** Total lanes per resource id */
  resourceLaneCount: Map<string, number>;
}

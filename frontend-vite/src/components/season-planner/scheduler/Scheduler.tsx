import React, { useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';
import { useScheduler } from './useScheduler';
import { LeftPanel } from './panels/LeftPanel';
import { SchedulerGrid } from './grid/SchedulerGrid';
import { assignAllLanes, buildResourceLaneCount, flattenResources } from './scheduleUtils';
import { createDateConfig, ONE_DAY_MS } from './timeline/defaultTimelineConfigs';
import { useScrollSync } from './hooks/useScrollSync';
import { useDateFnsLocale } from '../../../hooks';
import type { SchedulerProps } from './SchedulerTypes';

// Default units-per-cell: 1 day in ms (used for date-based timelines)
const DEFAULT_UNITS_PER_CELL = ONE_DAY_MS;
const DEFAULT_CELL_WIDTH = 40;
const DEFAULT_ROW_HEIGHT = 40;
const DEFAULT_LEFT_PANEL_WIDTH = 220;

/**
 * `Scheduler` — the main public component.
 *
 * Sensible defaults for everything; override only what you need.
 *
 * @example
 * <Scheduler
 *   resources={myResources}
 *   items={myItems}
 *   canMoveItems
 *   canResizeItems
 *   canCreateItems
 *   snapStep={ONE_DAY_MS}
 *   onItemMove={(item, _, start, end) => persistMove(item.id, start, end)}
 * />
 */
export function Scheduler<TItem = unknown, TResource = unknown>(
  props: SchedulerProps<TItem, TResource>,
) {
  const {
    resources: resourcesProp,
    items: itemsProp,
    schedulerState: externalState,
    timelineStart,
    timelineEnd,
    timelineHeaderRows,
    cellWidth = DEFAULT_CELL_WIDTH,
    rowHeight = DEFAULT_ROW_HEIGHT,
    leftPanelWidth = DEFAULT_LEFT_PANEL_WIDTH,
    leftPanelCollapsible = true,
    leftPanelDefaultMode = 'full',
    leftPanelHeader,
    leftPanelActions,
    renderResource,
    initialScrollTo,
  } = props;

  // ── State ────────────────────────────────────────────────────────────────
  const internalState = useScheduler<TItem, TResource>({
    initialItems: itemsProp,
    initialResources: resourcesProp,
    initialPanelMode: leftPanelDefaultMode,
    initialScrollX: 0,
    initialZoom: 1,
  });

  const state = externalState ?? internalState;

  // Sync external items/resources into internal state when props change
  // (only needed when NOT using externalState)
  React.useEffect(() => {
    if (!externalState) {
      internalState.setItems(itemsProp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsProp]);

  React.useEffect(() => {
    if (!externalState) {
      internalState.setResources(resourcesProp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourcesProp]);

  const { items, resources, zoom, scrollX, setScrollX, expandedResourceIds } = state;
  const locale = useDateFnsLocale();

  // ── Timeline config ───────────────────────────────────────────────────────
  const headerConfigs = useMemo(
    () => timelineHeaderRows ?? createDateConfig('day', locale),
    [timelineHeaderRows, locale],
  );

  // Determine the number of logical units per rendered cell.
  // For date timelines: 1 day. For stages/custom: 1 unit.
  // Convention: if the first item's start value looks like an epoch (> 10^10),
  // use ONE_DAY_MS; otherwise use 1.
  const unitsPerCell = useMemo(() => {
    const firstItem = items[0];
    if (!firstItem) return DEFAULT_UNITS_PER_CELL;
    return firstItem.start > 1e10 ? ONE_DAY_MS : 1;
  }, [items]);

  // Determine the logical start of the timeline (left edge = pixel 0)
  const baseUnit = useMemo(() => {
    if (timelineStart !== undefined) return timelineStart;
    if (initialScrollTo !== undefined) return initialScrollTo;
    // Default: start at the earliest item, or today for date timelines
    if (items.length > 0) {
      const earliest = Math.min(...items.map((i) => i.start));
      // Round down to nearest cell
      return Math.floor(earliest / unitsPerCell) * unitsPerCell;
    }
    return unitsPerCell > 1000 ? Date.now() : 0;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineStart, initialScrollTo, unitsPerCell]);

  // Total cells to render (cap at reasonable max for perf)
  const totalCells = useMemo(() => {
    if (timelineStart !== undefined && timelineEnd !== undefined) {
      return Math.ceil((timelineEnd - timelineStart) / unitsPerCell);
    }
    return 3650; // ~10 years of days as a safe infinite-scroll default
  }, [timelineStart, timelineEnd, unitsPerCell]);

  // ── Layout ────────────────────────────────────────────────────────────────
  const flatResources = useMemo(
    () => flattenResources(resources, expandedResourceIds),
    [resources, expandedResourceIds],
  );

  const laneMap = useMemo(() => assignAllLanes(items), [items]);
  const resourceLaneCount = useMemo(
    () => buildResourceLaneCount(items, laneMap),
    [items, laneMap],
  );

  const headerHeight = useMemo(
    () => headerConfigs.reduce((h, c) => h + (c.height ?? 28), 0),
    [headerConfigs],
  );

  // ── Container dimensions ─────────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(800);
  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Scroll sync ────────────────────────────────────────────────────────────
  const { leftRef, gridRef, onLeftScroll, onGridScroll } = useScrollSync();

  const handleScrollX = useCallback(
    (x: number) => setScrollX(x),
    [setScrollX],
  );

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        bgcolor: 'background.default',
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        fontFamily: 'inherit',
      }}
    >
      {/* Left resource panel */}
      <LeftPanel
        resources={flatResources as Array<typeof flatResources[number]>}
        state={state as typeof internalState}
        leftPanelWidth={leftPanelWidth}
        leftPanelHeader={leftPanelHeader}
        leftPanelActions={leftPanelActions}
        leftPanelCollapsible={leftPanelCollapsible}
        rowHeight={rowHeight}
        resourceLaneCount={resourceLaneCount}
        renderResource={renderResource as (r: unknown) => React.ReactNode}
        headerHeight={headerHeight}
        scrollRef={leftRef}
        onScroll={onLeftScroll}
      />

      {/* Main scheduling grid */}
      <SchedulerGrid
        flatResources={flatResources}
        items={items}
        laneMap={laneMap}
        resourceLaneCount={resourceLaneCount}
        state={state}
        props={props}
        headerConfigs={headerConfigs}
        baseUnit={baseUnit}
        unitsPerCell={unitsPerCell}
        totalCells={totalCells}
        rowHeight={rowHeight}
        containerWidth={containerWidth}
        scrollRef={gridRef}
        onScroll={onGridScroll}
        onScrollX={handleScrollX}
      />
    </Box>
  );
}

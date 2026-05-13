import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { SchedulerBackground } from './SchedulerBackground';
import { SchedulerRow } from './SchedulerRow';
import { TimelineHeader } from '../timeline/TimelineHeader';
import { useVirtualizedRange } from '../hooks/useVirtualizedRange';
import { useZoomPinch } from '../hooks/useZoomPinch';
import type {
  SchedulerItem,
  SchedulerResource,
  LaneInfo,
  SchedulerProps,
  UseSchedulerReturn,
  TimelineHeaderConfig,
} from '../SchedulerTypes';

interface SchedulerGridProps<TItem = unknown, TResource = unknown> {
  flatResources: Array<SchedulerResource<TResource> & { depth: number }>;
  items: SchedulerItem<TItem>[];
  laneMap: Map<string, LaneInfo>;
  resourceLaneCount: Map<string, number>;
  state: UseSchedulerReturn<TItem, TResource>;
  props: SchedulerProps<TItem, TResource>;
  headerConfigs: TimelineHeaderConfig[];
  baseUnit: number;
  unitsPerCell: number;
  totalCells: number;
  rowHeight: number;
  containerWidth: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: () => void;
  onScrollX: (x: number) => void;
}

export function SchedulerGrid<TItem = unknown, TResource = unknown>({
  flatResources,
  items,
  laneMap,
  resourceLaneCount,
  state,
  props,
  headerConfigs,
  baseUnit,
  unitsPerCell,
  totalCells,
  rowHeight,
  containerWidth,
  scrollRef,
  onScroll,
  onScrollX,
}: SchedulerGridProps<TItem, TResource>) {
  const { zoom, scrollX, setZoom } = state;
  const {
    cellWidth = 40,
    canCreateItems = false,
    canMoveItems = true,
    canResizeItems = true,
    snapStep,
    snapToItems,
    renderItem,
    onItemMove,
    onItemResize,
    onItemClick,
    onItemCreate,
    timelineStart,
    timelineEnd,
  } = props;

  const effectiveCellWidth = cellWidth * zoom;
  const totalWidth = totalCells * effectiveCellWidth;

  const { startIndex, endIndex, offsetLeft } = useVirtualizedRange({
    scrollX,
    containerWidth,
    effectiveCellWidth,
    totalCells,
  });

  const totalGridHeight = flatResources.reduce((h, r) => {
    const lanes = resourceLaneCount.get(r.id) ?? 1;
    return h + rowHeight * Math.max(1, lanes);
  }, 0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useZoomPinch({ zoom, setZoom, targetRef: wrapperRef });

  const headerHeight = headerConfigs.reduce((h, c) => h + (c.height ?? 28), 0);

  return (
    <Box
      ref={wrapperRef}
      sx={{
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Horizontally scrollable wrapper */}
      <Box
        ref={scrollRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          onScrollX(el.scrollLeft);
          onScroll();
        }}
        sx={{
          flex: 1,
          overflowX: 'auto',
          overflowY: 'auto',
          position: 'relative',
          // Custom scrollbar styling
          '&::-webkit-scrollbar': { height: 8, width: 8 },
          '&::-webkit-scrollbar-track': { bgcolor: 'action.hover' },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: 'divider',
            borderRadius: 4,
          },
        }}
      >
        {/* Inner container sized to the full timeline width */}
        <Box sx={{ width: totalWidth, minHeight: '100%', position: 'relative' }}>
          {/* Sticky timeline header */}
          <TimelineHeader
            configs={headerConfigs}
            scrollX={scrollX}
            containerWidth={containerWidth}
            baseUnit={baseUnit}
            unitsPerCell={unitsPerCell}
            cellWidth={cellWidth}
            zoom={zoom}
            totalWidth={totalWidth}
            timelineStart={timelineStart}
            timelineEnd={timelineEnd}
          />

          {/* Grid body */}
          <Box
            sx={{
              position: 'relative',
              width: totalWidth,
              height: totalGridHeight,
            }}
          >
            {/* Background gridlines */}
            <SchedulerBackground
              startIndex={startIndex}
              endIndex={endIndex}
              effectiveCellWidth={effectiveCellWidth}
              offsetLeft={offsetLeft}
              totalHeight={totalGridHeight}
              totalWidth={totalWidth}
            />

            {/* Resource rows */}
            {flatResources.map((resource) => {
              const rowItems = items.filter((it) => it.resourceId === resource.id);
              return (
                <SchedulerRow
                  key={resource.id}
                  resource={resource}
                  items={rowItems}
                  laneMap={laneMap}
                  laneCount={resourceLaneCount.get(resource.id) ?? 1}
                  rowHeight={rowHeight}
                  baseUnit={baseUnit}
                  unitsPerCell={unitsPerCell}
                  cellWidth={cellWidth}
                  zoom={zoom}
                  scrollX={scrollX}
                  containerWidth={containerWidth}
                  totalWidth={totalWidth}
                  canMoveItems={canMoveItems}
                  canResizeItems={canResizeItems}
                  canCreateItems={canCreateItems}
                  snapStep={snapStep}
                  snapToItems={snapToItems}
                  allItemsInRow={rowItems}
                  renderItem={renderItem}
                  onItemMove={onItemMove}
                  onItemResize={onItemResize}
                  onItemClick={onItemClick}
                  onItemCreate={onItemCreate}
                  setItems={state.setItems}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

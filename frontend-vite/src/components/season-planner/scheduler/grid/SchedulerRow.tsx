import React, { useCallback } from 'react';
import { Box } from '@mui/material';
import { motion } from 'motion/react';
import type {
  SchedulerItem,
  SchedulerResource,
  LaneInfo,
  SchedulerProps,
} from '../SchedulerTypes';
import { SchedulerItemComponent } from '../items/SchedulerItem';
import { toPixels } from '../scheduleUtils';

interface SchedulerRowProps<TItem = unknown, TResource = unknown> {
  resource: SchedulerResource<TResource>;
  items: SchedulerItem<TItem>[];
  laneMap: Map<string, LaneInfo>;
  laneCount: number;
  rowHeight: number;
  baseUnit: number;
  unitsPerCell: number;
  cellWidth: number;
  zoom: number;
  scrollX: number;
  containerWidth: number;
  totalWidth: number;
  canMoveItems: boolean;
  canResizeItems: boolean;
  canCreateItems: boolean;
  snapStep?: number;
  snapToItems?: boolean;
  allItemsInRow: SchedulerItem<TItem>[];
  renderItem?: SchedulerProps<TItem, TResource>['renderItem'];
  onItemMove?: SchedulerProps<TItem, TResource>['onItemMove'];
  onItemResize?: SchedulerProps<TItem, TResource>['onItemResize'];
  onItemClick?: SchedulerProps<TItem, TResource>['onItemClick'];
  onItemCreate?: SchedulerProps<TItem, TResource>['onItemCreate'];
  setItems: React.Dispatch<React.SetStateAction<SchedulerItem<TItem>[]>>;
}

export function SchedulerRow<TItem = unknown, TResource = unknown>({
  resource,
  items,
  laneMap,
  laneCount,
  rowHeight,
  baseUnit,
  unitsPerCell,
  cellWidth,
  zoom,
  scrollX,
  containerWidth,
  totalWidth,
  canMoveItems,
  canResizeItems,
  canCreateItems,
  snapStep,
  snapToItems,
  allItemsInRow,
  renderItem,
  onItemMove,
  onItemResize,
  onItemClick,
  onItemCreate,
  setItems,
}: SchedulerRowProps<TItem, TResource>) {
  const totalRowHeight = rowHeight * Math.max(1, laneCount);
  const effectiveCellWidth = cellWidth * zoom;

  const handleRowClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!canCreateItems || !onItemCreate) return;
      // Don't create if the click was on an item
      if ((e.target as HTMLElement).closest('[data-scheduler-item]')) return;
      const rect = e.currentTarget.getBoundingClientRect();
      // The row lives inside the scrolled content, so rect.left already
      // includes the horizontal scroll offset.
      const px = e.clientX - rect.left;
      const unit = baseUnit + (px / effectiveCellWidth) * unitsPerCell;
      const snapped = snapStep ? Math.round(unit / snapStep) * snapStep : unit;
      onItemCreate(resource.id, snapped, snapped + (snapStep ?? unitsPerCell));
    },
    [
      canCreateItems,
      onItemCreate,
      scrollX,
      baseUnit,
      effectiveCellWidth,
      unitsPerCell,
      snapStep,
      resource.id,
    ],
  );

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      style={{
        position: 'relative',
        width: totalWidth,
        height: totalRowHeight,
        flexShrink: 0,
        borderBottom: '1px solid var(--mui-palette-divider, rgba(0,0,0,0.12))',
        cursor: canCreateItems ? 'cell' : 'default',
      }}
      onClick={handleRowClick}
    >
      {items.map((item) => {
        const info = laneMap.get(item.id);
        if (!info) return null;

        const itemLeft = toPixels(item.start, baseUnit, cellWidth, unitsPerCell, zoom);
        const itemWidth = Math.max(
          4,
          toPixels(item.end, baseUnit, cellWidth, unitsPerCell, zoom) - itemLeft,
        );
        const itemTop = info.laneIndex * rowHeight;

        return (
          <SchedulerItemComponent
            key={item.id}
            item={item}
            resource={resource as SchedulerResource<unknown>}
            laneIndex={info.laneIndex}
            left={itemLeft}
            width={itemWidth}
            top={itemTop}
            height={rowHeight - 4}
            baseUnit={baseUnit}
            unitsPerCell={unitsPerCell}
            cellWidth={cellWidth}
            zoom={zoom}
            scrollX={scrollX}
            containerWidth={containerWidth}
            canMove={
              item.canMove !== undefined ? item.canMove : canMoveItems
            }
            canResize={
              item.canResize !== undefined ? item.canResize : canResizeItems
            }
            snapStep={snapStep}
            snapToItems={snapToItems}
            allItemsInRow={allItemsInRow as SchedulerItem<unknown>[]}
            renderItem={renderItem as SchedulerProps['renderItem']}
            onMove={onItemMove as SchedulerProps['onItemMove']}
            onResize={onItemResize as SchedulerProps['onItemResize']}
            onClick={onItemClick as SchedulerProps['onItemClick']}
            setItems={setItems as React.Dispatch<React.SetStateAction<SchedulerItem<unknown>[]>>}
          />
        );
      })}
    </motion.div>
  );
}

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useDragControls, animate } from 'motion/react';
import { AnimatePresence } from 'motion/react';
import { ItemResizeHandle } from './ItemResizeHandle';
import { DefaultItemRenderer } from './DefaultItemRenderer';
import { snapToStep, snapToNearestItem, toPixels } from '../scheduleUtils';
import type { SchedulerItem, SchedulerResource, SchedulerProps } from '../SchedulerTypes';

interface SchedulerItemProps<TItem = unknown, TResource = unknown> {
  item: SchedulerItem<TItem>;
  resource: SchedulerResource<TResource>;
  laneIndex: number;
  left: number;
  width: number;
  top: number;
  height: number;
  baseUnit: number;
  unitsPerCell: number;
  cellWidth: number;
  zoom: number;
  scrollX: number;
  containerWidth: number;
  canMove: boolean;
  canResize: boolean;
  snapStep?: number;
  snapToItems?: boolean;
  allItemsInRow: SchedulerItem<TItem>[];
  renderItem?: SchedulerProps<TItem, TResource>['renderItem'];
  onMove?: SchedulerProps<TItem, TResource>['onItemMove'];
  onResize?: SchedulerProps<TItem, TResource>['onItemResize'];
  onClick?: SchedulerProps<TItem, TResource>['onItemClick'];
  setItems: React.Dispatch<React.SetStateAction<SchedulerItem<TItem>[]>>;
}

export function SchedulerItemComponent<TItem = unknown, TResource = unknown>({
  item,
  resource,
  laneIndex,
  left,
  width,
  top,
  height,
  baseUnit,
  unitsPerCell,
  cellWidth,
  zoom,
  scrollX,
  canMove,
  canResize,
  snapStep,
  snapToItems,
  allItemsInRow,
  renderItem,
  onMove,
  onResize,
  onClick,
  setItems,
}: SchedulerItemProps<TItem, TResource>) {
  const effectiveCellWidth = cellWidth * zoom;
  const unitsPerPixel = unitsPerCell / effectiveCellWidth;
  const minWidth = Math.max(4, (snapStep ?? unitsPerCell * 0.1) / unitsPerPixel);

  const [isDragging, setIsDragging] = useState(false);

  // ── Single MotionValue for horizontal position (no `left` in style) ───────
  // Using one MotionValue avoids the dual-source conflict that caused the
  // back-and-forth: previously `left(React) + x(motion)` both changed
  // at different times during the same gesture end.
  const posX = useMotionValue(left);
  const visualWidth = useMotionValue(width);

  // Refs to know when we're in the middle of a gesture (don't sync from props)
  const isResizingRef = useRef(false);
  // Set by drag / resize gestures so the trailing click does not count as a click
  const didDragRef = useRef(false);
  const isAnimatingRef = useRef(false);

  // Base values captured at gesture start (so updates don't affect in-flight math)
  const baseLeftRef = useRef(left);
  const baseWidthRef = useRef(width);

  // Sync MotionValues from props when not in any active gesture
  useEffect(() => {
    if (!isDragging && !isResizingRef.current && !isAnimatingRef.current) {
      posX.set(left);
      visualWidth.set(width);
    }
  }, [left, width, isDragging, posX, visualWidth]);

  // scrollX as MotionValue for the sticky label (no re-renders on scroll)
  const scrollXMotion = useMotionValue(scrollX);
  useEffect(() => { scrollXMotion.set(scrollX); }, [scrollX, scrollXMotion]);

  // ── Move drag ─────────────────────────────────────────────────────────────
  // We use DragControls + dragListener=false so that pointerdown on resize
  // handles does NOT accidentally start a move-drag on the parent item.
  const dragControls = useDragControls();

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!canMove) return;
      const target = e.target as HTMLElement;
      // Don't start move-drag when grabbing a resize handle
      if (target.closest('[data-scheduler-resize]')) return;
      dragControls.start(e);
    },
    [canMove, dragControls],
  );

  const handleDragStart = useCallback(() => {
    didDragRef.current = true;
    setIsDragging(true);
    baseLeftRef.current = posX.get();
    baseWidthRef.current = visualWidth.get();
  }, [posX, visualWidth]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      setIsDragging(false);
      const deltaUnits = info.offset.x * unitsPerPixel;
      const duration = item.end - item.start;
      const others = allItemsInRow.filter((i) => i.id !== item.id);

      let newStart = item.start + deltaUnits;
      if (snapStep) newStart = snapToStep(newStart, snapStep);
      if (snapToItems) newStart = snapToNearestItem(newStart, others, snapStep ?? unitsPerCell * 0.5);
      const newEnd = newStart + duration;

      // Compute the exact target pixel (where the item should land)
      const targetLeft = toPixels(newStart, baseUnit, cellWidth, unitsPerCell, zoom);

      // FIX: posX currently = old `left` + drag `x` internally tracked by motion.
      // After dragEnd, motion has already applied the full offset to posX.
      // We just spring from the current (dragged) position to the snapped target.
      isAnimatingRef.current = true;
      animate(posX, targetLeft, {
        type: 'spring',
        stiffness: 350,
        damping: 30,
        onComplete: () => { isAnimatingRef.current = false; },
      });

      const updatedItem = { ...item, start: newStart, end: newEnd };
      setItems((prev) => prev.map((i) => (i.id === item.id ? updatedItem : i)));
      if (onMove) onMove(updatedItem, item.resourceId, newStart, newEnd);
    },
    [
      item, unitsPerPixel, allItemsInRow, snapStep, snapToItems, unitsPerCell,
      baseUnit, cellWidth, zoom, posX, setItems, onMove,
    ],
  );

  // ── Resize (called from handles via callbacks, no re-render during drag) ──

  const handleResizeUpdate = useCallback(
    (side: 'left' | 'right', deltaPx: number) => {
      isResizingRef.current = true;
      didDragRef.current = true;
      if (side === 'left') {
        const clampedDelta = Math.min(deltaPx, baseWidthRef.current - minWidth);
        posX.set(baseLeftRef.current + clampedDelta);
        visualWidth.set(Math.max(minWidth, baseWidthRef.current - clampedDelta));
      } else {
        visualWidth.set(Math.max(minWidth, baseWidthRef.current + deltaPx));
      }
    },
    [posX, visualWidth, minWidth],
  );

  const handleResizeCommit = useCallback(
    (side: 'left' | 'right', deltaPx: number) => {
      isResizingRef.current = false;
      const deltaUnits = deltaPx * unitsPerPixel;
      const others = allItemsInRow.filter((i) => i.id !== item.id);
      const minDuration = snapStep ?? unitsPerCell * 0.1;

      let newStart = item.start;
      let newEnd = item.end;

      if (side === 'left') {
        let candidate = item.start + deltaUnits;
        if (snapStep) candidate = snapToStep(candidate, snapStep);
        if (snapToItems) candidate = snapToNearestItem(candidate, others, snapStep ?? unitsPerCell * 0.5);
        newStart = Math.min(candidate, newEnd - minDuration);
      } else {
        let candidate = item.end + deltaUnits;
        if (snapStep) candidate = snapToStep(candidate, snapStep);
        if (snapToItems) candidate = snapToNearestItem(candidate, others, snapStep ?? unitsPerCell * 0.5);
        newEnd = Math.max(candidate, newStart + minDuration);
      }

      const targetLeft = toPixels(newStart, baseUnit, cellWidth, unitsPerCell, zoom);
      const targetWidth = toPixels(newEnd, baseUnit, cellWidth, unitsPerCell, zoom) - targetLeft;

      // Spring-animate to the snapped position — physical "snap" feel
      isAnimatingRef.current = true;
      animate(posX, targetLeft, {
        type: 'spring', stiffness: 400, damping: 30,
        onComplete: () => { isAnimatingRef.current = false; },
      });
      animate(visualWidth, targetWidth, { type: 'spring', stiffness: 400, damping: 30 });

      // Update base refs immediately so next gesture starts from committed values
      baseLeftRef.current = targetLeft;
      baseWidthRef.current = targetWidth;

      const updatedItem = { ...item, start: newStart, end: newEnd };
      setItems((prev) => prev.map((i) => (i.id === item.id ? updatedItem : i)));
      if (onResize) onResize(updatedItem, newStart, newEnd);
    },
    [
      item, unitsPerPixel, allItemsInRow, snapStep, snapToItems, unitsPerCell,
      baseUnit, cellWidth, zoom, posX, visualWidth, setItems, onResize,
    ],
  );

  // ── Click (only when not dragged) ─────────────────────────────────────────
  const handleClickCapture = useCallback(
    (e: React.MouseEvent) => {
      if (didDragRef.current) { e.stopPropagation(); didDragRef.current = false; return; }
      if (onClick) onClick(item);
    },
    [item, onClick],
  );

  return (
    <AnimatePresence>
      <motion.div
        key={item.id}
        data-scheduler-item
        title={item.tooltip}
        initial={{ opacity: 0, scaleY: 0.8 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0.8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        drag={canMove ? 'x' : false}
        dragControls={dragControls}
        dragListener={false}   // we start drag manually via onPointerDown above
        dragMomentum={false}
        dragElastic={0.06}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        onClickCapture={handleClickCapture}
        whileDrag={{ scale: 1.03, zIndex: 50, cursor: 'grabbing' }}
        style={{
          position: 'absolute',
          left: 0,           // always 0 — posX drives the actual position
          top,
          height,
          x: posX,           // THE position (no separate `left` offset)
          width: visualWidth, // live resize during handle drag
          cursor: canMove ? 'grab' : 'default',
          touchAction: 'none',
          zIndex: isDragging ? 50 : 1,
        }}
      >
        {renderItem ? (
          renderItem(item, resource, laneIndex)
        ) : (
          <DefaultItemRenderer
            item={item}
            resource={resource}
            laneIndex={laneIndex}
            visualWidth={visualWidth}
            scrollXMotion={scrollXMotion}
            posXMotion={posX}
            isDragging={isDragging}
          />
        )}

        {canResize && (
          <>
            <ItemResizeHandle
              side="left"
              onUpdate={(delta) => handleResizeUpdate('left', delta)}
              onCommit={(delta) => handleResizeCommit('left', delta)}
            />
            <ItemResizeHandle
              side="right"
              onUpdate={(delta) => handleResizeUpdate('right', delta)}
              onCommit={(delta) => handleResizeCommit('right', delta)}
            />
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

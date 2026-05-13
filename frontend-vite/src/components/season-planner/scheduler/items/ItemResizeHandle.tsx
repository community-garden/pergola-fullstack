import React, { useRef } from 'react';

interface ItemResizeHandleProps {
  side: 'left' | 'right';
  /** Called on every pointermove with the raw pixel delta from drag start */
  onUpdate: (deltaPx: number) => void;
  /** Called on pointerup — commit the final delta */
  onCommit: (deltaPx: number) => void;
}

const HANDLE_WIDTH = 8;

/**
 * Resize handle — stays visually at the item edge at all times.
 *
 * Uses raw pointer capture instead of motion drag so the item body can resize
 * live (driven by parent MotionValues) while the handle itself never moves.
 * stopPropagation on pointerdown prevents the parent item from starting a
 * move-drag when the handle is grabbed.
 */
export const ItemResizeHandle: React.FC<ItemResizeHandleProps> = ({
  side,
  onUpdate,
  onCommit,
}) => {
  const startXRef = useRef(0);
  const activeRef = useRef(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation(); // prevent parent item's move-drag from starting
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    activeRef.current = true;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeRef.current) return;
    onUpdate(e.clientX - startXRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!activeRef.current) return;
    activeRef.current = false;
    onCommit(e.clientX - startXRef.current);
  };

  return (
    <div
      data-scheduler-resize={side}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: 'absolute',
        top: 0,
        [side === 'left' ? 'left' : 'right']: 0,
        width: HANDLE_WIDTH,
        height: '100%',
        cursor: 'ew-resize',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        // Subtle hover feedback via CSS (no JS re-render needed)
        borderRadius: side === 'left' ? '4px 0 0 4px' : '0 4px 4px 0',
      }}
    >
      <div
        style={{
          width: 2,
          height: '50%',
          borderRadius: 1,
          backgroundColor: 'rgba(255,255,255,0.65)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

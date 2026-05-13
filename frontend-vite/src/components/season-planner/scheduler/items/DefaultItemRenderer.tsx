import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, useTransform, MotionValue } from 'motion/react';
import type { SchedulerItem, SchedulerResource } from '../SchedulerTypes';

interface DefaultItemRendererProps<TItem = unknown, TResource = unknown> {
  item: SchedulerItem<TItem>;
  resource: SchedulerResource<TResource>;
  laneIndex: number;
  /** MotionValue for the item's current visual width (changes during resize) */
  visualWidth: MotionValue<number>;
  /** scrollX as a MotionValue — drives sticky label without re-renders */
  scrollXMotion: MotionValue<number>;
  /** posX MotionValue — the item's absolute pixel position in the timeline */
  posXMotion: MotionValue<number>;
  isDragging: boolean;
}

/**
 * Default item bar renderer.
 *
 * Sticky label: when the left part of the item scrolls behind the left panel
 * edge, the label is pushed right to stay visible. Both the scroll position
 * and the item's live position are MotionValues, so this runs entirely outside
 * the React render cycle (no re-renders on scroll or drag).
 */
export function DefaultItemRenderer<TItem = unknown, TResource = unknown>({
  item,
  visualWidth,
  scrollXMotion,
  posXMotion,
  isDragging,
}: DefaultItemRendererProps<TItem, TResource>) {
  const bg = item.color ?? '#1976d2';

  // How far the item's left edge is scrolled off-screen.
  // Clamp between 0 (label at natural position) and (width - 32) (min visible space).
  const labelOffset = useTransform(
    [scrollXMotion, posXMotion, visualWidth] as MotionValue<number>[],
    ([scrollX, itemLeft, w]: number[]) => {
      const overflow = scrollX - itemLeft;
      return Math.max(0, Math.min(overflow, w - 32));
    },
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        borderRadius: 1,
        bgcolor: bg,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        boxShadow: isDragging
          ? '0 8px 24px rgba(0,0,0,0.3)'
          : '0 1px 3px rgba(0,0,0,0.2)',
        transition: isDragging ? 'none' : 'box-shadow 0.15s',
      }}
    >
      {item.label && (
        <motion.div
          style={{
            x: labelOffset,
            position: 'absolute',
            left: 6,
            right: 6,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <Typography
            component="span"
            sx={{
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.7rem',
              lineHeight: 1,
              display: 'block',
              textShadow: '0 1px 2px rgba(0,0,0,0.4)',
              userSelect: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.label}
          </Typography>
        </motion.div>
      )}
    </Box>
  );
}

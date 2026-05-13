import React from 'react';
import { Box } from '@mui/material';

interface SchedulerBackgroundProps {
  /** Indices of the cells to render */
  startIndex: number;
  endIndex: number;
  effectiveCellWidth: number;
  offsetLeft: number;
  totalHeight: number;
  totalWidth: number;
}

/**
 * Renders vertical gridlines aligned to timeline header cells.
 * Absolutely positioned behind all items.
 */
export const SchedulerBackground: React.FC<SchedulerBackgroundProps> = ({
  startIndex,
  endIndex,
  effectiveCellWidth,
  offsetLeft,
  totalHeight,
  totalWidth,
}) => {
  const cellCount = endIndex - startIndex + 1;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: offsetLeft,
        height: totalHeight,
        width: cellCount * effectiveCellWidth,
        display: 'flex',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {Array.from({ length: cellCount }, (_, i) => (
        <Box
          key={startIndex + i}
          sx={{
            width: effectiveCellWidth,
            height: '100%',
            flexShrink: 0,
            borderRight: 1,
            borderColor: 'divider',
            // Alternate background for visual rhythm
            bgcolor: (startIndex + i) % 2 === 0 ? 'transparent' : 'action.hover',
          }}
        />
      ))}
    </Box>
  );
};

import React from 'react';
import { Box, Typography } from '@mui/material';
import type { TimelineHeaderConfig, TimelineUnit } from '../SchedulerTypes';

interface TimelineHeaderRowProps {
  config: TimelineHeaderConfig;
  visibleUnits: TimelineUnit[];
  getUnitPixelStart: (unit: TimelineUnit) => number;
  getUnitPixelWidth: (unit: TimelineUnit) => number;
  totalWidth: number;
}

/**
 * Renders one row of timeline header cells.
 * Positioning is absolute so cells align perfectly with the grid.
 */
export const TimelineHeaderRow: React.FC<TimelineHeaderRowProps> = ({
  config,
  visibleUnits,
  getUnitPixelStart,
  getUnitPixelWidth,
  totalWidth,
}) => {
  const height = config.height ?? 28;

  return (
    <Box
      sx={{
        position: 'relative',
        height,
        width: totalWidth,
        flexShrink: 0,
        borderBottom: 1,
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      {visibleUnits.map((unit, i) => {
        const left = getUnitPixelStart(unit);
        const width = getUnitPixelWidth(unit);
        // Safety net: don't render label text in cells that are still too narrow
        // (can happen with custom configs that don't use effectiveCellWidth)
        const showLabel = width >= 8;

        return (
          <Box
            key={`${config.key}-${unit.start}`}
            sx={{
              position: 'absolute',
              top: 0,
              left,
              width,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: 1,
              borderColor: 'divider',
              px: 0.5,
              overflow: 'hidden',
              userSelect: 'none',
            }}
          >
            {showLabel && (
              <Typography variant="caption" noWrap sx={{ fontSize: '0.7rem', fontWeight: 500 }}>
                {config.renderCell(unit, i)}
              </Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { TimelineHeaderRow } from './TimelineHeaderRow';
import type { TimelineHeaderConfig, TimelineUnit } from '../SchedulerTypes';
import { toPixels } from '../scheduleUtils';

interface TimelineHeaderProps {
  configs: TimelineHeaderConfig[];
  scrollX: number;
  containerWidth: number;
  baseUnit: number;
  unitsPerCell: number;
  cellWidth: number;
  zoom: number;
  totalWidth: number;
  timelineStart?: number;
  timelineEnd?: number;
}

const OVERSCAN_PX = 200;

export const TimelineHeader: React.FC<TimelineHeaderProps> = ({
  configs,
  scrollX,
  containerWidth,
  baseUnit,
  unitsPerCell,
  cellWidth,
  zoom,
  totalWidth,
  timelineStart,
  timelineEnd,
}) => {
  const effectiveCellWidth = cellWidth * zoom;

  // Compute the visible unit range (in timeline units, not pixels)
  const visibleUnitRange = useMemo(() => {
    const pxStart = scrollX - OVERSCAN_PX;
    const pxEnd = scrollX + containerWidth + OVERSCAN_PX;
    const unitStart = baseUnit + (pxStart / effectiveCellWidth) * unitsPerCell;
    const unitEnd = baseUnit + (pxEnd / effectiveCellWidth) * unitsPerCell;
    return {
      start: timelineStart !== undefined ? Math.max(timelineStart, unitStart) : unitStart,
      end: timelineEnd !== undefined ? Math.min(timelineEnd, unitEnd) : unitEnd,
    };
  }, [scrollX, containerWidth, baseUnit, effectiveCellWidth, unitsPerCell, timelineStart, timelineEnd]);

  const getUnitPixelStart = (unit: TimelineUnit) =>
    toPixels(unit.start, baseUnit, cellWidth, unitsPerCell, zoom);

  const getUnitPixelWidth = (unit: TimelineUnit) =>
    toPixels(unit.end, baseUnit, cellWidth, unitsPerCell, zoom) - getUnitPixelStart(unit);

  const totalHeight = configs.reduce((h, c) => h + (c.height ?? 28), 0);

  return (
    <Box
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 3,
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        width: totalWidth,
        flexShrink: 0,
        boxShadow: (theme) => `0 2px 4px ${theme.palette.divider}`,
      }}
      style={{ height: totalHeight }}
    >
      {configs.map((config) => {
        const units = config.getUnitsInRange(visibleUnitRange.start, visibleUnitRange.end, effectiveCellWidth);
        return (
          <TimelineHeaderRow
            key={config.key}
            config={config}
            visibleUnits={units}
            getUnitPixelStart={getUnitPixelStart}
            getUnitPixelWidth={getUnitPixelWidth}
            totalWidth={totalWidth}
          />
        );
      })}
    </Box>
  );
};

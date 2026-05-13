import { useRef, useMemo } from 'react';
import { Box } from '@mui/material';
import { useDrag } from '@use-gesture/react';
import type { Period } from './plant-helpers';

interface PeriodEditHandleProps {
  side: 'start' | 'end';
  period: Period;
  periodIndex: number;
  isVisible: boolean;
  onPeriodChange: (periodIndex: number, updates: Partial<Period>) => void;
  onTooltipUpdate?: (day: number, x: number, y: number) => void;
  onTooltipClear?: () => void;
}

export const PeriodEditHandle = ({
  side,
  period,
  periodIndex,
  isVisible,
  onPeriodChange,
  onTooltipUpdate,
  onTooltipClear,
}: PeriodEditHandleProps) => {
  const startDayRef = useRef(side === 'start' ? period.start : period.end);
  const pixelsPerDayRef = useRef(2.67);
  const pendingUpdateRef = useRef<Partial<Period> | null>(null);

  // Update startDay ref when period changes
  useMemo(() => {
    startDayRef.current = side === 'start' ? period.start : period.end;
  }, [period.start, period.end, side]);

  const bind = useDrag(
    ({ active, movement: [mx], event, first, last, xy: [clientX, clientY] }) => {
      // Calculate pixels per day on first drag
      if (first && event?.target) {
        const target = event.target as HTMLElement;
        const table = target.closest('table');
        
        if (table) {
          const monthColumns = table.querySelectorAll('th');
          if (monthColumns && monthColumns.length > 13) {
            const monthColumn = monthColumns[1] as HTMLElement;
            const columnWidth = monthColumn.offsetWidth;
            pixelsPerDayRef.current = columnWidth / 30.42; // Average days per month
          }
        }
        pendingUpdateRef.current = null;
      }

      // Calculate new day value
      const dayDelta = Math.round(mx / pixelsPerDayRef.current);
      const newDay = startDayRef.current + dayDelta;

      if (active) {
        // Update tooltip immediately for visual feedback
        onTooltipUpdate?.(newDay, clientX, clientY);

        // Store pending update but don't commit yet
        if (side === 'start') {
          const newStart = Math.max(0, newDay);
          if (newStart < period.end) {
            pendingUpdateRef.current = { start: newStart };
          }
        } else {
          if (newDay > period.start) {
            pendingUpdateRef.current = { end: newDay };
          }
        }
      } else if (last && pendingUpdateRef.current) {
        // On release, commit the pending update
        onPeriodChange(periodIndex, pendingUpdateRef.current);
        pendingUpdateRef.current = null;
        // Clear tooltip on release
        onTooltipClear?.();
      }
    },
    {
      axis: 'x',
      pointer: { touch: true },
    }
  );

  if (!isVisible) return null;

  return (
    <Box
      {...bind()}
      className="period-handle"
      sx={{
        position: 'absolute',
        [side === 'start' ? 'left' : 'right']: 0,
        top: 0,
        bottom: 0,
        width: 8,
        cursor: 'ew-resize',
        opacity: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        transition: 'opacity 0.2s',
        zIndex: 10,
        touchAction: 'none',
        '&:hover': {
          opacity: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    />
  );
};


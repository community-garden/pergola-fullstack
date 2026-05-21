import {
  startOfYear,
  startOfMonth,
  startOfDay,
  startOfISOWeek,
  endOfYear,
  endOfMonth,
  endOfDay,
  addYears,
  addMonths,
  addDays,
  addWeeks,
  format,
  getMonth,
  getYear,
} from 'date-fns';
import type { Locale } from 'date-fns';
import type { TimelineHeaderConfig, TimelineUnit } from '../SchedulerTypes';

// ---------------------------------------------------------------------------
// Date-based configs
// ---------------------------------------------------------------------------

// Minimum readable cell width in pixels before switching to a coarser step
const MIN_CELL_PX = 18;

// ---------------------------------------------------------------------------
// Year header row — always one cell per calendar year (never too small)
// ---------------------------------------------------------------------------

export function createYearHeaderConfig(): TimelineHeaderConfig {
  return {
    key: 'year',
    height: 28,
    getUnitsInRange(rangeStart, rangeEnd): TimelineUnit[] {
      const units: TimelineUnit[] = [];
      let current = startOfYear(new Date(rangeStart));
      const end = new Date(rangeEnd);
      while (current <= end) {
        const next = addYears(current, 1);
        units.push({
          start: current.getTime(),
          end: Math.min(endOfYear(current).getTime(), end.getTime()),
        });
        current = next;
      }
      return units;
    },
    renderCell(unit) {
      return format(new Date(unit.start), 'yyyy');
    },
  };
}

// ---------------------------------------------------------------------------
// Month header row — adaptive: months → quarters → half-years
//
// `effectiveCellWidth` is pixels per 1 day (since unitsPerCell = ONE_DAY_MS).
// A month is ~30.44 days, so a month cell ≈ effectiveCellWidth * 30.44 px.
// ---------------------------------------------------------------------------

export function createMonthHeaderConfig(locale?: Locale): TimelineHeaderConfig {
  return {
    key: 'month',
    height: 28,
    getUnitsInRange(rangeStart, rangeEnd, effectiveCellWidth = 40): TimelineUnit[] {
      const approxMonthPx = effectiveCellWidth * 30.44;

      // How many calendar months to group per cell
      let monthsStep: number;
      if (approxMonthPx >= MIN_CELL_PX)     monthsStep = 1;  // individual months
      else if (approxMonthPx >= MIN_CELL_PX / 3) monthsStep = 3;  // quarters
      else if (approxMonthPx >= MIN_CELL_PX / 6) monthsStep = 6;  // half-years
      else return []; // too zoomed out — year row is enough

      // Snap range start to the nearest group boundary
      const rawStart = startOfMonth(new Date(rangeStart));
      const snapMonth = Math.floor(getMonth(rawStart) / monthsStep) * monthsStep;
      let current = new Date(getYear(rawStart), snapMonth, 1);

      const end = new Date(rangeEnd);
      const units: TimelineUnit[] = [];

      while (current <= end) {
        const next = addMonths(current, monthsStep);
        units.push({
          start: current.getTime(),
          end: Math.min(endOfMonth(addMonths(current, monthsStep - 1)).getTime(), end.getTime()),
        });
        current = next;
      }
      return units;
    },
    renderCell(unit) {
      const startDate = new Date(unit.start);
      const spanDays = (unit.end - unit.start) / ONE_DAY_MS;

      if (spanDays > 150) {
        // Half-year
        const h = Math.floor(getMonth(startDate) / 6) + 1;
        return `H${h}`;
      }
      if (spanDays > 60) {
        // Quarter
        const q = Math.floor(getMonth(startDate) / 3) + 1;
        return `Q${q}`;
      }
      // Individual month — use short name when narrow, full when wide
      return format(startDate, 'MMM', { locale });
    },
  };
}

// ---------------------------------------------------------------------------
// Day header row — adaptive: 1 day → every N days → weekly → bi-weekly
//
// `effectiveCellWidth` is pixels per 1 day.
// ---------------------------------------------------------------------------

/** Pick the coarsest "nice" step where step × effectiveCellWidth ≥ MIN_CELL_PX */
function chooseDayStep(effectiveCellWidth: number): number {
  // Try steps in increasing order; return the first that yields wide enough cells
  const candidates = [1, 2, 3, 5, 7, 10, 14];
  for (const step of candidates) {
    if (step * effectiveCellWidth >= MIN_CELL_PX) return step;
  }
  // Even 14-day cells are too small → hide the row
  return 0;
}

export function createDayHeaderConfig(): TimelineHeaderConfig {
  return {
    key: 'day',
    height: 24,
    getUnitsInRange(rangeStart, rangeEnd, effectiveCellWidth = 40): TimelineUnit[] {
      const step = chooseDayStep(effectiveCellWidth);
      if (step === 0) return []; // cells too narrow even at 14-day groups

      const units: TimelineUnit[] = [];
      const end = new Date(rangeEnd);

      let current: Date;
      if (step === 7) {
        // Align groups to ISO week starts (Monday) for clean visual rhythm
        current = startOfISOWeek(startOfDay(new Date(rangeStart)));
      } else if (step > 1) {
        // Align to start of month, then march by `step`
        current = startOfMonth(new Date(rangeStart));
        while (addDays(current, step) < new Date(rangeStart)) {
          current = addDays(current, step);
        }
      } else {
        current = startOfDay(new Date(rangeStart));
      }

      while (current <= end) {
        const next = addDays(current, step);
        units.push({
          start: current.getTime(),
          end: Math.min(endOfDay(addDays(current, step - 1)).getTime(), end.getTime()),
        });
        current = next;
      }
      return units;
    },
    renderCell(unit) {
      const startDate = new Date(unit.start);
      const spanDays = Math.round((unit.end - unit.start) / ONE_DAY_MS);

      if (spanDays >= 7) {
        // Weekly / bi-weekly group: show start day + abbreviated month if it's the 1st
        const d = format(startDate, 'd');
        return getMonth(startDate) === getMonth(new Date(unit.start)) &&
          startDate.getDate() <= 7
          ? `${d}`
          : d;
      }
      return format(startDate, 'd');
    },
  };
}

// ---------------------------------------------------------------------------
// Convenience factories
// ---------------------------------------------------------------------------

/**
 * Creates a complete date header stack (year + month + day) where the day row
 * automatically coarsens its granularity as you zoom out.
 */
export function createDateConfig(
  granularity: 'day' | 'week' | 'month' = 'day',
  locale?: Locale,
): TimelineHeaderConfig[] {
  if (granularity === 'month') {
    return [createYearHeaderConfig(), createMonthHeaderConfig(locale)];
  }
  return [createYearHeaderConfig(), createMonthHeaderConfig(locale), createDayHeaderConfig()];
}

// ---------------------------------------------------------------------------
// Stage-based config (arbitrary named stages)
// ---------------------------------------------------------------------------

export function createStageConfig(stages: string[]): TimelineHeaderConfig[] {
  return [
    {
      key: 'stage',
      height: 36,
      getUnitsInRange(rangeStart, rangeEnd): TimelineUnit[] {
        const start = Math.max(0, Math.floor(rangeStart));
        const end = Math.min(stages.length - 1, Math.ceil(rangeEnd));
        return Array.from({ length: end - start + 1 }, (_, i) => ({
          start: start + i,
          end: start + i + 1,
        }));
      },
      renderCell(unit) {
        return stages[Math.floor(unit.start)] ?? String(Math.floor(unit.start));
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Timecode config (media-editing style, HH:MM:SS:FF)
// ---------------------------------------------------------------------------

function formatTimecode(frame: number, fps: number): string {
  const totalSeconds = Math.floor(frame / fps);
  const ff = frame % fps;
  const ss = totalSeconds % 60;
  const mm = Math.floor(totalSeconds / 60) % 60;
  const hh = Math.floor(totalSeconds / 3600);
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export function createTimecodeConfig(fps = 25): TimelineHeaderConfig[] {
  const secondFrames = fps;
  const minuteFrames = secondFrames * 60;
  const hourFrames = minuteFrames * 60;

  return [
    {
      key: 'tc-hours',
      height: 24,
      getUnitsInRange(rangeStart, rangeEnd): TimelineUnit[] {
        const units: TimelineUnit[] = [];
        let cur = Math.floor(rangeStart / hourFrames) * hourFrames;
        while (cur <= rangeEnd) {
          units.push({ start: cur, end: cur + hourFrames });
          cur += hourFrames;
        }
        return units;
      },
      renderCell(unit) {
        const h = Math.floor(unit.start / hourFrames);
        return `${String(h).padStart(2, '0')}:00:00:00`;
      },
    },
    {
      key: 'tc-seconds',
      height: 24,
      getUnitsInRange(rangeStart, rangeEnd, effectiveCellWidth = 40): TimelineUnit[] {
        const units: TimelineUnit[] = [];
        // Adapt: group frames if they'd be too narrow
        const minFramesPerCell = Math.max(1, Math.ceil(MIN_CELL_PX / effectiveCellWidth));
        const step = minFramesPerCell <= 1 ? 1
          : minFramesPerCell <= fps ? fps           // whole seconds
          : minuteFrames;                             // whole minutes
        let cur = Math.floor(rangeStart / step) * step;
        while (cur <= rangeEnd) {
          units.push({ start: cur, end: cur + step });
          cur += step;
        }
        return units;
      },
      renderCell(unit) {
        return formatTimecode(unit.start, fps);
      },
    },
  ];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** One day in milliseconds — use as `unitsPerCell` for date-based schedulers */
export const ONE_DAY_MS = 86_400_000;

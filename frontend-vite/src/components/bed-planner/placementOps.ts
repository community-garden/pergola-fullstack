/**
 * Small pure helpers that the in-memory bed plan (Storybook) and the store
 * implementation (app) share, so both behave the same.
 */
import type { PlantInfo } from '../../api/season';
import type { LocalPoint } from './bedFrame';
import { translateShape } from './bedLayout';
import type { BedPlacement } from './types';

const pad = (n: number) => String(n).padStart(2, '0');
const lastDay = (year: number, month: number) => new Date(Date.UTC(year, month, 0)).getUTCDate();

/**
 * Period of a new planting in `season`: from sowing or planting out until the
 * end of the harvest (as given by the plant's months), else April–September.
 */
export const defaultPlantingDates = (plant: PlantInfo | undefined, season: number) => {
  const start = plant?.phases.planting?.[0] ?? plant?.phases.sowing?.[0] ?? 4;
  const end = plant?.phases.harvest?.[1] ?? 9;
  const endYear = end < start ? season + 1 : season;
  return {
    startDate: `${season}-${pad(start)}-01`,
    endDate: `${endYear}-${pad(end)}-${pad(lastDay(endYear, end))}`,
  };
};

/** A placement moved to `to`; rows and areas move as a whole (x/y is their first point). */
export const movedPlacement = (p: BedPlacement, to: LocalPoint): BedPlacement =>
  p.shape ? { ...p, ...to, shape: translateShape(p.shape, { x: to.x - p.x, y: to.y - p.y }) } : { ...p, ...to };

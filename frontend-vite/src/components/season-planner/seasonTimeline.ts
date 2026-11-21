/**
 * Pure helpers that turn the season read model (beds, plantings, plants)
 * into scheduler rows and bars. Dates are handled as UTC day timestamps so
 * "2027-04-01" always maps to the same pixel regardless of the time zone.
 */
import type { SchedulerItem, SchedulerItemSegment, SchedulerResource } from './scheduler';
import type { PatchInfo, PlantInfo, PlantingInfo } from '../../api/season';
import { plantingLabel, type SeasonData } from '../../hooks/useSeasonData';
import { DEFAULT_PERIOD_COLORS } from '../garden/SeasonalGrowingCalendar';

export const DAY_MS = 86_400_000;

export const ROLE_COLORS: Record<string, string> = {
  main: '#2e7d32',
  pre_crop: '#6a1b9a',
  catch_crop: '#00838f',
  post_crop: '#ef6c00',
  green_manure: '#9e9d24',
  perennial: '#5d4037',
};

export const PATCH_TYPE_ICONS: Record<string, string> = {
  bed: '🟫',
  greenhouse: '🏠',
  container: '🪴',
  field: '🌾',
  other: '📍',
};

/** "2027-04-01" -> UTC midnight timestamp */
export const parseDay = (iso: string): number => Date.parse(`${iso.slice(0, 10)}T00:00:00Z`);

/** UTC timestamp -> "2027-04-01" */
export const formatDay = (ms: number): string => new Date(Math.round(ms / DAY_MS) * DAY_MS).toISOString().slice(0, 10);

/**
 * The visible window of a season: from October of the previous year (garlic,
 * winter crops, pre-cultivation) to the end of the season year.
 */
export const seasonWindow = (season: number) => ({
  start: Date.UTC(season - 1, 9, 1),
  end: Date.UTC(season + 1, 0, 1),
});

/** Default season: from September on we plan the next year. */
export const defaultSeason = (now = new Date()) =>
  now.getMonth() >= 8 ? now.getFullYear() + 1 : now.getFullYear();

/** Bars end exclusive: the planting occupies the bed until the end of endDate. */
export const plantingRange = (planting: PlantingInfo): { start: number; end: number } | undefined => {
  if (!planting.startDate) return undefined;
  const start = parseDay(planting.startDate);
  const end = planting.endDate ? parseDay(planting.endDate) + DAY_MS : start + 90 * DAY_MS;
  return { start, end: Math.max(end, start + DAY_MS) };
};

/** Converts a bar back into planting dates (inclusive end date). */
export const rangeToDates = (start: number, end: number) => ({
  startDate: formatDay(start),
  endDate: formatDay(Math.max(start, end - DAY_MS)),
});

const PHASES: [keyof PlantInfo['phases'], string][] = [
  ['preCultivation', 'preCultivation'],
  ['sowing', 'sowing'],
  ['planting', 'planting'],
  ['harvest', 'harvest'],
];

/**
 * Month windows of the plant calendar ("when is what due") projected onto
 * the years the bar spans. Segments outside the bar are clipped by the renderer.
 */
export const phaseSegments = (
  plant: PlantInfo | undefined,
  range: { start: number; end: number },
  phaseLabel: (phase: string) => string,
): SchedulerItemSegment[] => {
  if (!plant) return [];
  const firstYear = new Date(range.start).getUTCFullYear();
  const lastYear = new Date(range.end).getUTCFullYear();
  const segments: SchedulerItemSegment[] = [];
  for (let year = firstYear; year <= lastYear; year++) {
    PHASES.forEach(([key, periodType]) => {
      const months = plant.phases[key];
      if (!months) return;
      const [from, to] = months;
      const startYear = to < from ? year - 1 : year;
      segments.push({
        start: Date.UTC(startYear, from - 1, 1),
        end: Date.UTC(year, to, 1),
        color: DEFAULT_PERIOD_COLORS[periodType as keyof typeof DEFAULT_PERIOD_COLORS],
        label: phaseLabel(key),
      });
    });
  }
  return segments;
};

export interface TimelineText {
  role: (role: string) => string;
  status: (status: string) => string;
  unit: (unit: string) => string;
  phase: (phase: string) => string;
  bed: string;
}

export const plantingToItem = (
  planting: PlantingInfo,
  data: SeasonData,
  text: TimelineText,
): SchedulerItem<PlantingInfo> | undefined => {
  const range = plantingRange(planting);
  if (!range || !planting.patchIri) return undefined;
  const { icon, name, species, variety } = plantingLabel(planting, data);
  const qty = planting.quantity
    ? ` · ${planting.quantity}${planting.quantityUnit ? ` ${text.unit(planting.quantityUnit)}` : ''}`
    : '';
  const role = planting.role ?? 'main';
  const tooltip = [
    `${icon} ${name}${qty}`,
    `${planting.startDate} – ${planting.endDate ?? '?'}`,
    [text.role(role), planting.status && text.status(planting.status)].filter(Boolean).join(' · '),
    planting.notes,
  ]
    .filter(Boolean)
    .join('\n');
  return {
    id: planting.iri,
    resourceId: planting.patchIri,
    start: range.start,
    end: range.end,
    label: `${icon} ${name}${qty}`,
    color: ROLE_COLORS[role] ?? ROLE_COLORS.main,
    variant: planting.status === 'wish' || planting.status === 'cancelled' ? 'outlined' : 'solid',
    tooltip,
    segments: phaseSegments(variety?.phases && Object.values(variety.phases).some(Boolean) ? variety : species, range, text.phase),
    data: planting,
  };
};

export const patchToResource = (patch: PatchInfo): SchedulerResource<PatchInfo> => ({
  id: patch.iri,
  label: patch.name,
  description: patch.responsiblePersons.map((p) => p.name).join(', ') || undefined,
  icon: patch.icon ?? PATCH_TYPE_ICONS[patch.patchType ?? 'other'] ?? '📍',
  data: patch,
});

/** Plantings shown in the season: overlapping its window. */
export const overlapsSeason = (planting: PlantingInfo, season: number) => {
  const range = plantingRange(planting);
  if (!range) return false;
  const window = seasonWindow(season);
  return range.start < window.end && range.end > window.start;
};

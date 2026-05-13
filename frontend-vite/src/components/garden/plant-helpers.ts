import { PlantSpecies, PlantVariety, GrowingSeason } from '../../schema/patch-schema';
import { isNil } from 'lodash-es';

/**
 * Base plant data type that unifies PlantSpecies and PlantVariety
 */
export type PlantData = {
  '@id'?: string;
  '@type': string;
  name: string;
  icon?: string;
  scientificName?: string;
  family?: string;
  description?: string;
  growingSeason?: GrowingSeason;
  requirements?: {
    sun?: 'full_sun' | 'partial_shade' | 'full_shade';
    water?: 'low' | 'medium' | 'high';
  };
  physicalCharacteristics?: {
    spacing?: number;
    height?: number;
  };
  timing?: {
    germinationDays?: number;
    daysToHarvest?: number;
  };
  // Specific to varieties
  characteristics?: string;
  sourceInfo?: string;
  // Reference to species if variety
  species?: PlantSpecies;
};

/**
 * Extracts common plant data from PlantSpecies or PlantVariety
 */
export const extractPlantData = (plant: PlantSpecies | PlantVariety): PlantData => {
  const isVariety = plant['@type'].includes('PlantVariety');
  
  return {
    '@id': plant['@id'],
    '@type': plant['@type'],
    name: plant.name,
    icon: isVariety && 'species' in plant ? plant.species?.icon : undefined,
    scientificName: isVariety && 'species' in plant ? plant.species?.scientificName : 'scientificName' in plant ? plant.scientificName : undefined,
    family: isVariety && 'species' in plant ? plant.species?.family : 'family' in plant ? plant.family : undefined,
    description: plant.description,
    growingSeason: plant.growingSeason || (isVariety && 'species' in plant ? plant.species?.growingSeason : undefined),
    requirements: plant.requirements || (isVariety && 'species' in plant ? plant.species?.requirements : undefined),
    physicalCharacteristics: plant.physicalCharacteristics || (isVariety && 'species' in plant ? plant.species?.physicalCharacteristics : undefined),
    timing: plant.timing || (isVariety && 'species' in plant ? plant.species?.timing : undefined),
    characteristics: isVariety && 'characteristics' in plant ? plant.characteristics : undefined,
    sourceInfo: isVariety && 'sourceInfo' in plant ? plant.sourceInfo : undefined,
    species: isVariety && 'species' in plant ? plant.species : undefined,
  };
};

/**
 * Gets the display name for a plant (includes variety and species info)
 */
export const getPlantDisplayName = (plantData: PlantData): string => {
  const isVariety = plantData['@type'].includes('PlantVariety');
  
  if (isVariety && plantData.species?.name) {
    return `${plantData.species.name} - ${plantData.name}`;
  }
  
  return plantData.name;
};

/**
 * Month boundaries in days (0-indexed)
 * These are approximate (assuming 365 days per year)
 */
export const MONTH_BOUNDARIES = [
  { month: 0, name: 'January', start: 0, end: 30 },
  { month: 1, name: 'February', start: 31, end: 58 },
  { month: 2, name: 'March', start: 59, end: 89 },
  { month: 3, name: 'April', start: 90, end: 119 },
  { month: 4, name: 'May', start: 120, end: 150 },
  { month: 5, name: 'June', start: 151, end: 180 },
  { month: 6, name: 'July', start: 181, end: 211 },
  { month: 7, name: 'August', start: 212, end: 242 },
  { month: 8, name: 'September', start: 243, end: 272 },
  { month: 9, name: 'October', start: 273, end: 303 },
  { month: 10, name: 'November', start: 304, end: 333 },
  { month: 11, name: 'December', start: 334, end: 364 },
];

/**
 * Period types for growing calendar
 */
export type PeriodType = 'sowingOutdoors' | 'sowingUnderGlass' | 'harvest';

export type Period = {
  type: PeriodType;
  start: number;
  end: number;
};

/**
 * Extracts all periods from plant data
 */
export const extractPeriods = (plantData: PlantData): Period[] => {
  const periods: Period[] = [];
  const gs = plantData.growingSeason;
  
  if (!gs) return periods;
  
  // Sowing outdoors
  if (!isNil(gs.sowingOutdoorsStart) && !isNil(gs.sowingOutdoorsEnd)) {
    periods.push({
      type: 'sowingOutdoors',
      start: gs.sowingOutdoorsStart,
      end: gs.sowingOutdoorsEnd,
    });
  }
  
  // Sowing under glass
  if (!isNil(gs.sowingUnderGlassStart) && !isNil(gs.sowingUnderGlassEnd)) {
    periods.push({
      type: 'sowingUnderGlass',
      start: gs.sowingUnderGlassStart,
      end: gs.sowingUnderGlassEnd,
    });
  }
  
  // Harvest
  if (!isNil(gs.harvestStartDay) && !isNil(gs.harvestEndDay)) {
    periods.push({
      type: 'harvest',
      start: gs.harvestStartDay,
      end: gs.harvestEndDay,
    });
  }
  
  return periods;
};

/**
 * Checks if a period overlaps with a given month
 */
export const periodOverlapsMonth = (period: Period, monthIndex: number): boolean => {
  const month = MONTH_BOUNDARIES[monthIndex];
  if (!month) return false;
  
  // Handle wrap-around (e.g., period spans multiple years)
  if (period.end < period.start) {
    // Period wraps around year boundary
    return (
      (period.start <= month.end || period.end >= month.start) ||
      (period.start >= month.start && period.start <= month.end) ||
      (period.end >= month.start && period.end <= month.end)
    );
  }
  
  // Normal case: check if period overlaps with month
  return !(period.end < month.start || period.start > month.end);
};

/**
 * Gets the portion of a period that falls within a month (0-1)
 */
export const getPeriodCoverageInMonth = (period: Period, monthIndex: number): number => {
  const month = MONTH_BOUNDARIES[monthIndex];
  if (!month || !periodOverlapsMonth(period, monthIndex)) return 0;
  
  const monthLength = month.end - month.start + 1;
  const overlapStart = Math.max(period.start, month.start);
  const overlapEnd = Math.min(period.end, month.end);
  const overlapLength = overlapEnd - overlapStart + 1;
  
  return Math.min(overlapLength / monthLength, 1);
};


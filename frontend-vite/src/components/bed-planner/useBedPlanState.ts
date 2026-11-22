import { useCallback, useMemo, useState } from 'react';
import type { PlantInfo, PlantingInfo } from '../../api/season';
import type { LocalPoint } from './bedFrame';
import { shapeToWkt, translateShape } from './bedLayout';
import type { BedPlacement, BedPlanApi, BedPlanData, PlacementFields } from './types';

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

const newIri = (type: string) => `urn:bed-planner:${type}/${crypto.randomUUID()}`;

/** A placement moved to `to`; rows and areas move as a whole (x/y is their first point). */
const moved = (p: BedPlacement, to: LocalPoint): BedPlacement =>
  p.shape ? { ...p, ...to, shape: translateShape(p.shape, { x: to.x - p.x, y: to.y - p.y }) } : { ...p, ...to };

/** The fields as a `PlantPlacement` stores them (shape as WKT), for the action log. */
const stored = ({ shape, ...rest }: PlacementFields) => (shape ? { ...rest, shape: shapeToWkt(shape) } : rest);

/**
 * In-memory bed plan for Storybook: implements `BedPlanApi` on React state.
 * `onChange` receives every action (e.g. Storybook's action logger).
 */
export const useBedPlanState = (
  initial: BedPlanData,
  onChange?: (action: string, payload: Record<string, unknown>) => void,
): { data: BedPlanData; api: BedPlanApi } => {
  const [data, setData] = useState(initial);

  const addPlacement = useCallback(
    (plantingIri: string, fields: PlacementFields) => {
      const iri = newIri('PlantPlacement');
      setData((d) => ({ ...d, placements: [...d.placements, { iri, plantingIri, ...fields }] }));
      onChange?.('addPlacement', { iri, plantingIri, ...stored(fields) });
    },
    [onChange],
  );

  const movePlacement = useCallback(
    (placementIri: string, to: LocalPoint) => {
      setData((d) => ({
        ...d,
        placements: d.placements.map((p) => (p.iri === placementIri ? moved(p, to) : p)),
      }));
      onChange?.('movePlacement', { iri: placementIri, ...to });
    },
    [onChange],
  );

  const updatePlacement = useCallback(
    (placementIri: string, patch: Pick<BedPlacement, 'spacing' | 'rowSpacing'>) => {
      setData((d) => ({
        ...d,
        placements: d.placements.map((p) => (p.iri === placementIri ? { ...p, ...patch } : p)),
      }));
      onChange?.('updatePlacement', { iri: placementIri, ...patch });
    },
    [onChange],
  );

  const removePlacement = useCallback(
    (placementIri: string) => {
      setData((d) => ({ ...d, placements: d.placements.filter((p) => p.iri !== placementIri) }));
      onChange?.('removePlacement', { iri: placementIri });
    },
    [onChange],
  );

  const addPlanting = useCallback(
    async (plantIri: string) => {
      const plant = data.plants.find((p) => p.iri === plantIri);
      const planting: PlantingInfo = {
        iri: newIri('Planting'),
        name: plant?.name,
        patchIri: data.bed.iri,
        speciesIri: plant?.kind === 'variety' ? plant.speciesIri : plantIri,
        varietyIri: plant?.kind === 'variety' ? plantIri : undefined,
        role: 'main',
        status: 'planned',
        ...defaultPlantingDates(plant, data.season),
      };
      setData((d) => ({ ...d, plantings: [...d.plantings, planting] }));
      onChange?.('addPlanting', { ...planting });
      return planting.iri;
    },
    [data.plants, data.bed.iri, data.season, onChange],
  );

  const api = useMemo(
    () => ({ addPlacement, movePlacement, updatePlacement, removePlacement, addPlanting }),
    [addPlacement, movePlacement, updatePlacement, removePlacement, addPlanting],
  );
  return { data, api };
};

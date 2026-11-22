import { useCallback, useMemo, useState } from 'react';
import type { PlantingInfo } from '../../api/season';
import type { LocalPoint } from './bedFrame';
import { shapeToWkt } from './bedLayout';
import { defaultPlantingDates, movedPlacement } from './placementOps';
import type { BedPlacement, BedPlanApi, BedPlanData, PlacementFields } from './types';

const newIri = (type: string) => `urn:bed-planner:${type}/${crypto.randomUUID()}`;

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
        placements: d.placements.map((p) => (p.iri === placementIri ? movedPlacement(p, to) : p)),
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

  const setRotation = useCallback(
    (degrees: number | undefined) => {
      setData((d) => ({ ...d, rotation: degrees }));
      onChange?.('setRotation', { degrees });
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
    () => ({ addPlacement, movePlacement, updatePlacement, removePlacement, setRotation, addPlanting }),
    [addPlacement, movePlacement, updatePlacement, removePlacement, setRotation, addPlanting],
  );
  return { data, api };
};

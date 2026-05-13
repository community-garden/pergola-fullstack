import { useCallback, useMemo } from 'react';
import {
  addToGardenFeatureSelection,
  clearGardenFeatureSelection,
  selectGardenFeatures,
  type GardenFeatureIri,
} from '../store/slices/gardenFeatureSelectionSlice';
import { useAppDispatch, useAppSelector } from '../store';

export type { GardenFeatureIri };

/**
 * Garden feature selection by `@id` IRI: `select` replaces the set, `addToSelection` merges, `clearSelection` clears.
 */
export function useGardenFeatureSelection() {
  const dispatch = useAppDispatch();
  const selectedIris = useAppSelector((s) => s.gardenFeatureSelection.selectedIris);

  const select = useCallback(
    (iris: GardenFeatureIri | readonly GardenFeatureIri[]) => {
      dispatch(selectGardenFeatures(iris));
    },
    [dispatch],
  );

  const addToSelection = useCallback(
    (iris: GardenFeatureIri | readonly GardenFeatureIri[]) => {
      dispatch(addToGardenFeatureSelection(iris));
    },
    [dispatch],
  );

  const clearSelection = useCallback(() => {
    dispatch(clearGardenFeatureSelection());
  }, [dispatch]);

  return useMemo(
    () => ({
      selectedIris,
      select,
      addToSelection,
      clearSelection,
    }),
    [selectedIris, select, addToSelection, clearSelection],
  );
}

/** Alias for {@link useGardenFeatureSelection}. */
export const useSelectedGeoFeature = useGardenFeatureSelection;

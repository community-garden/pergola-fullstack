import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/** Garden / geo feature identity as JSON-LD `@id` (IRI string). */
export type GardenFeatureIri = string;

export interface GardenFeatureSelectionState {
  selectedIris: GardenFeatureIri[];
}

const initialState: GardenFeatureSelectionState = {
  selectedIris: [],
};

function normalizeIris(iris: GardenFeatureIri | readonly GardenFeatureIri[]): GardenFeatureIri[] {
  const list = typeof iris === 'string' ? [iris] : [...iris];
  return [...new Set(list)];
}

export const gardenFeatureSelectionSlice = createSlice({
  name: 'gardenFeatureSelection',
  initialState,
  reducers: {
    selectGardenFeatures: (
      state,
      action: PayloadAction<GardenFeatureIri | readonly GardenFeatureIri[]>,
    ) => {
      state.selectedIris = normalizeIris(action.payload);
    },
    addToGardenFeatureSelection: (
      state,
      action: PayloadAction<GardenFeatureIri | readonly GardenFeatureIri[]>,
    ) => {
      state.selectedIris = normalizeIris([...state.selectedIris, ...normalizeIris(action.payload)]);
    },
    clearGardenFeatureSelection: (state) => {
      state.selectedIris = [];
    },
  },
});

export const {
  selectGardenFeatures,
  addToGardenFeatureSelection,
  clearGardenFeatureSelection,
} = gardenFeatureSelectionSlice.actions;

export default gardenFeatureSelectionSlice.reducer;

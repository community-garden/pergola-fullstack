import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { formDataReducer } from '@graviola/edb-state-hooks';
import gardenFeatureSelectionReducer from './slices/gardenFeatureSelectionSlice';
import uiReducer from './slices/uiSlice';

// Combined store with both Graviola's formData reducer and our app's reducers
export const store = configureStore({
  reducer: {
    formData: formDataReducer,
    ui: uiReducer,
    gardenFeatureSelection: gardenFeatureSelectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
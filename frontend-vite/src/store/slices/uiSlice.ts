import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaletteMode } from '@mui/material';

export interface UiState {
  themeMode: PaletteMode;
  gardenId: string | null;
}

const initialState: UiState = {
  themeMode: 'light',
  gardenId: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<PaletteMode>) => {
      state.themeMode = action.payload;
    },
    toggleThemeMode: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setGardenId: (state, action: PayloadAction<string>) => {
      state.gardenId = action.payload;
    },
  },
});

export const { setThemeMode, toggleThemeMode, setGardenId } = uiSlice.actions;

export default uiSlice.reducer;
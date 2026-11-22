import { createTheme } from '@mui/material';

/** The MUI theme of the app (main.tsx); Storybook uses it too, so stories look like the app. */
export const appTheme = createTheme({
  palette: {
    primary: {
      main: '#628bff',
    },
    secondary: {
      main: '#9a9bff',
    },
  },
});

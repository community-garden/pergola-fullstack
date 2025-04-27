import React, { createContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';

// Create a basic theme context for compatibility
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// Theme provider props
interface ThemeContextProviderProps {
  children: ReactNode;
}

const headingsFontFamily = [
  'Oswald',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

// Create the theme based on the original frontend/src/theme.ts
const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      light: '#b1e5d6',
      main: '#009e7e',
      dark: '#006f52',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffbd4e',
      main: '#eb8d17',
      dark: '#b35f00',
      contrastText: '#fff',
    },
    grey: {
      200: '#eee', // light
      400: '#bdbdbd', // main
      800: '#424242', // dark
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: [
      'Open Sans',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    body1: {
      fontSize: '1rem',
    },
    body2: {
      // Body tag font size!
      fontSize: '.875rem',
    },
    h1: {
      fontSize: '5.5625rem',
      fontFamily: headingsFontFamily,
    },
    h2: {
      fontSize: '3.4375rem',
      fontFamily: headingsFontFamily,
    },
    h3: {
      fontSize: '2.75rem',
      fontFamily: headingsFontFamily,
    },
    h4: {
      fontSize: '1.9375rem',
      fontFamily: headingsFontFamily,
    },
    h5: {
      textTransform: 'uppercase' as 'uppercase',
      fontSize: '1.375rem',
      fontFamily: headingsFontFamily,
    },
    h6: {
      textTransform: 'uppercase' as 'uppercase',
      fontSize: '1.125rem',
      fontFamily: headingsFontFamily,
    },
    button: {
      textTransform: 'uppercase' as 'uppercase',
      fontWeight: 700,
    },
    caption: {
      fontSize: '.625rem',
    },
    subtitle1: {
      fontSize: '.9375rem',
      fontFamily: headingsFontFamily,
    },
    subtitle2: {
      fontSize: '.8125rem',
      fontFamily: headingsFontFamily,
    },
  },
  components: {
    MuiDialogContent: {
      styleOverrides: {
        root: {
          '@media (max-width:320px)': {
            padding: '0 1rem',
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white!important',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          width: '75%',
          height: '10px',
          margin: '2rem 0 0',
        },
        rail: {
          height: '10px',
          '&:before,&:after': {
            content: '""',
            position: 'absolute',
            display: 'inline-block',
            width: '12px',
            height: '10px',
            borderRadius: '5px',
          },
          '&:before': {
            left: '-4px',
            background: 'currentColor',
          },
          '&:after': {
            right: '-9px',
            background: 'currentColor',
          },
        },
        track: {
          height: '10px',
          '&:before': {
            content: '""',
            position: 'absolute',
            left: '-4px',
            display: 'inline-block',
            width: '12px',
            height: '10px',
            borderRadius: '5px',
            background: 'currentColor',
          },
        },
        mark: {
          width: '4px',
          height: '4px',
          marginTop: '3px',
          borderRadius: '100%',
        },
        thumb: {
          width: '18px',
          height: '18px',
          marginTop: '-4px',
          border: '2px solid #fff',
        },
        valueLabel: {
          left: 'calc(-50% - 2px)',
        },
      },
    },
  },
});

// Apply responsive font sizes
const theme = responsiveFontSizes(customTheme);

// Simple theme context provider component
export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  // Provide a dummy context value for compatibility
  const contextValue = {
    toggleColorMode: () => {},
    mode: 'light',
  };

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
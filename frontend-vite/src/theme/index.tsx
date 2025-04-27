import { createContext, ReactNode } from 'react';
import { ThemeProvider, createTheme, Theme, ThemeOptions } from '@mui/material';

// Create a basic theme context for compatibility
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// Theme provider props
interface ThemeContextProviderProps {
  children: ReactNode;
}

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      light: '#5c9ead',
      main: '#326273',
      dark: '#0c374b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e6e6e6',
      main: '#b4b4b4',
      dark: '#848484',
      contrastText: '#000000',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontSize: 14,
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontSize: '2rem',
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontSize: '1.75rem',
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontSize: '1.5rem',
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontSize: '1.25rem',
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
      textTransform: 'none',
    },
    h6: {
      fontSize: '1rem',
      fontFamily: '"Oswald", "Helvetica", "Arial", sans-serif',
    },
    body1: {
      fontSize: '1rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
    },
    subtitle1: {
      fontSize: '1rem',
    },
    subtitle2: {
      fontSize: '0.875rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

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
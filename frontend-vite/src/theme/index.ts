import { createTheme, responsiveFontSizes } from '@mui/material';
import { PaletteMode } from '@mui/material';
import { createContext, useMemo, useState, ReactNode } from 'react';

// Define the color palette based on the original theme
const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
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
    ...(mode === 'dark' ? {
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    } : {
      background: {
        default: '#f5f5f5',
        paper: '#fff',
      },
    }),
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
      fontSize: '.875rem',
    },
    h1: {
      fontSize: '5.5625rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    h2: {
      fontSize: '3.4375rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    h3: {
      fontSize: '2.75rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    h4: {
      fontSize: '1.9375rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    h5: {
      textTransform: 'uppercase',
      fontSize: '1.375rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    h6: {
      textTransform: 'uppercase',
      fontSize: '1.125rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    button: {
      textTransform: 'uppercase',
      fontWeight: 700
    },
    caption: {
      fontSize: '.625rem',
    },
    subtitle1: {
      fontSize: '.9375rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    subtitle2: {
      fontSize: '.8125rem',
      fontFamily: [
        'oswald',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          zIndex: 1100,
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
  },
});

// Create a context for theme mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

// Theme provider component
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const baseTheme = createTheme(getDesignTokens(mode));
    return responsiveFontSizes(baseTheme);
  }, [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeContextProvider;
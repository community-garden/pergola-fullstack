import './polyfills';
import { StrictMode } from 'react';
import { store } from '@store/index';
import { AuthProvider } from '@auth/index';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { appTheme } from './theme/appTheme';
import { SnackbarProvider } from 'notistack';
import { GraviolaProvider } from './provider/GraviolaProvider';
import { gardenConfiguration } from './schema/garden-schema';
import { allRenderers } from './provider/config';
import { materialCells } from '@jsonforms/material-renderers';
import { NewFeatureToast } from './components/garden/NewFeatureToast';
import './index.css';
import '@icon/icofont/icofont.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const SPARQL_API_URL = import.meta.env.VITE_SPARQL_API_URL || "http://localhost:7878/query";


// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Use garden configuration from schema file
const config = gardenConfiguration;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <SnackbarProvider 
              maxSnack={3}
              Components={{
                // @ts-ignore
                newFeature: NewFeatureToast,
              }}
            >
              {/* The router wraps Graviola so its intent bus (and modals) can navigate. */}
              <BrowserRouter>
              <GraviolaProvider
                apiBaseUrl={SPARQL_API_URL}
                schema={config.schema as any}
                renderers={allRenderers}
                cellRendererRegistry={materialCells}
                baseIRI={"https://ontology.semantic-desk.top/garden#"}
                entityBaseIRI={"https://data.semantic-desk.top/garden/"}
                primaryFields={config.primaryFields}
                typeNameLabelMap={config.typeNameLabelMap}
                typeNameUiSchemaOptionsMap={config.typeNameUiSchemaOptionsMap}
                uischemata={config.uischemata}
              >
                <App />
              </GraviolaProvider>
              </BrowserRouter>
            </SnackbarProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);

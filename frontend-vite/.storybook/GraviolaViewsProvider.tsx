import React, { useMemo, type ReactNode } from "react";
import type { Decorator } from "@storybook/react";
import NiceModal from "@ebay/nice-modal-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  AdbProvider,
  CrudProviderContext,
  GraviolaIntentBusProvider,
  type GraviolaIntent,
} from "@graviola/edb-state-hooks";
import { createSemanticConfig, createStubSchema } from "@graviola/semantic-json-form";
import type { JSONSchema7 } from "json-schema";
import { gardenConfiguration } from "../src/schema/garden-schema";
import { useDetailViewConfig } from "../src/provider/useDetailViewConfig";
import { appTheme } from "../src/theme/appTheme";

const BASE_IRI = "https://ontology.semantic-desk.top/garden#";
const ENTITY_BASE_IRI = "https://data.semantic-desk.top/garden/";

const config = createSemanticConfig({ baseIRI: BASE_IRI });
const semanticConfig = {
  ...config,
  queryBuildOptions: {
    ...config.queryBuildOptions,
    primaryFields: gardenConfiguration.primaryFields,
    sparqlFlavour: "oxigraph" as const,
  },
};

const makeStubSchema = (schema: JSONSchema7) =>
  createStubSchema(schema, {
    entityBaseIRI: ENTITY_BASE_IRI,
    definitionToTypeIRI: (name: string) => `${BASE_IRI}${name}`,
  });

/** No SPARQL in Storybook: the views render from the data passed in. */
const NO_STORE = { crudOptions: null, dataStore: null, isReady: false };

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });

/** Clicks on nested entities etc. only show up in the browser console. */
const logIntent = (intent: GraviolaIntent) => {
  console.info("[story] intent", intent);
};

const GraviolaViews = ({ children }: { children: ReactNode }) => {
  // the same detail view settings as the app (labels from the JSON Forms translations, hidden fields)
  const viewConfig = useDetailViewConfig();
  const env = useMemo(() => ({ publicBasePath: "", baseIRI: BASE_IRI }), []);
  return (
    <AdbProvider
      {...semanticConfig}
      env={env}
      schema={gardenConfiguration.schema as JSONSchema7}
      makeStubSchema={makeStubSchema}
      viewConfig={viewConfig}
    >
      <CrudProviderContext.Provider value={NO_STORE}>
        <GraviolaIntentBusProvider dispatch={logIntent}>
          <NiceModal.Provider>{children}</NiceModal.Provider>
        </GraviolaIntentBusProvider>
      </CrudProviderContext.Provider>
    </AdbProvider>
  );
};

/**
 * Graviola context for the semantic views (detail, card, list item, chip)
 * with the full garden schema, the app theme and the app's view settings —
 * but without a store. Stories pass the entities as data.
 */
export const withGraviolaViews = (): Decorator => (Story) => (
  <ThemeProvider theme={appTheme}>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <GraviolaViews>
        <Story />
      </GraviolaViews>
    </QueryClientProvider>
  </ThemeProvider>
);

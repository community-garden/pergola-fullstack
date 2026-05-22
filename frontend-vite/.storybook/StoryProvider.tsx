import React from "react";
import type { Decorator } from "@storybook/react";
import NiceModal from "@ebay/nice-modal-react";
import { AdbProvider } from "@graviola/edb-state-hooks";
import { MediaConfigProvider } from "../src/components/graviola/renderers/image-upload/MediaConfigContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import {
  createSemanticConfig,
  SemanticJsonFormNoOps,
  createStubSchema,
} from "@graviola/semantic-json-form";
import { useRouterMock } from "../src/provider/GraviolaProvider";
import { plantSchema, plantConfiguration } from "../src/schema/plant-schema";

const BASE_IRI = "https://ontology.semantic-desk.top/garden#";
const ENTITY_BASE_IRI = "https://data.semantic-desk.top/garden/";

const config = createSemanticConfig({ baseIRI: BASE_IRI });
const semanticConfig = {
  ...config,
  queryBuildOptions: {
    ...config.queryBuildOptions,
    primaryFields: plantConfiguration.primaryFields,
  },
};

const makeStubSchema = (schema: any) =>
  createStubSchema(schema, {
    entityBaseIRI: ENTITY_BASE_IRI,
    definitionToTypeIRI: (name: string) => `${BASE_IRI}${name}`,
  });

/**
 * Wraps the story in AdbProvider (Graviola semantic context). Required for any
 * component that calls useAdbContext(). Pass a Turtle string to pre-load an
 * in-memory RDF store once @graviola/indexeddb-store-provider is published.
 */
// In Storybook, relative /api/media would resolve to the storybook host.
// Point to the real dev API instead; UISchema options.apiBase overrides per-field.
const STORYBOOK_MEDIA_API_BASE = "https://dev01.pergola.kuenste.live/api/media";

export const withStoryProvider = (_turtleData?: string): Decorator =>
  (Story) => (
    <MediaConfigProvider mediaApiBase={STORYBOOK_MEDIA_API_BASE}>
      <AdbProvider
        {...semanticConfig}
        env={{ publicBasePath: "", baseIRI: BASE_IRI }}
        components={{
          EditEntityModal: () => null,
          EntityDetailModal: () => null,
          SemanticJsonForm: SemanticJsonFormNoOps,
          SimilarityFinder: () => null,
        }}
        useRouterHook={useRouterMock}
        schema={plantSchema as any}
        makeStubSchema={makeStubSchema}
      >
        <NiceModal.Provider>
          <Story />
        </NiceModal.Provider>
      </AdbProvider>
    </MediaConfigProvider>
  );

// ── Router decorator ──────────────────────────────────────────────────────────

export type RouterParams = {
  /** URL to start at, e.g. "/garden/123/watering/wizard/0" */
  initialEntry?: string;
  /** Route path pattern that matches the story component, e.g. "/garden/:id/wizard/:step" */
  path?: string;
  /** Extra routes rendered alongside the story's route, used for navigation targets */
  additionalRoutes?: Array<{ path: string; element: React.ReactNode }>;
};

/**
 * Wraps the story in a MemoryRouter with a single Routes/Route so components
 * using useNavigate / useParams / useLocation work without a real browser URL.
 *
 * Defaults can be overridden per-story via `parameters.router`:
 * ```ts
 * export const Step2: Story = {
 *   parameters: { router: { initialEntry: '/garden/123/watering/wizard/2' } },
 * };
 * ```
 */
export const withRouter = (defaults: RouterParams = {}): Decorator =>
  (Story, context) => {
    const overrides = (context.parameters?.router ?? {}) as Partial<RouterParams>;
    const initialEntry = overrides.initialEntry ?? defaults.initialEntry ?? "/";
    const path = overrides.path ?? defaults.path ?? "*";
    const additionalRoutes =
      overrides.additionalRoutes ?? defaults.additionalRoutes ?? [];

    return (
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path={path} element={<Story />} />
          {additionalRoutes.map((r) => (
            <Route
              key={r.path}
              path={r.path}
              element={r.element as React.ReactElement}
            />
          ))}
          {/* Catch-all so navigation calls don't throw "No routes matched" */}
          <Route path="*" element={null} />
        </Routes>
      </MemoryRouter>
    );
  };

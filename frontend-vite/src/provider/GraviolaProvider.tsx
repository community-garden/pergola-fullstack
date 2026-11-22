"use client";

import React, { useCallback, useMemo } from "react";
import {
  AdbProvider,
  useAdbContext,
  useDataStore,
  SemanticFormSlotProvider,
  FinderSlotProvider,
  ModalRegistryProvider,
  MODAL_EDIT_ENTITY,
  MODAL_ENTITY_DETAIL,
  MODAL_SIMILARITY_FINDER,
} from "@graviola/edb-state-hooks";
import {
  PrimaryFieldDeclaration,
  SparqlEndpoint,
} from "@graviola/edb-core-types";
import NiceModal from "@ebay/nice-modal-react";
import { SparqlStoreProvider } from "@graviola/sparql-store-provider";
import {
  EditEntityModal,
  KBMainDatabase,
  SimilarityFinderDrawer,
} from "@graviola/edb-advanced-components";
import { EntityFinder } from "@graviola/entity-finder";
import {
  createSemanticConfig,
  SemanticJsonFormNoOps,
  createUISchemata,
  createStubSchema,
} from "@graviola/semantic-json-form";
import {
  EntityFinderProps,
  FinderKnowledgeBaseDescription,
  GlobalSemanticConfig,
} from "@graviola/semantic-jsonform-types";
import {
  JsonFormsCellRendererRegistryEntry,
  JsonFormsRendererRegistryEntry,
  UISchemaElement,
} from "@jsonforms/core";
import { JSONSchema7 } from "json-schema";
import { allRenderers } from "./config";
import { usePlantKnowledgeBases } from "../knowledge-bases";
import { plantMappings } from "../mappings";
import { MediaConfigProvider } from "../components/graviola/renderers/image-upload/MediaConfigContext";
import { useJsonFormsTranslator } from "../hooks/useJsonFormsTranslator";
import { PergolaIntentBus } from "./PergolaIntentBus";
import { useDetailViewConfig } from "./useDetailViewConfig";
import { PergolaEntityDetailModal } from "../components/entity-detail/PergolaEntityDetailModal";
import type { SemanticJsonFormNoOpsProps } from "@graviola/semantic-jsonform-types";

/**
 * Form slot used by every Graviola form (edit modal, inline forms, …).
 * Injects the i18next-backed JSON Forms translator so labels and enum
 * options come from i18n/<lang>/jsonforms.json.
 */
const TranslatedSemanticJsonForm = (props: SemanticJsonFormNoOpsProps) => {
  const { locale, translate } = useJsonFormsTranslator();
  const jsonFormsProps = useMemo(
    () =>
      ({ ...props.jsonFormsProps, i18n: { locale, translate } }) as SemanticJsonFormNoOpsProps["jsonFormsProps"],
    [props.jsonFormsProps, locale, translate],
  );
  return <SemanticJsonFormNoOps {...props} jsonFormsProps={jsonFormsProps} />;
};

type GraviolaProviderProps = {
  apiBaseUrl: string;
  baseIRI: string;
  entityBaseIRI: string;
  children: React.ReactNode;
  schema: JSONSchema7;
  renderers?: JsonFormsRendererRegistryEntry[];
  cellRendererRegistry?: JsonFormsCellRendererRegistryEntry[];
  typeNameLabelMap: Record<string, string>;
  typeNameUiSchemaOptionsMap: Record<string, any>;
  primaryFields: PrimaryFieldDeclaration;
  uischemata?: Record<string, UISchemaElement>;
};

const SimilarityFinder = (props: EntityFinderProps) => {
  const { queryBuildOptions } = useAdbContext();
  const { dataStore } = useDataStore();
  const plantKBs = usePlantKnowledgeBases();
  
  const allKnowledgeBases = useMemo<FinderKnowledgeBaseDescription<any>[]>(
    () =>
      dataStore
        ? [
          KBMainDatabase(
            dataStore,
            queryBuildOptions.primaryFields,
            queryBuildOptions.typeIRItoTypeName,
          ),
          ...plantKBs,
        ]
        : [],
    [
      dataStore,
      queryBuildOptions.primaryFields,
      queryBuildOptions.typeIRItoTypeName,
      plantKBs,
    ],
  );
  return <EntityFinder {...props} allKnowledgeBases={allKnowledgeBases} />;
};

export const GraviolaProvider: React.FC<GraviolaProviderProps> = ({
  children,
  baseIRI,
  entityBaseIRI,
  schema,
  uischemata,
  primaryFields,
  renderers,
  cellRendererRegistry,
  apiBaseUrl,
  typeNameLabelMap,
  typeNameUiSchemaOptionsMap,
}: GraviolaProviderProps) => {
  const endpoint: SparqlEndpoint = useMemo(() => {
    return {
      endpoint: `${apiBaseUrl}`,
      label: "SPARQL service",
      provider: "oxigraph",
      active: true,
      // No auth for now
    };
  }, [apiBaseUrl]);

  const definitionToTypeIRI = (definitionName: string) =>
    `${baseIRI}${definitionName}`;

  const { registry } = useMemo(
    () =>
      createUISchemata(schema as JSONSchema7, {
        typeNameLabelMap,
        typeNameUiSchemaOptionsMap,
        definitionToTypeIRI,
      }),
    [schema, typeNameLabelMap, typeNameUiSchemaOptionsMap, definitionToTypeIRI],
  );

  const config = useMemo<GlobalSemanticConfig>(() => {
    const c = createSemanticConfig({ baseIRI });
    return {
      ...c,
      queryBuildOptions: {
        ...c.queryBuildOptions,
        primaryFields,
        sparqlFlavour: "oxigraph",
      },
    };
  }, [baseIRI, entityBaseIRI, primaryFields]);

  const makeStubSchema = useCallback(
    (schema: JSONSchema7) => {
      return createStubSchema(schema, { entityBaseIRI, definitionToTypeIRI })
    },
    [entityBaseIRI, definitionToTypeIRI],
  );

  const viewConfig = useDetailViewConfig();

  const rendererRegistry = useMemo(
    () => [...allRenderers, ...(renderers || [])],
    [renderers],
  );

  const modals = useMemo(
    () => ({
      [MODAL_EDIT_ENTITY]: EditEntityModal,
      // own shell around Graviola's detail renderer: no large side image
      [MODAL_ENTITY_DETAIL]: PergolaEntityDetailModal,
      [MODAL_SIMILARITY_FINDER]: SimilarityFinderDrawer,
    }),
    [],
  );

  return (
    <MediaConfigProvider>
    <AdbProvider
      {...config}
      env={{
        publicBasePath: "",
        baseIRI,
      }}
      schema={schema}
      makeStubSchema={makeStubSchema}
      uiSchemaDefaultRegistry={registry}
      rendererRegistry={rendererRegistry}
      cellRendererRegistry={cellRendererRegistry}
      uischemata={uischemata}
      normDataMapping={plantMappings}
      viewConfig={viewConfig}
    >
      <SemanticFormSlotProvider Component={TranslatedSemanticJsonForm}>
        <FinderSlotProvider Component={SimilarityFinder}>
          <ModalRegistryProvider modals={modals}>
            <SparqlStoreProvider
              endpoint={endpoint}
              defaultLimit={20}
              walkerOptions={{
                maxRecursion: 2,
                maxRecursionEachRef: 2,
              }}
              enableInversePropertiesFeature={true}
            >
              <PergolaIntentBus>
                <NiceModal.Provider>{children}</NiceModal.Provider>
              </PergolaIntentBus>
            </SparqlStoreProvider>
          </ModalRegistryProvider>
        </FinderSlotProvider>
      </SemanticFormSlotProvider>
    </AdbProvider>
    </MediaConfigProvider>
  );
};


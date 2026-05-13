"use client";

import React, { useCallback, useEffect, useMemo } from "react";
import {
  AdbProvider,
  useAdbContext,
  useDataStore,
} from "@graviola/edb-state-hooks";
import {
  PrimaryFieldDeclaration,
  SparqlEndpoint,
} from "@graviola/edb-core-types";
import NiceModal from "@ebay/nice-modal-react";
import { SparqlStoreProvider } from "@graviola/sparql-store-provider";
import {
  EditEntityModal,
  EntityDetailModal,
  KBMainDatabase,
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
  ModRouter,
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

export const useRouterMock = () => {
  return {
    push: async (url: string) => {
      console.log("push", url);
    },
    replace: async (url: string) => {
      console.log("replace", url);
    },
    asPath: "",
    pathname: "",
    query: {},
    searchParams: {},
  } as ModRouter;
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
      },
    };
  }, [baseIRI, entityBaseIRI, primaryFields]);

  useEffect(() => {
    console.log("uischemata", uischemata);
  }, [uischemata]);

  const makeStubSchema = useCallback(
    (schema: JSONSchema7) => {
      return createStubSchema(schema, { entityBaseIRI, definitionToTypeIRI })
    },
    [entityBaseIRI, definitionToTypeIRI],
  );

  const rendererRegistry = useMemo(
    () => [...allRenderers, ...(renderers || [])],
    [renderers],
  );

  // @ts-ignore
  return (
    <AdbProvider
      {...config}
      env={{
        publicBasePath: "",
        baseIRI,
      }}
      components={{
        EditEntityModal: EditEntityModal,
        EntityDetailModal: EntityDetailModal,
        SemanticJsonForm: SemanticJsonFormNoOps,
        SimilarityFinder: SimilarityFinder,
      }}
      useRouterHook={useRouterMock}
      schema={schema}
      makeStubSchema={makeStubSchema}
      uiSchemaDefaultRegistry={registry}
      rendererRegistry={rendererRegistry}
      cellRendererRegistry={cellRendererRegistry}
      uischemata={uischemata}
      normDataMapping={plantMappings}
    >
      <SparqlStoreProvider
        endpoint={endpoint}
        defaultLimit={20}
        walkerOptions={{
          maxRecursion: 2,
          maxRecursionEachRef: 2,
        }}
        enableInversePropertiesFeature={true}
      >
        <NiceModal.Provider>{children}</NiceModal.Provider>
      </SparqlStoreProvider>
    </AdbProvider>
  );
};


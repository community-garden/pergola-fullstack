import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { JSONSchema7 } from "json-schema";
import { bringDefinitionToTop } from "@graviola/json-schema-utils";
import {
  createDeleteRowEntry,
  defaultEntityActionRegistry,
  defaultValueRenderers,
} from "@graviola/edb-detail-renderer";
import type {
  EntityActionContext,
  EntityActionEntry,
} from "@graviola/edb-detail-renderer-core";
import {
  MODAL_ENTITY_DETAIL,
  useAdbContext,
  useAdaptiveListSearch,
  useDataStore,
  useDispatchIntent,
  useGraviolaModal,
  useHostCapabilities,
  useViewDensity,
} from "@graviola/edb-state-hooks";
import {
  JsonLdTableProvider,
  resolveShowCreateEntry,
  SemanticTableListView,
  type SemanticTableProps,
} from "@graviola/edb-table-components";

import { resolveTableRowEntityActions } from "./resolveTableRowEntityActions";

const DEFAULT_PAGE_SIZE = 25;

type PergolaAdaptiveListTableProps = SemanticTableProps & {
  viewSwitchAction?: ReactNode;
};

/**
 * List presentation for {@link PergolaSemanticTable}: Graviola's adaptive
 * quick filter (`useAdaptiveListSearch`) plus `SemanticTableListView` so row
 * menus stay aligned with the table view.
 */
export const PergolaAdaptiveListTable = ({
  typeName,
  actionRegistry,
  callbacks: callbacksProp,
  onShowEntry: onShowEntryProp,
  onEditEntry: onEditEntryProp,
  showCreateEntry,
  layout = "fill",
  toolbarDisplay,
  density,
  width,
  jsonLdCell,
  viewSwitchAction,
}: PergolaAdaptiveListTableProps) => {
  const { t } = useTranslation();
  const {
    queryBuildOptions,
    typeNameToTypeIRI,
    typeIRIToTypeName,
    createEntityIRI,
    schema,
    tableActionRegistry,
    entityActionRegistry,
    table: tableAppConfig,
  } = useAdbContext();
  const { dataStore, ready } = useDataStore();
  const dispatchIntent = useDispatchIntent();
  const detailModal = useGraviolaModal(MODAL_ENTITY_DETAIL);
  const capabilities = useHostCapabilities();
  const { density: viewDensity } = useViewDensity();
  const typeIRI = useMemo(() => typeNameToTypeIRI(typeName), [typeName, typeNameToTypeIRI]);
  const loadedSchema = useMemo(
    () => bringDefinitionToTop(schema, typeName) as JSONSchema7,
    [schema, typeName],
  );

  const callbackCreateOverridden =
    callbacksProp !== undefined &&
    Object.prototype.hasOwnProperty.call(callbacksProp, "onCreateEntry");
  const showCreate = useMemo(
    () =>
      resolveShowCreateEntry({
        typeName,
        showCreateEntry,
        tableConfig: tableAppConfig,
        callbackCreateOverridden,
        callbackCreateValue: callbacksProp?.onCreateEntry,
      }),
    [typeName, showCreateEntry, tableAppConfig, callbackCreateOverridden, callbacksProp?.onCreateEntry],
  );

  const editEntry = useCallback(
    (id: string) => {
      if (onEditEntryProp) {
        onEditEntryProp(id, typeIRI);
      } else {
        dispatchIntent({
          kind: "edit-entity",
          typeName,
          entityIRI: id,
          origin: { source: `pergola-list:${typeName}` },
        });
      }
    },
    [dispatchIntent, onEditEntryProp, typeIRI, typeName],
  );

  const showEntry = useCallback(
    (id: string) => {
      if (onShowEntryProp) {
        onShowEntryProp(id, typeIRI);
      } else {
        detailModal.show(
          { typeIRI, entityIRI: id, disableInlineEditing: true },
          { origin: { source: `pergola-list:${typeName}` } },
        );
      }
    },
    [detailModal, onShowEntryProp, typeIRI, typeName],
  );

  const storeCallbacks = useMemo(
    () => ({
      ...(showCreate ? { onCreateEntry: () => editEntry(createEntityIRI(typeName)) } : {}),
      onShowEntry: (id: string) => showEntry(id),
      onEditEntry: (id: string) => editEntry(id),
    }),
    [showCreate, editEntry, showEntry, createEntityIRI, typeName],
  );

  const mergedCallbacks = useMemo(
    () => ({ ...storeCallbacks, ...callbacksProp }),
    [storeCallbacks, callbacksProp],
  );

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const adaptive = useAdaptiveListSearch({
    store: dataStore,
    typeName,
    pageSize,
    primaryFields: queryBuildOptions.primaryFields,
    enabled: ready && Boolean(dataStore),
    queryKeyPrefix: `pergola-adaptive-list:${typeName}`,
  });

  const pagination = useMemo(
    () => ({ pageIndex: adaptive.page, pageSize }),
    [adaptive.page, pageSize],
  );

  const handlePaginationChange = useCallback(
    (next: { pageIndex: number; pageSize: number }) => {
      if (next.pageSize !== pageSize) {
        setPageSize(next.pageSize);
      }
      adaptive.onPageChange(next.pageIndex);
    },
    [adaptive, pageSize],
  );

  const listSearchMode = adaptive.searchMode === "local" ? "client" : "server";

  const runtimeRegistry = useMemo(() => {
    const entries: EntityActionEntry[] = [
      ...defaultEntityActionRegistry,
      ...(entityActionRegistry ?? []),
      ...((actionRegistry as EntityActionEntry[] | undefined) ?? []),
      ...(tableActionRegistry ?? []),
    ];
    if (mergedCallbacks.onRemoveEntry) {
      entries.push(createDeleteRowEntry(mergedCallbacks.onRemoveEntry));
    }
    return entries;
  }, [
    entityActionRegistry,
    actionRegistry,
    tableActionRegistry,
    mergedCallbacks.onRemoveEntry,
  ]);

  const buildEntityActionContext = useCallback(
    (surface: EntityActionContext["surface"], targets: EntityActionContext["targets"]) =>
      ({
        surface,
        density: viewDensity,
        rootSchema: loadedSchema,
        typeName,
        typeIRI,
        targets,
        capabilities,
        dispatchIntent: (intent) => Promise.resolve(dispatchIntent(intent)),
        t: (key, opts) => String(t(key, opts)),
      }) satisfies EntityActionContext,
    [viewDensity, loadedSchema, typeName, typeIRI, capabilities, dispatchIntent, t],
  );

  const rowActionHandlers = useMemo(
    () => ({
      dispatchIntent,
      showEntry: mergedCallbacks.onShowEntry
        ? (id: string, iri?: string) => mergedCallbacks.onShowEntry?.(id, iri ?? typeIRI)
        : undefined,
      editEntry: mergedCallbacks.onEditEntry
        ? (id: string, iri?: string) => mergedCallbacks.onEditEntry?.(id, iri ?? typeIRI)
        : undefined,
    }),
    [dispatchIntent, mergedCallbacks.onShowEntry, mergedCallbacks.onEditEntry, typeIRI],
  );

  const resolveRowActions = useCallback(
    (row: { id: string; original: unknown }) =>
      resolveTableRowEntityActions({
        registry: runtimeRegistry,
        schema: loadedSchema,
        buildContext: (targets) => buildEntityActionContext("tableRow", targets),
        row: {
          entityIRI: row.id,
          typeName,
          typeIRI,
          data: row.original,
        },
        handlers: rowActionHandlers,
      }),
    [runtimeRegistry, loadedSchema, buildEntityActionContext, typeName, typeIRI, rowActionHandlers],
  );

  const locale =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("locale") ?? "en"
      : "en";

  const jsonLdProviderValue = useMemo(
    () => ({
      ChipComponent: jsonLdCell?.ChipComponent,
      valueRenderers: [...(jsonLdCell?.extraValueRenderers ?? []), ...defaultValueRenderers],
      onShowEntry: (entityIRI: string) => showEntry(entityIRI),
      typeIRIToTypeName,
      locale,
    }),
    [jsonLdCell, showEntry, typeIRIToTypeName, locale],
  );

  return (
    <JsonLdTableProvider value={jsonLdProviderValue}>
      <SemanticTableListView
        typeName={typeName}
        typeIRI={typeIRI}
        layout={layout}
        data={adaptive.documents}
        rowShape="jsonld"
        rowCount={adaptive.totalHits}
        isLoading={!ready || (!adaptive.hasData && adaptive.isFetching)}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        manualPagination={adaptive.totalHits > pageSize}
        callbacks={mergedCallbacks}
        resolveRowActions={resolveRowActions}
        locale={locale}
        toolbarDisplay={toolbarDisplay}
        density={density}
        width={width}
        viewSwitchAction={viewSwitchAction}
        listSearch={adaptive.search}
        onListSearchChange={adaptive.setSearch}
        listSearchMode={listSearchMode}
      />
    </JsonLdTableProvider>
  );
};
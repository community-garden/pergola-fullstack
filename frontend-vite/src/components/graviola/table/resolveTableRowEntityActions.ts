import {
  type EntityActionContext,
  type EntityActionEntry,
  selectEntityActions,
} from "@graviola/edb-detail-renderer-core";
import type { GraviolaIntent } from "@graviola/edb-state-hooks";
import type { JSONSchema7 } from "json-schema";
import type { TableAction } from "@graviola/edb-table-components";

import { entityActionsToTableActions } from "./entityActionsToTableActions";

export type ResolveTableRowEntityActionsParams = {
  registry: EntityActionEntry[];
  schema: JSONSchema7;
  buildContext: (targets: EntityActionContext["targets"]) => EntityActionContext;
  row: {
    entityIRI: string;
    typeName: string;
    typeIRI?: string;
    data?: unknown;
  };
  handlers: {
    dispatchIntent: (intent: GraviolaIntent) => void | Promise<unknown>;
    showEntry?: (entityIRI: string, typeIRI?: string) => void;
    editEntry?: (entityIRI: string, typeIRI?: string) => void;
  };
};

export function resolveTableRowEntityActions(
  params: ResolveTableRowEntityActionsParams,
): TableAction[] {
  const targets = [params.row];
  const resolved = selectEntityActions(
    params.registry,
    params.schema,
    params.buildContext(targets),
  );
  return entityActionsToTableActions(resolved, params.handlers);
}
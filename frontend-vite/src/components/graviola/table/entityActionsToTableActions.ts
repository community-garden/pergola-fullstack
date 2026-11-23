import type { EntityActionDef } from "@graviola/edb-core-types";
import type { ResolvedEntityAction } from "@graviola/edb-detail-renderer-core";
import type { GraviolaIntent } from "@graviola/edb-state-hooks";
import type { TableAction } from "@graviola/edb-table-components";

export function entityActionsToTableActions(
  actions: ResolvedEntityAction[],
  handlers: {
    dispatchIntent: (intent: GraviolaIntent) => void | Promise<unknown>;
    showEntry?: (entityIRI: string, typeIRI?: string) => void;
    editEntry?: (entityIRI: string, typeIRI?: string) => void;
  },
): TableAction[] {
  return actions.map(({ def }) => ({
    id: def.id,
    label: def.label,
    destructive: def.destructive,
    run: async (entities) => {
      if (def.run) {
        await def.run(entities);
        return;
      }
      await runEntityActionIntent(def, entities[0], handlers);
    },
  }));
}

async function runEntityActionIntent(
  def: EntityActionDef,
  target:
    | { entityIRI: string; typeIRI?: string; data?: unknown; typeName?: string }
    | undefined,
  handlers: {
    dispatchIntent: (intent: GraviolaIntent) => void | Promise<unknown>;
    showEntry?: (entityIRI: string, typeIRI?: string) => void;
    editEntry?: (entityIRI: string, typeIRI?: string) => void;
  },
) {
  if (!target?.entityIRI) return;

  switch (def.intent) {
    case "show":
      handlers.showEntry?.(target.entityIRI, target.typeIRI);
      break;
    case "edit":
      handlers.editEntry?.(target.entityIRI, target.typeIRI);
      break;
    case "open-in-route":
    case "open-in-new-tab":
    case "open-in-window":
      await handlers.dispatchIntent({
        kind: "show-entity",
        entityIRI: target.entityIRI,
        typeIRI: target.typeIRI,
        typeName: target.typeName,
        data: target.data,
        presentation:
          def.intent === "open-in-route"
            ? "route"
            : def.intent === "open-in-new-tab"
              ? "new-tab"
              : "new-window",
      });
      break;
    case "custom":
    default:
      if (def.href) {
        window.open(def.href, "_blank", "noopener,noreferrer");
      }
      break;
  }
}
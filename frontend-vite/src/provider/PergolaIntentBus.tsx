import { useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  GraviolaIntentBusProvider,
  MODAL_EDIT_ENTITY,
  MODAL_ENTITY_DETAIL,
  useAdbContext,
  type GraviolaIntent,
} from "@graviola/edb-state-hooks";
import { SEASON_QUERY_KEY } from "../api/season";

/**
 * Answers the intents Graviola components dispatch (show, edit, create,
 * saved, removed, navigate, …).
 *
 * It must wrap `NiceModal.Provider`: Graviola's modals (detail view, edit
 * form) are rendered there, outside the routed pages, and dispatch intents
 * themselves — e.g. "Edit" in the detail view or "saved" after a form save.
 * A bus inside the page layout would never see them.
 */
export const PergolaIntentBus = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation("garden");
  const queryClient = useQueryClient();
  const { typeNameToTypeIRI, createEntityIRI } = useAdbContext();

  const dispatch = useCallback(
    (intent: GraviolaIntent) => {
      switch (intent.kind) {
        case "show-entity":
          return NiceModal.show(MODAL_ENTITY_DETAIL, {
            entityIRI: intent.entityIRI,
            typeIRI: intent.typeIRI ?? (intent.typeName ? typeNameToTypeIRI(intent.typeName) : undefined),
            data: intent.data,
            readonly: true,
          });
        case "edit-entity":
          return NiceModal.show(MODAL_EDIT_ENTITY, {
            entityIRI: intent.entityIRI,
            typeIRI: typeNameToTypeIRI(intent.typeName),
          }).catch(() => undefined); // cancelled
        case "create-entity": {
          const entityIRI = intent.entityIRI ?? createEntityIRI(intent.typeName);
          const typeIRI = typeNameToTypeIRI(intent.typeName);
          return NiceModal.show(MODAL_EDIT_ENTITY, {
            entityIRI,
            typeIRI,
            data: { "@id": entityIRI, "@type": typeIRI },
            disableLoad: true,
          }).catch(() => undefined); // cancelled
        }
        case "entity-saved":
          // The season planner and map read plantings, beds and plants through
          // their own queries; refresh them after any save in a Graviola form.
          void queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEY });
          enqueueSnackbar(t(intent.created ? "intents.created" : "intents.saved"), { variant: "success" });
          return;
        case "entity-save-failed":
          enqueueSnackbar(t("intents.saveFailed", { message: intent.error.message }), { variant: "error" });
          return;
        case "entity-removed":
          void queryClient.invalidateQueries({ queryKey: SEASON_QUERY_KEY });
          enqueueSnackbar(t("intents.removed"), { variant: "success" });
          return;
        case "entity-removal-failed":
          enqueueSnackbar(t("intents.removeFailed", { message: intent.error.message }), { variant: "error" });
          return;
        case "reload-completed":
          enqueueSnackbar(intent.message, { variant: intent.ok ? "success" : "error" });
          return;
        case "navigate":
          return navigate(intent.href);
      }
    },
    [createEntityIRI, enqueueSnackbar, navigate, queryClient, t, typeNameToTypeIRI],
  );

  return <GraviolaIntentBusProvider dispatch={dispatch}>{children}</GraviolaIntentBusProvider>;
};

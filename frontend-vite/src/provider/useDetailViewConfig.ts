import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import NiceModal from "@ebay/nice-modal-react";
import { MODAL_ENTITY_DETAIL } from "@graviola/edb-state-hooks";
import type { ViewConfig, ViewConfigSet } from "@graviola/semantic-jsonform-types";
import type { EntityActionDef } from "@graviola/edb-core-types";
import { createActionsTopLevelLayout } from "./bedDetailLayout";
import { lastSegment } from "../utils/iri";

/** Technical fields that gardeners do not need in a detail view. */
const HIDDEN_IN_DETAIL = ["geo", "creationTime", "modificationTime"];

/**
 * View configuration for Graviola's detail views (EntityDetailModal →
 * SemanticDetailView).
 *
 * The detail renderer has no translator hook; it takes labels from the
 * schema titles or from the UI schema. The JSON Forms translations
 * (i18n/<lang>/jsonforms.json, `{ "<property>": { "label": … } }`) are turned
 * into label overrides per property scope, so detail views and forms use the
 * same wording.
 */
export const useDetailViewConfig = (
  /** Router navigation; without it (Storybook) the bed action is left out. */
  navigate?: (to: string) => void,
): ViewConfigSet => {
  const { i18n } = useTranslation("jsonforms");
  const language = i18n.resolvedLanguage ?? i18n.language;

  return useMemo(() => {
    const bundle = (i18n.getResourceBundle(language, "jsonforms") ?? {}) as Record<
      string,
      { label?: unknown } | unknown
    >;
    const scopeOverride: Record<string, { label: string }> = {};
    for (const [property, entry] of Object.entries(bundle)) {
      const label = (entry as { label?: unknown })?.label;
      if (typeof label === "string" && !property.startsWith("@")) {
        scopeOverride[`#/properties/${property}`] = { label };
      }
    }
    return {
      detail: {
        maxDepth: 4,
        hiddenPropertyNames: HIDDEN_IN_DETAIL,
        defaultGenerationOptions: { scopeOverride },
        // A bed's detail card gets an action to its planning (bed plan).
        ...(navigate && {
          extraRenderers: [
            createActionsTopLevelLayout("Patch", [
              {
                id: "open-bed-plan",
                label: i18n.t("garden:bedPlanner.openBedPlan"),
                icon: "🌱",
                intent: "custom" as const,
                primary: true,
                run: ([target]: Parameters<NonNullable<EntityActionDef["run"]>>[0]) => {
                  if (!target?.entityIRI) return;
                  const gardenId = decodeURIComponent(window.location.pathname.split("/")[1] ?? "");
                  const season = new URLSearchParams(window.location.search).get("season");
                  NiceModal.hide(MODAL_ENTITY_DETAIL);
                  navigate(
                    `/${gardenId}/beds/${encodeURIComponent(lastSegment(target.entityIRI))}/plan${season ? `?season=${season}` : ""}`,
                  );
                },
              },
            ]),
          ] as unknown as ViewConfig["extraRenderers"], // detail renderers; the declared type is the card registry
        }),
      },
    };
  }, [i18n, language, navigate]);
};

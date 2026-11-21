import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { ViewConfigSet } from "@graviola/semantic-jsonform-types";

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
export const useDetailViewConfig = (): ViewConfigSet => {
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
      },
    };
  }, [i18n, language]);
};

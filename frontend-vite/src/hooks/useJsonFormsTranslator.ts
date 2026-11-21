import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Bridges react-i18next to the JsonForms translate API.
 *
 * JsonForms calls translate("fieldName.label", defaultMessage) for field labels
 * and translate("fieldName.enumValue", defaultMessage) for enum options.
 * The jsonforms namespace uses { "fieldName": { "label": "..." } } structure,
 * so direct t("fieldName.label") lookups work natively.
 *
 * Keys of Graviola's relational `@id` controls ("<relation>.@id.label") fall
 * back to the relation's key ("<relation>.label").
 *
 * In dev mode, missing keys are logged to the console for easy gap detection.
 */
export const useJsonFormsTranslator = () => {
  const { t, i18n } = useTranslation('jsonforms');

  const translate = useCallback(
    (key: string, defaultMessage: string | undefined): string | undefined => {
      const result = t(key, { defaultValue: '__JF_MISSING__' });

      if (result !== '__JF_MISSING__') {
        return result;
      }

      // Graviola's relational fields (linked-data-renderer ≥ 7) render an
      // `@id` control inside the relation, so JsonForms asks for
      // "plantSpecies.@id.label". Fall back to the relation's own key.
      if (key.includes('.@id.')) {
        const relationResult = t(key.replace('.@id.', '.'), { defaultValue: '__JF_MISSING__' });
        if (relationResult !== '__JF_MISSING__') {
          return relationResult;
        }
      }

      if (import.meta.env.DEV) {
        console.debug('[JsonForms i18n] missing key:', key, '| default:', defaultMessage);
      }

      return defaultMessage;
    },
    [t],
  );

  return { locale: i18n.language, translate };
};

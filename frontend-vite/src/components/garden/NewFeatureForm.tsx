import React, { useMemo, useCallback, useState } from 'react';
import { Box, Typography, Button, Stack, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash-es';
import { SemanticJsonForm } from '@graviola/semantic-json-form';
import type { SemanticJsonFormNoOpsProps, SemanticJsonFormProps } from '@graviola/semantic-jsonform-types';
import {
  useAdbContext,
  useCRUDWithQueryClient,
  useDispatchIntent,
  useExtendedSchema,
  useFormDataStore,
} from '@graviola/edb-state-hooks';
import { useJsonFormsTranslator } from '../../hooks';
import { featureTypeMapping, GardenFeatureType } from './feature-type-mapping';

type ErrorObject = Parameters<NonNullable<SemanticJsonFormNoOpsProps['onError']>>[0][number];

/** SemanticJsonForm hands unknown props on to the inner form, which reports validation errors via `onError`. */
type FormWithErrors = React.FC<SemanticJsonFormProps & Pick<SemanticJsonFormNoOpsProps, 'onError'>>;
const Form = SemanticJsonForm as FormWithErrors;

const ORIGIN = { source: 'pergola:NewFeatureForm' };

export interface NewFeatureFormProps {
  geoFeatureIRI: string;
  featureType: GardenFeatureType;
  onCancel: () => void;
  /** Called after the new entity has been written to the store. */
  onSave: () => void;
}

/**
 * Form for the entity that describes a drawn area (bed, shed, path, …). The
 * new entity points to the area through `geoFeature`.
 *
 * "Speichern" writes the entity (Graviola's save, like the edit dialog); the
 * form's own toolbar (show/reload/reset/delete) is hidden, as it makes no
 * sense for an entity that does not exist yet.
 */
export const NewFeatureForm: React.FC<NewFeatureFormProps> = ({
  geoFeatureIRI,
  featureType,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation('garden');
  const { locale, translate } = useJsonFormsTranslator();
  const {
    typeNameToTypeIRI,
    createEntityIRI,
    jsonLDConfig: { defaultPrefix, jsonldContext },
  } = useAdbContext();
  const dispatchIntent = useDispatchIntent();

  // Get the type mapping for the selected feature
  const typeInfo = useMemo(() => featureTypeMapping[featureType], [featureType]);

  // Create entity IRI for the new feature
  const entityIRI = useMemo(
    () => typeInfo ? createEntityIRI(typeInfo.typeName) : undefined,
    [typeInfo, createEntityIRI]
  );

  // Get type IRI
  const typeIRI = useMemo(
    () => typeInfo ? typeNameToTypeIRI(typeInfo.typeName) : undefined,
    [typeInfo, typeNameToTypeIRI]
  );

  // Get extended schema
  const extendedSchema = useExtendedSchema({
    typeName: typeInfo?.typeName || ''
  });

  // Initial form data with geoFeature reference
  const { formData, setFormData } = useFormDataStore({
    entityIRI: entityIRI || '',
    typeIRI: typeIRI || '',
  });

  const { saveMutation } = useCRUDWithQueryClient({
    entityIRI: entityIRI || '',
    typeIRI: typeIRI || '',
    queryOptions: { enabled: false },
    loadQueryKey: 'newFeature',
  });

  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [saving, setSaving] = useState(false);

  const jsonFormsProps = useMemo(
    () => ({ i18n: { locale, translate } }) as SemanticJsonFormProps['jsonFormsProps'],
    [locale, translate],
  );

  const handleFormDataChange = useCallback((newData: Record<string, unknown>) => {
    // Only update if data actually changed (deep comparison)
    const newFormData = {
      ...newData,
      geoFeature: {
        '@id': geoFeatureIRI,
      },
    };
    if (!isEqual(newFormData, formData)) {
      setFormData(newFormData);
    }
  }, [formData, setFormData, geoFeatureIRI]);

  const handleSave = useCallback(async () => {
    if (!typeInfo || !entityIRI || !typeIRI) return;
    setSaving(true);
    try {
      await saveMutation.mutateAsync({
        ...formData,
        '@id': entityIRI,
        '@type': typeIRI,
        // only the link: the area itself is not touched
        geoFeature: { '@id': geoFeatureIRI, '@type': typeNameToTypeIRI('GeoFeature') },
      });
      void dispatchIntent({
        kind: 'entity-saved',
        typeName: typeInfo.typeName,
        entityIRI,
        created: true,
        origin: ORIGIN,
      });
      onSave();
    } catch (e) {
      void dispatchIntent({
        kind: 'entity-save-failed',
        typeName: typeInfo.typeName,
        entityIRI,
        error: e instanceof Error ? e : new Error(String(e)),
        origin: ORIGIN,
      });
    } finally {
      setSaving(false);
    }
  }, [dispatchIntent, entityIRI, formData, geoFeatureIRI, onSave, saveMutation, typeIRI, typeInfo, typeNameToTypeIRI]);

  if (!typeInfo || !entityIRI || !typeIRI) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Unknown feature type: {featureType}
        </Typography>
        <Button onClick={onCancel} sx={{ mt: 2 }}>
          {t('features.cancel')}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }} data-testid="new-feature-form">
      <Typography variant="h5" gutterBottom>
        {t('features.createNew')} {t(`features.types.${featureType}`)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('features.fillDetails')}
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Form
          entityIRI={entityIRI}
          typeIRI={typeIRI}
          data={formData}
          schema={extendedSchema}
          defaultPrefix={defaultPrefix}
          jsonldContext={jsonldContext as SemanticJsonFormProps['jsonldContext']}
          onChange={handleFormDataChange}
          onError={setErrors}
          wrapWithinCard={false}
          shouldLoadInitially={false}
          forceEditMode={true}
          hideToolbar={true}
          jsonFormsProps={jsonFormsProps}
        />
      </Box>

      <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="center">
        {errors.length > 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            {t('features.fillRequired')}
          </Typography>
        )}
        <Button onClick={onCancel} variant="outlined">
          {t('features.cancel')}
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={saving || errors.length > 0}
          startIcon={saving ? <CircularProgress size={16} color="inherit" /> : undefined}
          data-testid="new-feature-save"
        >
          {t('features.save')}
        </Button>
      </Stack>
    </Box>
  );
};

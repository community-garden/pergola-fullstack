import React, { useMemo, useCallback } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { isEqual } from 'lodash-es';
import { SemanticJsonForm } from '@graviola/semantic-json-form';
import { useAdbContext, useExtendedSchema, useFormDataStore } from '@graviola/edb-state-hooks';
import { featureTypeMapping, GardenFeatureType } from './feature-type-mapping';

export interface NewFeatureFormProps {
  geoFeatureIRI: string;
  featureType: GardenFeatureType;
  onCancel: () => void;
  onSave: () => void;
}

export const NewFeatureForm: React.FC<NewFeatureFormProps> = ({
  geoFeatureIRI,
  featureType,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation('garden');
  const {
    typeNameToTypeIRI,
    createEntityIRI,
    jsonLDConfig: { defaultPrefix, jsonldContext },
  } = useAdbContext();
  
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
  
  const handleFormDataChange = useCallback((newData: any) => {
    // Only update if data actually changed (deep comparison)
    const newFormData = {
      ...newData,
      geoFeature: {
        '@id': geoFeatureIRI,
      },
    };
    if (!isEqual(newFormData, formData)) {
      setFormData(newFormData);
      console.log('newFormData', newFormData);
    }
  }, [formData, setFormData, geoFeatureIRI]);

  
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {t('features.createNew')} {t(`features.types.${featureType}`)}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('features.fillDetails')}
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <SemanticJsonForm
          entityIRI={entityIRI}
          typeIRI={typeIRI}
          data={formData}
          schema={extendedSchema}
          defaultPrefix={defaultPrefix}
          jsonldContext={jsonldContext as any}
          onChange={handleFormDataChange}
          wrapWithinCard={false}
          shouldLoadInitially={false}
          forceEditMode={true}
        />
      </Box>
      
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <Button onClick={onCancel} variant="outlined">
          {t('features.cancel')}
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          {t('features.save')}
        </Button>
      </Stack>
    </Box>
  );
};


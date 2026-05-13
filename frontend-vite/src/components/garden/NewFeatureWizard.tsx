import React from 'react';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GardenFeatureType } from './feature-type-mapping';
import { FeatureTypeSelector } from './FeatureTypeSelector';

export interface NewFeatureWizardProps {
  onFeatureSelect?: (feature: GardenFeatureType) => void;
}

export const NewFeatureWizard: React.FC<NewFeatureWizardProps> = ({
  onFeatureSelect,
}) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ p: 3 }}>
      <FeatureTypeSelector
        onFeatureSelect={onFeatureSelect}
        title={t('features.selectType')}
        description={t('features.selectTypeDescription')}
        showSelection={true}
      />
    </Box>
  );
};


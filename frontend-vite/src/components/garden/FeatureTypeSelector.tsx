import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { GARDEN_FEATURES, GardenFeatureType } from './feature-type-mapping';

export interface FeatureTypeSelectorProps {
  onFeatureSelect?: (feature: GardenFeatureType) => void;
  title?: string;
  description?: string;
  showSelection?: boolean;
}

export const FeatureTypeSelector: React.FC<FeatureTypeSelectorProps> = ({
  onFeatureSelect,
  title,
  description,
  showSelection = true,
}) => {
  const { t } = useTranslation('garden');
  const [selectedFeature, setSelectedFeature] = useState<GardenFeatureType | null>(null);

  const handleFeatureClick = (feature: GardenFeatureType) => {
    setSelectedFeature(feature);
    onFeatureSelect?.(feature);
  };

  return (
    <Box>
      {title && (
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      )}
      
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          minHeight: 80,
        }}
      >
        {GARDEN_FEATURES.map((feature) => (
          <Chip
            key={feature}
            label={t(`features.types.${feature}`)}
            onClick={() => handleFeatureClick(feature)}
            color={selectedFeature === feature ? 'primary' : 'default'}
            variant={selectedFeature === feature ? 'filled' : 'outlined'}
            sx={{
              fontSize: '1rem',
              py: 2.5,
              px: 1,
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />
        ))}
      </Paper>

      {showSelection && selectedFeature && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="primary">
            {t('features.selected')}: <strong>{t(`features.types.${selectedFeature}`)}</strong>
          </Typography>
        </Box>
      )}
    </Box>
  );
};


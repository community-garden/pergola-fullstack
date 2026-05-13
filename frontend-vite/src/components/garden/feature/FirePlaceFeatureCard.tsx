import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { FirePlace } from '../../../schema/feature-types-schema';

export interface FirePlaceFeatureCardProps {
  firePlace: FirePlace;
}

export const FirePlaceFeatureCard: React.FC<FirePlaceFeatureCardProps> = ({ firePlace }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {firePlace.name || t('features.types.Feuerstelle')}
        </Typography>
        {firePlace.description && (
          <Typography variant="body2" color="text.secondary">
            {firePlace.description}
          </Typography>
        )}
      </Box>

      {firePlace.firePlaceType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.firePlaceType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={firePlace.firePlaceType} size="small" />
          </Box>
        </Box>
      )}

      {firePlace.hasCover && (
        <Box>
          <Chip
            icon={<CheckCircleIcon />}
            label={t('features.fields.hasCover')}
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>
      )}

      {firePlace['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {firePlace['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


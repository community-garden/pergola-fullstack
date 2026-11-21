import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { WaterBody } from '../../../schema/feature-types-schema';

export interface WaterBodyFeatureCardProps {
  waterBody: WaterBody;
}

export const WaterBodyFeatureCard: React.FC<WaterBodyFeatureCardProps> = ({ waterBody }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {waterBody.name || t('features.types.Gewässer')}
        </Typography>
        {waterBody.description && (
          <Typography variant="body2" color="text.secondary">
            {waterBody.description}
          </Typography>
        )}
      </Box>

      {waterBody.waterBodyType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('waterBody.waterBodyType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={t(`waterBody.types.${waterBody.waterBodyType}`)} size="small" />
          </Box>
        </Box>
      )}

      {waterBody.area && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('waterBody.area')}:
          </Typography>
          <Typography variant="body2">{waterBody.area} m²</Typography>
        </Box>
      )}

      {waterBody.usableForIrrigation && (
        <Box>
          <Chip
            icon={<CheckCircleIcon />}
            label={t('waterBody.usableForIrrigation')}
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>
      )}

      {waterBody['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {waterBody['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

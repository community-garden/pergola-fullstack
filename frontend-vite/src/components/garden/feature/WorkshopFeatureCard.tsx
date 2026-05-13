import { Box, Typography, Chip, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Workshop } from '../../../schema/feature-types-schema';

export interface WorkshopFeatureCardProps {
  workshop: Workshop;
}

export const WorkshopFeatureCard: React.FC<WorkshopFeatureCardProps> = ({ workshop }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {workshop.name}
        </Typography>
        {workshop.description && (
          <Typography variant="body2" color="text.secondary">
            {workshop.description}
          </Typography>
        )}
      </Box>

      {workshop.workshopType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.workshopType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={workshop.workshopType} size="small" />
          </Box>
        </Box>
      )}

      {workshop.area && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.area')}:
          </Typography>
          <Typography variant="body2">
            {workshop.area} m²
          </Typography>
        </Box>
      )}

      {(workshop.hasHeating !== undefined || workshop.hasIrrigation !== undefined) && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.facilities')}:
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
            {workshop.hasHeating && (
              <Chip
                icon={<CheckCircleIcon />}
                label={t('features.fields.hasHeating')}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
            {workshop.hasIrrigation && (
              <Chip
                icon={<CheckCircleIcon />}
                label={t('features.fields.hasIrrigation')}
                size="small"
                color="success"
                variant="outlined"
              />
            )}
          </Stack>
        </Box>
      )}

      {workshop['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {workshop['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


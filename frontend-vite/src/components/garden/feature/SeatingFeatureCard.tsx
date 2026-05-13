import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Seating } from '../../../schema/feature-types-schema';

export interface SeatingFeatureCardProps {
  seating: Seating;
}

export const SeatingFeatureCard: React.FC<SeatingFeatureCardProps> = ({ seating }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {seating.name || t('features.types.Sitzgelegenheit')}
        </Typography>
        {seating.description && (
          <Typography variant="body2" color="text.secondary">
            {seating.description}
          </Typography>
        )}
      </Box>

      {seating.seatingType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.seatingType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={seating.seatingType} size="small" />
          </Box>
        </Box>
      )}

      {seating.capacity && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.capacity')}:
          </Typography>
          <Typography variant="body2">
            {seating.capacity} {t('features.fields.people')}
          </Typography>
        </Box>
      )}

      {seating.hasCover && (
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

      {seating['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {seating['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


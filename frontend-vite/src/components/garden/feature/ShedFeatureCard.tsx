import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Shed } from '../../../schema/feature-types-schema';

export interface ShedFeatureCardProps {
  shed: Shed;
}

export const ShedFeatureCard: React.FC<ShedFeatureCardProps> = ({ shed }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {shed.name}
        </Typography>
        {shed.description && (
          <Typography variant="body2" color="text.secondary">
            {shed.description}
          </Typography>
        )}
      </Box>

      {shed.shedType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.shedType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={shed.shedType} size="small" />
          </Box>
        </Box>
      )}

      {shed.area && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.area')}:
          </Typography>
          <Typography variant="body2">
            {shed.area} m²
          </Typography>
        </Box>
      )}

      {shed.hasElectricity && (
        <Box>
          <Chip
            icon={<CheckCircleIcon />}
            label={t('features.fields.hasElectricity')}
            size="small"
            color="success"
            variant="outlined"
          />
        </Box>
      )}

      {shed['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {shed['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


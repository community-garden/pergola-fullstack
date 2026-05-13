import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Patch } from '../../../schema/patch-schema';

export interface PatchFeatureCardProps {
  patch: Patch;
}

export const PatchFeatureCard: React.FC<PatchFeatureCardProps> = ({ patch }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {patch.name}
        </Typography>
        {patch.description && (
          <Typography variant="body2" color="text.secondary">
            {patch.description}
          </Typography>
        )}
      </Box>

      {patch.patchType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.patchType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={patch.patchType} size="small" />
          </Box>
        </Box>
      )}

      {patch.area && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.area')}:
          </Typography>
          <Typography variant="body2">
            {patch.area} m²
          </Typography>
        </Box>
      )}

      {patch['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {patch['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


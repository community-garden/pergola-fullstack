import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { Path } from '../../../schema/feature-types-schema';

export interface PathFeatureCardProps {
  path: Path;
}

export const PathFeatureCard: React.FC<PathFeatureCardProps> = ({ path }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {path.name || t('features.types.Weg')}
        </Typography>
        {path.description && (
          <Typography variant="body2" color="text.secondary">
            {path.description}
          </Typography>
        )}
      </Box>

      {path.pathType && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.pathType')}:
          </Typography>
          <Box sx={{ mt: 0.5 }}>
            <Chip label={path.pathType} size="small" />
          </Box>
        </Box>
      )}

      {path.width && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.width')}:
          </Typography>
          <Typography variant="body2">
            {path.width} m
          </Typography>
        </Box>
      )}

      {path['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {path['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


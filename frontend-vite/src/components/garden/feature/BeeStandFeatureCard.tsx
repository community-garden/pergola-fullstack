import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { BeeStand } from '../../../schema/feature-types-schema';

export interface BeeStandFeatureCardProps {
  beeStand: BeeStand;
}

export const BeeStandFeatureCard: React.FC<BeeStandFeatureCardProps> = ({ beeStand }) => {
  const { t } = useTranslation('garden');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
      <Box>
        <Typography variant="h6" gutterBottom>
          {beeStand.name}
        </Typography>
        {beeStand.description && (
          <Typography variant="body2" color="text.secondary">
            {beeStand.description}
          </Typography>
        )}
      </Box>

      {beeStand.numberOfHives && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.numberOfHives')}:
          </Typography>
          <Typography variant="body2">
            {beeStand.numberOfHives}
          </Typography>
        </Box>
      )}

      {beeStand.beeSpecies && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('features.fields.beeSpecies')}:
          </Typography>
          <Typography variant="body2">
            {beeStand.beeSpecies}
          </Typography>
        </Box>
      )}

      {beeStand['@id'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            ID:
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {beeStand['@id']}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


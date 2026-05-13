import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface GeoFeature {
  '@id': string;
  '@type'?: string;
  name?: string;
  description?: string;
  geo: string;
  creationTime?: string;
  modificationTime?: string;
  [key: string]: any;
}

export interface GeoFeatureInfoProps {
  feature: GeoFeature;
}

export const GeoFeatureInfo: React.FC<GeoFeatureInfoProps> = ({ feature }) => {
  const { t } = useTranslation('garden');

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2 }}>
      {feature.description && (
        <Box>
          <Typography variant="body2" color="text.secondary">
            {feature.description}
          </Typography>
        </Box>
      )}

      <Box>
        <Typography variant="caption" color="text.secondary">
          ID:
        </Typography>
        <Typography variant="body2" sx={{ wordBreak: 'break-all', fontSize: '0.75rem' }}>
          {feature['@id']}
        </Typography>
      </Box>

      {feature['@type'] && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            Type:
          </Typography>
          <Typography variant="body2">
            {feature['@type'].split('#').pop()}
          </Typography>
        </Box>
      )}

      {feature.creationTime && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('geoFeature.creationTime')}:
          </Typography>
          <Typography variant="body2">
            {formatDate(feature.creationTime)}
          </Typography>
        </Box>
      )}

      {feature.modificationTime && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            {t('geoFeature.modificationTime')}:
          </Typography>
          <Typography variant="body2">
            {formatDate(feature.modificationTime)}
          </Typography>
        </Box>
      )}

      <Box>
        <Typography variant="caption" color="text.secondary">
          Geometry (WKT):
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'monospace', 
            fontSize: '0.7rem',
            wordBreak: 'break-all',
            maxHeight: '100px',
            overflow: 'auto',
            bgcolor: 'grey.100',
            p: 1,
            borderRadius: 1,
            mt: 0.5,
          }}
        >
          {feature.geo}
        </Typography>
      </Box>
    </Box>
  );
};


import { Box, Typography, Paper, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

const MapContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  height: '60vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const GardenMap = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom align="center">
        {t('navigation:map')}
      </Typography>
      
      <MapContainer>
        <Typography variant="h6" gutterBottom>
          Garden Map Placeholder
        </Typography>
        <Typography variant="body1" align="center">
          This is a placeholder for the garden map view. In the actual implementation, 
          this would display an interactive map of the garden with various features and plants.
        </Typography>
        <Box 
          sx={{ 
            width: '80%', 
            height: '60%', 
            border: '2px dashed grey', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2
          }}
        >
          <Typography variant="body2" color="textSecondary">
            Map View Area
          </Typography>
        </Box>
      </MapContainer>
    </Box>
  );
};

export default GardenMap;
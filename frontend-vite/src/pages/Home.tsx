import { Box, Typography, Paper, Grid, styled, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { WeatherView } from '../components/weather';

const HomeBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const Home = () => {
  const { t } = useTranslation();
  const [coordinates, setCoordinates] = useState<{ lat: number; lon: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // In a real implementation, you would get the garden location from the Redux store
  // or from an API call. For now, we'll use Berlin's coordinates as a placeholder.
  useEffect(() => {
    // Simulate loading garden location data
    const timer = setTimeout(() => {
      setCoordinates({ lat: 52.52, lon: 13.405 });
      setLocationName('Berlin, Germany');
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ padding: 2 }}>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <HomeBox>
            <Typography variant="h6" gutterBottom>
              Garden Overview
            </Typography>
            <Typography variant="body1">
              Welcome to your garden dashboard. This is a placeholder for garden information.
            </Typography>
          </HomeBox>
        </Grid>

        <Grid item xs={12} sm={6}>
          <HomeBox>
            <Typography variant="h6" gutterBottom>
              Recent Activities
            </Typography>
            <Typography variant="body1">
              This is a placeholder for recent garden activities.
            </Typography>
          </HomeBox>
        </Grid>
      </Grid>

      <Grid item xs={12} display="flex" justifyContent="center" width="100%">
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : coordinates ? (
          <WeatherView
            latitude={coordinates.lat}
            longitude={coordinates.lon}
            locationName={locationName}
          />
        ) : (
          <Typography variant="body1">
            {t('common:noLocationData')}
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
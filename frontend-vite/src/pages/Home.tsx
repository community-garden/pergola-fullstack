import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { WeatherCompact } from '../components/weather';
import { HomeShortcuts, PaintingCredit } from '../components/home';
import { useCurrentGardenInfo } from '../hooks/useCurrentGardenInfo';
import { parseWktPoint } from '../utils/wkt';

const Home = () => {
  const { t } = useTranslation();
  const { garden, isLoading } = useCurrentGardenInfo();
  // WKT order is longitude, latitude — the same point the map centres on.
  const point = parseWktPoint(garden?.location);

  return (
    <Box sx={{ padding: 2, pb: 10 }}>
      <HomeShortcuts />
      <PaintingCredit />

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} display="flex" justifyContent="center" width="100%">
          {isLoading && !point ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : point ? (
            <WeatherCompact latitude={point[1]} longitude={point[0]} />
          ) : (
            <Typography variant="body1">
              {t('common:noLocationData')}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
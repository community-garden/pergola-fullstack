import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { WeatherCompact } from '../components/weather';
import { HomeShortcuts, PaintingCredit } from '../components/home';
import { EventsPreview } from '../components/events';
import { useCurrentGardenInfo } from '../hooks/useCurrentGardenInfo';
import { parseWktPoint } from '../utils/wkt';
import { isFeatureEnabled } from '@config/featureFlags';

/** Width of the weather card (WeatherCompact). */
const WEATHER_WIDTH = 380;

const Home = () => {
  const { t } = useTranslation();
  const { garden, isLoading } = useCurrentGardenInfo();
  // WKT order is longitude, latitude — the same point the map centres on.
  const point = parseWktPoint(garden?.location);
  const showEvents = isFeatureEnabled('events');

  return (
    <Box sx={{ padding: 2, pb: 10 }}>
      <PaintingCredit />

      {/*
        One container and one grid for everything: the shortcuts span the full
        width, below them the events and the weather. Same width at every
        screen size: a phone-sized column below md, two columns from md.
      */}
      <Box
        data-testid="home-panels"
        sx={{
          mx: 'auto',
          width: '100%',
          display: 'grid',
          gap: 2,
          alignItems: 'stretch',
          maxWidth: { xs: WEATHER_WIDTH, md: showEvents ? 880 : WEATHER_WIDTH },
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: showEvents ? `minmax(0, 1fr) ${WEATHER_WIDTH}px` : 'minmax(0, 1fr)',
          },
        }}
      >
        <Box sx={{ gridColumn: '1 / -1', minWidth: 0 }}>
          <HomeShortcuts />
        </Box>

        {/* events come first in the DOM: above the weather on phones, left of it from md */}
        {showEvents && <EventsPreview />}

        <Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 0 }}>
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
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

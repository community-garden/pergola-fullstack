import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
  useTheme,
  alpha,
  Grow,
  Stack,
  Icon,
} from '@mui/material';
import {
  Air as WindIcon,
  ThermostatOutlined as ThermostatIcon,
  WaterDropOutlined as HumidityIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useWeatherData, formatTemperature } from './helper';
import { useDateFnsLocale } from '../../hooks';
import WeatherIcon from './WeatherIcon';
import { AnimatedClouds } from './AnimatedClouds';

export interface WeatherCompactProps {
  latitude: number;
  longitude: number;
  locationName?: string;
}

const COMPACT_WIDTH = 380;

export const WeatherCompact = ({ latitude, longitude, locationName }: WeatherCompactProps) => {
  const theme = useTheme();
  const locale = useDateFnsLocale();
  const { t } = useTranslation('weather');
  const [animate, setAnimate] = useState(false);
  const { data, isLoading, isError, error } = useWeatherData(latitude, longitude);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const glassCardSx = {
    width: '100%',
    maxWidth: COMPACT_WIDTH,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative' as const,
    backgroundColor: alpha(theme.palette.background.paper, 0.35),
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: `1px solid ${alpha(theme.palette.common.white, 0.35)}`,
    boxShadow: theme.shadows[2],
  };

  if (isError) {
    return (
      <Card
        data-testid="weather-compact"
        data-latitude={latitude}
        data-longitude={longitude}
        sx={{
          ...glassCardSx,
          borderColor: alpha(theme.palette.error.main, 0.5),
        }}
      >
        <CardContent sx={{ py: 2, px: 2.5 }}>
          <Typography variant="subtitle1" color="error" fontWeight={600}>
            {t('errorTitle')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error instanceof Error ? error.message : t('unknownError')}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const weatherType = data?.weather[0]?.main?.toLowerCase() || 'clear';
  const windKmh = data ? Math.round(data.wind.speed * 3.6) : 0;

  const tileSx = {
    borderRadius: 2,
    backgroundColor: alpha(theme.palette.background.paper, 0.5),
    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
  };

  const stats = data
    ? [
        {
          icon: <ThermostatIcon fontSize="small" />,
          label: t('feelsLike'),
          value: formatTemperature(data.main.feels_like),
        },
        {
          icon: <HumidityIcon fontSize="small" />,
          label: t('humidity'),
          value: `${data.main.humidity}%`,
        },
        {
          icon: <WindIcon fontSize="small" />,
          label: t('wind'),
          value: t('windKmh', { speed: windKmh }),
        },
      ]
    : [];

  const sunTimes = data
    ? [
        { iconClass: 'icofont-sun-rise', label: t('sunrise'), time: data.sys.sunrise },
        { iconClass: 'icofont-sun-set', label: t('sunset'), time: data.sys.sunset },
      ]
    : [];

  return (
    <Card
      data-testid="weather-compact"
      data-latitude={latitude}
      data-longitude={longitude}
      sx={glassCardSx}
    >
      <AnimatedClouds opacity={0.08} speed={100} weatherType={weatherType} />

      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, position: 'relative', zIndex: 1 }}>
        <Stack spacing={1.5}>
          <Grow in={animate} timeout={600}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={700} color="text.primary" noWrap>
                  {locationName || data?.name || t('currentLocation')}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" noWrap>
                  {format(new Date(), 'EEEE, d. MMMM', { locale })}
                </Typography>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={110} height={64} />
                    <Skeleton variant="text" width={140} />
                  </>
                ) : data ? (
                  <>
                    <Typography
                      component="div"
                      sx={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, mt: 1 }}
                    >
                      {formatTemperature(data.main.temp)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textTransform: 'capitalize' }}
                      noWrap
                    >
                      {data.weather[0].description}
                    </Typography>
                  </>
                ) : null}
              </Box>
              <Box
                sx={{
                  width: 104,
                  height: 104,
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {isLoading ? (
                  <Skeleton variant="circular" width={72} height={72} />
                ) : data ? (
                  <WeatherIcon weather={data.weather[0]} size="medium" />
                ) : null}
              </Box>
            </Box>
          </Grow>

          <Grow in={animate} timeout={750}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1 }}>
              {isLoading
                ? [0, 1, 2].map((i) => <Skeleton key={i} variant="rounded" height={64} />)
                : stats.map(({ icon, label, value }) => (
                    <Box
                      key={label}
                      sx={{
                        ...tileSx,
                        py: 1,
                        px: 0.5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        minWidth: 0,
                      }}
                    >
                      <Box sx={{ color: 'primary.main', display: 'flex', mb: 0.25 }}>{icon}</Box>
                      <Typography variant="body2" fontWeight={700} lineHeight={1.3} noWrap>
                        {value}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        lineHeight={1.2}
                        noWrap
                        sx={{ maxWidth: '100%' }}
                      >
                        {label}
                      </Typography>
                    </Box>
                  ))}
            </Box>
          </Grow>

          <Grow in={animate} timeout={900}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1 }}>
              {isLoading
                ? [0, 1].map((i) => <Skeleton key={i} variant="rounded" height={52} />)
                : sunTimes.map(({ iconClass, label, time }) => (
                    <Box
                      key={iconClass}
                      sx={{
                        ...tileSx,
                        py: 1,
                        px: 1.25,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        minWidth: 0,
                      }}
                    >
                      <Icon
                        className={`icofont ${iconClass}`}
                        sx={{
                          fontSize: 26,
                          width: 'auto',
                          height: 'auto',
                          color: theme.palette.warning.main,
                          flexShrink: 0,
                        }}
                      />
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} lineHeight={1.3}>
                          {format(new Date(time * 1000), 'HH:mm')}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          lineHeight={1.2}
                          noWrap
                        >
                          {label}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
            </Box>
          </Grow>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WeatherCompact;
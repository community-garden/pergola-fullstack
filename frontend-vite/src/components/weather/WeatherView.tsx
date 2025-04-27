import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Skeleton, 
  Paper, 
  useTheme, 
  alpha,
  Grow,
  Stack,
  Divider,
  Icon
} from '@mui/material';
import { format } from 'date-fns';
import { useWeatherData, formatTemperature } from './helper';
import WeatherIcon from './WeatherIcon';
import { AnimatedClouds } from './AnimatedClouds';

interface WeatherViewProps {
  latitude: number;
  longitude: number;
  locationName?: string;
}

export const WeatherView = ({ latitude, longitude, locationName }: WeatherViewProps) => {
  const theme = useTheme();
  const [animate, setAnimate] = useState(false);
  const { data, isLoading, isError, error } = useWeatherData(latitude, longitude);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  if (isError) {
    return (
      <Card 
        sx={{ 
          width: '100%', 
          borderRadius: 4,
          boxShadow: 3,
          bgcolor: alpha(theme.palette.error.main, 0.1),
          border: `1px solid ${theme.palette.error.main}`,
        }}
      >
        <CardContent>
          <Typography variant="h6" color="error">
            Error loading weather data
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {error instanceof Error ? error.message : 'Unknown error'}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  const weatherType = data?.weather[0]?.main?.toLowerCase() || 'clear';
  
  return (
    <Card 
      sx={{ 
        width: '100%', 
        maxWidth: 800,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.8)}, ${alpha(theme.palette.primary.main, 0.8)})`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <AnimatedClouds 
        opacity={0.15} 
        speed={80} 
        weatherType={weatherType}
      />
      
      <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h4" fontWeight="bold" color="white">
              {locationName || data?.name || 'Current Location'}
            </Typography>
            <Typography variant="body1" color="white" sx={{ opacity: 0.9 }}>
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </Typography>
          </Box>
          
          {/* Current Weather */}
          <Grow in={animate} timeout={800}>
            <Paper 
              elevation={4} 
              sx={{ 
                p: 3, 
                borderRadius: 3,
                background: alpha(theme.palette.background.paper, 0.8),
                backdropFilter: 'blur(5px)',
              }}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <Skeleton variant="circular" width={100} height={100} />
                  <Box>
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="text" width={150} height={30} />
                    <Skeleton variant="text" width={100} height={30} />
                  </Box>
                </Box>
              ) : data ? (
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: 120, height: 120 }}>
                      <WeatherIcon weather={data.weather[0]} size="large" />
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={8}>
                    <Stack spacing={1}>
                      <Typography variant="h2" fontWeight="bold" color="text.primary">
                        {formatTemperature(data.main.temp)}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                        {data.weather[0].description}
                      </Typography>
                      <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
                        <Typography variant="body1" color="text.secondary">
                          Feels like {formatTemperature(data.main.feels_like)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Humidity {data.main.humidity}%
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Wind {Math.round(data.wind.speed * 3.6)} km/h
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              ) : null}
            </Paper>
          </Grow>
          
          {/* Sun Times */}
          <Grow in={animate} timeout={1000}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                borderRadius: 2,
                background: alpha(theme.palette.background.paper, 0.7),
                display: 'flex',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              {isLoading ? (
                <>
                  <Skeleton variant="rounded" width={120} height={40} />
                  <Skeleton variant="rounded" width={120} height={40} />
                </>
              ) : data ? (
                <>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon sx={{ fontSize: 48, color: theme.palette.warning.main }} className="icofont icofont-sun-rise"></Icon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Sunrise
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {format(new Date(data.sys.sunrise * 1000), 'HH:mm')}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Icon sx={{ fontSize: 48, coindexlor: theme.palette.warning.main }} className="icofont icofont-sun-set"></Icon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Sunset
                      </Typography>
                      <Typography variant="body1" color="text.primary">
                        {format(new Date(data.sys.sunset * 1000), 'HH:mm')}
                      </Typography>
                    </Box>
                  </Box>
                </>
              ) : null}
            </Paper>
          </Grow>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WeatherView;
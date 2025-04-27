import { useQuery } from '@tanstack/react-query';

// Types for the OpenWeatherMap API response
export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherInfo[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherInfo[];
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

// Replace with your actual API key or use an environment variable
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '66b182a33df58ab59d449115c4d1aab3';

/**
 * Fetches weather data for a specific location
 * @param lat Latitude of the location
 * @param lon Longitude of the location
 * @returns Weather data from OpenWeatherMap API
 */
export const fetchWeatherData = async (lat: number, lon: number): Promise<WeatherData> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }
  
  return response.json();
};

/**
 * React Query hook to fetch weather data
 * @param lat Latitude of the location
 * @param lon Longitude of the location
 * @param enabled Whether the query should run automatically
 * @returns Query result with weather data
 */
export const useWeatherData = (lat: number, lon: number, enabled = true) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: () => fetchWeatherData(lat, lon),
    enabled,
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};

/**
 * Gets the URL for a weather icon
 * @param iconCode Icon code from the OpenWeatherMap API
 * @param size Size of the icon (2x or 4x)
 * @returns URL for the weather icon
 */
export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '4x') => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Formats a date as a day of the week
 * @param timestamp Unix timestamp
 * @returns Day of the week (e.g., "Monday")
 */
export const formatDayOfWeek = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'long' });
};

/**
 * Formats a date as a short day of the week
 * @param timestamp Unix timestamp
 * @returns Short day of the week (e.g., "Mon")
 */
export const formatShortDayOfWeek = (timestamp: number) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
};

/**
 * Formats a temperature
 * @param temp Temperature in Celsius
 * @returns Formatted temperature (e.g., "22°C")
 */
export const formatTemperature = (temp: number) => {
  return `${Math.round(temp)}°C`;
};
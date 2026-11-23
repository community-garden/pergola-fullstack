import type { WeatherData, WeatherInfo } from './helper';

const baseFields = {
  base: 'stations',
  visibility: 10000,
  dt: 1710000000,
  timezone: 3600,
  id: 1,
  cod: 200,
} as const;

function mockSys(sunrise = 1709962200, sunset = 1710003600) {
  return { type: 2, id: 2000, country: 'DE', sunrise, sunset };
}

function createWeatherData(
  weather: WeatherInfo[],
  main: WeatherData['main'],
  wind: WeatherData['wind'],
  coord: { lat: number; lon: number },
  name: string,
  clouds = 20,
): WeatherData {
  return {
    ...baseFields,
    coord,
    weather,
    main,
    wind,
    clouds: { all: clouds },
    sys: mockSys(),
    name,
  };
}

export function createMockWeatherData(options: {
  variant: 'clear' | 'clouds' | 'rain';
  lat?: number;
  lon?: number;
  name?: string;
  description?: string;
}): WeatherData {
  const lat = options.lat ?? 52.52;
  const lon = options.lon ?? 13.405;
  const name = options.name ?? 'Berlin';

  const variants: Record<typeof options.variant, { weather: WeatherInfo[]; main: WeatherData['main']; clouds: number }> = {
    clear: {
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: options.description ?? 'clear sky',
          icon: '01d',
        },
      ],
      main: {
        temp: 22,
        feels_like: 21,
        temp_min: 16,
        temp_max: 24,
        pressure: 1012,
        humidity: 48,
      },
      clouds: 5,
    },
    clouds: {
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: options.description ?? 'broken clouds',
          icon: '04d',
        },
      ],
      main: {
        temp: 18,
        feels_like: 17,
        temp_min: 14,
        temp_max: 19,
        pressure: 1015,
        humidity: 62,
      },
      clouds: 75,
    },
    rain: {
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: options.description ?? 'light rain',
          icon: '10d',
        },
      ],
      main: {
        temp: 15,
        feels_like: 14,
        temp_min: 13,
        temp_max: 16,
        pressure: 1010,
        humidity: 78,
      },
      clouds: 90,
    },
  };

  const v = variants[options.variant];
  return createWeatherData(
    v.weather,
    v.main,
    { speed: 3.2, deg: 210 },
    { lat, lon },
    name,
    v.clouds,
  );
}
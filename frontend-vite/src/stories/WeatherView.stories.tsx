import type { Meta, StoryObj } from '@storybook/react';
import { WeatherView } from '../components/weather';
import { ThemeContextProvider } from '../theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

// Mock data for the stories
const mockWeatherData = {
  current: {
    dt: 1619964000,
    sunrise: 1619938199,
    sunset: 1619988199,
    temp: 22.5,
    feels_like: 21.8,
    pressure: 1012,
    humidity: 55,
    dew_point: 12.9,
    uvi: 5.2,
    clouds: 20,
    visibility: 10000,
    wind_speed: 3.6,
    wind_deg: 220,
    weather: [
      {
        id: 801,
        main: 'Clouds',
        description: 'few clouds',
        icon: '02d',
      },
    ],
  },
  daily: [
    {
      dt: 1619964000,
      sunrise: 1619938199,
      sunset: 1619988199,
      moonrise: 1619941222,
      moonset: 1619977821,
      moon_phase: 0.25,
      temp: {
        day: 22.5,
        min: 15.8,
        max: 24.1,
        night: 17.2,
        eve: 21.5,
        morn: 16.3,
      },
      feels_like: {
        day: 21.8,
        night: 16.5,
        eve: 20.8,
        morn: 15.5,
      },
      pressure: 1012,
      humidity: 55,
      dew_point: 12.9,
      wind_speed: 3.6,
      wind_deg: 220,
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      clouds: 20,
      pop: 0,
      uvi: 5.2,
    },
    {
      dt: 1620050400,
      sunrise: 1620024519,
      sunset: 1620074659,
      moonrise: 1620029592,
      moonset: 1620067821,
      moon_phase: 0.28,
      temp: {
        day: 20.8,
        min: 14.2,
        max: 22.5,
        night: 16.5,
        eve: 20.1,
        morn: 14.8,
      },
      feels_like: {
        day: 20.1,
        night: 15.8,
        eve: 19.5,
        morn: 14.1,
      },
      pressure: 1015,
      humidity: 60,
      dew_point: 13.2,
      wind_speed: 2.8,
      wind_deg: 200,
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      clouds: 30,
      pop: 0.3,
      rain: 0.5,
      uvi: 4.8,
    },
    {
      dt: 1620136800,
      sunrise: 1620110840,
      sunset: 1620161119,
      moonrise: 1620117962,
      moonset: 1620157821,
      moon_phase: 0.31,
      temp: {
        day: 18.5,
        min: 13.1,
        max: 19.8,
        night: 15.2,
        eve: 18.1,
        morn: 13.5,
      },
      feels_like: {
        day: 17.8,
        night: 14.5,
        eve: 17.5,
        morn: 12.8,
      },
      pressure: 1018,
      humidity: 65,
      dew_point: 12.5,
      wind_speed: 3.2,
      wind_deg: 180,
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04d',
        },
      ],
      clouds: 75,
      pop: 0.1,
      uvi: 4.5,
    },
    {
      dt: 1620223200,
      sunrise: 1620197161,
      sunset: 1620247579,
      moonrise: 1620206332,
      moonset: 1620247821,
      moon_phase: 0.34,
      temp: {
        day: 17.2,
        min: 12.5,
        max: 18.5,
        night: 14.8,
        eve: 17.5,
        morn: 12.8,
      },
      feels_like: {
        day: 16.5,
        night: 14.1,
        eve: 16.8,
        morn: 12.1,
      },
      pressure: 1020,
      humidity: 70,
      dew_point: 12.1,
      wind_speed: 2.5,
      wind_deg: 160,
      weather: [
        {
          id: 804,
          main: 'Clouds',
          description: 'overcast clouds',
          icon: '04d',
        },
      ],
      clouds: 90,
      pop: 0.2,
      uvi: 4.2,
    },
  ],
  lat: 51.5074,
  lon: -0.1278,
  timezone: 'Europe/London',
  timezone_offset: 3600,
};

// We'll use MSW or parameters to mock the data in a real implementation
// For now, we'll create a wrapper component that provides mock data
import { useWeatherData as actualUseWeatherData } from '../components/weather/helper';
import { WeatherData } from '../components/weather/helper';

interface MockWeatherProviderProps {
  children: (Component: typeof WeatherView) => React.ReactNode;
  mockData: WeatherData | null;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const MockWeatherProvider = ({
  children,
  mockData,
  isLoading = false,
  isError = false,
  error = null
}: MockWeatherProviderProps) => {
  const MockedWeatherView = (props: React.ComponentProps<typeof WeatherView>) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error: {error?.message || 'Failed to fetch weather data'}</div>;
    }
    return <WeatherView {...props} />;
  };
  return children(MockedWeatherView);
};

// Meta information for the component
const meta = {
  title: 'Weather/WeatherView',
  component: WeatherView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters }) => {
      // Get the mock state from parameters
      const mockState = parameters?.mockState || {};
      const isLoading = !!mockState.isLoading;
      const isError = !!mockState.isError;
      const error = isError ? new Error('Failed to fetch weather data') : null;
      
      return (
        <QueryClientProvider client={queryClient}>
          <ThemeContextProvider>
            <div style={{
              width: '800px',
              padding: '20px',
              margin: '0 auto'
            }}>
              <Story component={WeatherView} />
            </div>
          </ThemeContextProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof WeatherView>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with Berlin coordinates
export const Default: Story = {
  args: {
    latitude: 52.52,
    longitude: 13.405,
    locationName: 'Berlin, Germany',
  },
};

// London coordinates
export const London: Story = {
  args: {
    latitude: 51.5074,
    longitude: -0.1278,
    locationName: 'London, UK',
  },
};

// New York coordinates
export const NewYork: Story = {
  args: {
    latitude: 40.7128,
    longitude: -74.006,
    locationName: 'New York, USA',
  },
};

// Tokyo coordinates
export const Tokyo: Story = {
  args: {
    latitude: 35.6762,
    longitude: 139.6503,
    locationName: 'Tokyo, Japan',
  },
};

// Loading state
export const Loading: Story = {
  args: {
    latitude: 52.52,
    longitude: 13.405,
    locationName: 'Berlin, Germany (Loading...)',
  },
};

// Error state
export const Error: Story = {
  args: {
    latitude: 52.52,
    longitude: 13.405,
    locationName: 'Berlin, Germany (Error)',
  },
};
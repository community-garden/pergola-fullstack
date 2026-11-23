import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WeatherCompact } from '../components/weather';
import { createMockWeatherData } from '../components/weather/mockWeatherData';
import { ThemeContextProvider } from '../theme';

const BERLIN = { latitude: 52.52, longitude: 13.405 };

type WeatherMockKind = 'clear' | 'clouds' | 'rain' | 'loading' | 'error';

function buildQueryClient(
  lat: number,
  lon: number,
  mock: WeatherMockKind,
  description?: string,
) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
      },
    },
  });

  const data = createMockWeatherData({
    variant: mock === 'loading' || mock === 'error' ? 'clear' : mock,
    lat,
    lon,
    name: 'Berlin',
    description,
  });

  for (const lang of ['de', 'en'] as const) {
    const queryKey = ['weather', lat, lon, lang] as const;
    if (mock === 'loading') {
      void client.prefetchQuery({
        queryKey: [...queryKey],
        queryFn: () => new Promise(() => {}),
      });
    } else if (mock === 'error') {
      void client.prefetchQuery({
        queryKey: [...queryKey],
        queryFn: async () => {
          throw new Error('Failed to fetch weather data');
        },
      });
    } else {
      client.setQueryData([...queryKey], data);
    }
  }

  return client;
}

const meta = {
  title: 'Weather/WeatherCompact',
  component: WeatherCompact,
  parameters: {
    layout: 'centered',
    weatherMock: {
      kind: 'clear' as WeatherMockKind,
      ...BERLIN,
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, { parameters }) => {
      const mockParams = parameters.weatherMock as {
        kind: WeatherMockKind;
        latitude: number;
        longitude: number;
        description?: string;
      };
      const { kind, latitude, longitude, description } = mockParams;
      const client = buildQueryClient(latitude, longitude, kind, description);

      return (
        <QueryClientProvider client={client}>
          <ThemeContextProvider>
            <div style={{ width: 380, padding: 16 }}>
              <Story />
            </div>
          </ThemeContextProvider>
        </QueryClientProvider>
      );
    },
  ],
} satisfies Meta<typeof WeatherCompact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Sunny (mock)',
  args: {
    ...BERLIN,
    locationName: 'Wurzelwerk',
  },
  parameters: {
    weatherMock: {
      kind: 'clear',
      description: 'klarer Himmel',
      ...BERLIN,
    },
  },
};

export const Cloudy: Story = {
  args: {
    ...BERLIN,
    locationName: 'Wurzelwerk',
  },
  parameters: {
    weatherMock: {
      kind: 'clouds',
      description: 'bewölkter Himmel',
      ...BERLIN,
    },
  },
};

export const Rain: Story = {
  args: {
    ...BERLIN,
    locationName: 'Wurzelwerk',
  },
  parameters: {
    weatherMock: {
      kind: 'rain',
      description: 'leichter Regen',
      ...BERLIN,
    },
  },
};

export const Loading: Story = {
  args: {
    ...BERLIN,
    locationName: 'Wurzelwerk',
  },
  parameters: {
    weatherMock: {
      kind: 'loading',
      ...BERLIN,
    },
  },
};

export const Error: Story = {
  args: {
    ...BERLIN,
    locationName: 'Wurzelwerk',
  },
  parameters: {
    weatherMock: {
      kind: 'error',
      ...BERLIN,
    },
  },
};
import type { Meta, StoryObj } from '@storybook/react';
import { NominatimAutocomplete } from '../components/graviola/renderers/location/NominatimAutocomplete';

const meta = {
  title: 'Graviola/Location/NominatimAutocomplete',
  component: NominatimAutocomplete,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NominatimAutocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Search for a location',
    onLocationSelected: (lat, lng, result) => {
      console.log('Location selected:', { lat, lng, result });
      alert(`Selected: ${result.display_name}\nLat: ${lat}, Lng: ${lng}`);
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Search for a location',
    disabled: true,
    onLocationSelected: (lat, lng, result) => {
      console.log('Location selected:', { lat, lng, result });
    },
  },
};

export const CustomPlaceholder: Story = {
  args: {
    label: 'Enter your garden address',
    placeholder: 'e.g., Berlin, Germany',
    onLocationSelected: (lat, lng, result) => {
      console.log('Location selected:', { lat, lng, result });
    },
  },
};


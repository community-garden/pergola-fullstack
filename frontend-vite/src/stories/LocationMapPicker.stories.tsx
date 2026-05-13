import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { LocationMapPicker } from '../components/graviola/renderers/location/LocationMapPicker';

const meta = {
  title: 'Graviola/Location/LocationMapPicker',
  component: LocationMapPicker,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LocationMapPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedPoint: null,
    onLocationPicked: (lat, lng, result) => {
      console.log('Location picked:', { lat, lng, result });
    },
  },
};

export const WithSelectedPoint: Story = {
  args: {
    selectedPoint: [13.404954, 52.520008], // Berlin
    onLocationPicked: (lat, lng, result) => {
      console.log('Location picked:', { lat, lng, result });
    },
  },
};

export const Interactive = () => {
  const [selectedPoint, setSelectedPoint] = useState<[number, number] | null>(null);
  const [address, setAddress] = useState<string>('');

  return (
    <Box>
      <LocationMapPicker
        selectedPoint={selectedPoint}
        onLocationPicked={(lat, lng, result) => {
          setSelectedPoint([lng, lat]);
          setAddress(result?.display_name || `${lat}, ${lng}`);
        }}
      />
      {selectedPoint && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1">
            <strong>Selected:</strong> {address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Coordinates: {selectedPoint[1].toFixed(6)}, {selectedPoint[0].toFixed(6)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};


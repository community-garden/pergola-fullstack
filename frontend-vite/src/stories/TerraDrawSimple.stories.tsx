import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { MaplibreTerradrawControl } from '@watergis/maplibre-gl-terradraw';
import '@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css';
import 'maplibre-gl/dist/maplibre-gl.css';

const SimpleTerraDrawMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    console.log('Creating map...');

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 20], // Show world map centered on Africa
      zoom: 1.5,
      maxPitch: 85,
    });

    mapRef.current = map;

    const drawControl = new MaplibreTerradrawControl({
      modes: ['rectangle', 'select'],
      open: true,
    });

    map.addControl(drawControl, 'top-left');
    console.log('Control added');
    console.log('TerraDraw instance:', drawControl.getTerraDrawInstance());
    console.log('TerraDraw enabled:', drawControl.getTerraDrawInstance()?.enabled);

    return () => {
      console.log('Cleanup');
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '100%',
        height: '100vh',
        position: 'absolute',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
      }}
    />
  );
};

const meta = {
  title: 'Map/TerraDrawSimple',
  component: SimpleTerraDrawMap,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SimpleTerraDrawMap>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

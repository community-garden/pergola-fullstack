import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import maplibregl from 'maplibre-gl';
import { MaplibreTerradrawControl } from '@watergis/maplibre-gl-terradraw';

// Don't import CSS here - it's loaded in the HTML
// import 'maplibre-gl/dist/maplibre-gl.css';
// import '@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css';

const TerraDrawReactTest = () => {
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
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};

// Mount the component
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<TerraDrawReactTest />);
}

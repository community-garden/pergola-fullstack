import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box } from '@mui/material';
import { CalibrationPanel } from './CalibrationPanel';
import { CornerMarker } from './CornerMarker';
import { useGardenPlanCalibration } from './useGardenPlanCalibration';
import { CORNER_KEYS } from './types';
import type { CalibrationState } from './types';

interface GardenPlanCalibrationProps {
  center?: [number, number];
  zoom?: number;
  mapStyle?: string;
  /** Pre-populate state — used by Storybook stories to start at a given stage */
  initialState?: CalibrationState;
}

export function GardenPlanCalibration({
  center = [10.0, 51.0],
  zoom = 6,
  mapStyle = 'https://demotiles.maplibre.org/style.json',
  initialState,
}: GardenPlanCalibrationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapInstance, setMapInstance] = useState<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: mapStyle,
      center,
      zoom,
    });
    mapRef.current = map;
    map.once('load', () => setMapInstance(map));
    return () => {
      map.remove();
      mapRef.current = null;
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    state,
    uploadStatus,
    uploadError,
    upload,
    placeCorner,
    placeNextCorner,
    setOpacity,
    confirm,
    reset,
    isCalibrated,
    nextCorner,
  } = useGardenPlanCalibration(mapInstance, initialState);

  // Map click → place next unplaced corner
  useEffect(() => {
    if (!mapInstance || state.stage !== 'placing_corners') return;
    const handler = (e: maplibregl.MapMouseEvent) => {
      placeNextCorner({ lng: e.lngLat.lng, lat: e.lngLat.lat });
    };
    mapInstance.on('click', handler);
    return () => { mapInstance.off('click', handler); };
  }, [mapInstance, state.stage, placeNextCorner]);

  // Crosshair cursor while placing corners
  useEffect(() => {
    if (!mapInstance) return;
    mapInstance.getCanvas().style.cursor =
      state.stage === 'placing_corners' ? 'crosshair' : '';
  }, [mapInstance, state.stage]);

  const corners = 'corners' in state ? state.corners : null;

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100vh' }}>
      <Box ref={containerRef} sx={{ position: 'absolute', inset: 0 }} />

      <CalibrationPanel
        state={state}
        uploadStatus={uploadStatus}
        uploadError={uploadError}
        isCalibrated={isCalibrated}
        nextCorner={nextCorner}
        onUpload={upload}
        onSetOpacity={setOpacity}
        onConfirm={confirm}
        onReset={reset}
      />

      {mapInstance &&
        corners &&
        CORNER_KEYS.map(k => (
          <CornerMarker
            key={k}
            map={mapInstance}
            cornerKey={k}
            lngLat={corners[k]}
            isNext={k === nextCorner}
            onPlace={placeCorner}
          />
        ))}
    </Box>
  );
}

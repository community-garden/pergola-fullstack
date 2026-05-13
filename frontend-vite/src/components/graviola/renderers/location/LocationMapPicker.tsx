import React, { useCallback, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { MapLibreComponent } from '../../../map/MapLibreComponent';
import { reverse, NominatimResponse } from './nominatim';

export interface LocationMapPickerProps {
  selectedPoint: [number, number] | null;
  onLocationPicked: (lat: number, lng: number, result?: NominatimResponse) => void;
  height?: number | string;
}

export const LocationMapPicker: React.FC<LocationMapPickerProps> = ({
  selectedPoint,
  onLocationPicked,
  height = 400,
}) => {
  const [loading, setLoading] = useState(false);

  const handlePointPicked = useCallback(
    async (point: [number, number]) => {
      const [lng, lat] = point;
      
      setLoading(true);
      try {
        const result = await reverse({
          lat,
          lon: lng,
          addressdetails: true,
          zoom: 18,
        });
        onLocationPicked(lat, lng, result);
      } catch (error) {
        console.error('Reverse geocoding error:', error);
        // Still update the location even if reverse geocoding fails
        onLocationPicked(lat, lng);
      } finally {
        setLoading(false);
      }
    },
    [onLocationPicked]
  );

  return (
    <Box sx={{ position: 'relative', height }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <MapLibreComponent
        initialCenter={selectedPoint || [13.404954, 52.520008]}
        initialZoom={selectedPoint ? 13 : 5}
        onPointPicked={handlePointPicked}
        selectedPoint={selectedPoint}
        useSatelliteTiles={false}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: 1,
          borderRadius: 1,
          pointerEvents: 'none',
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Click on the map to select a location
        </Typography>
      </Box>
    </Box>
  );
};


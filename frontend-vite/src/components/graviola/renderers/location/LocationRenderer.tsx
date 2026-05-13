import React, { useCallback, useMemo, useState } from 'react';
import { ControlProps, and, isStringControl, formatIs, RankedTester, rankWith } from '@jsonforms/core';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Box, FormControl, IconButton, Collapse } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { NominatimAutocomplete } from './NominatimAutocomplete';
import { LocationMapPicker } from './LocationMapPicker';
import { NominatimResponse } from './nominatim';
import { parseWktPoint, formatWktPoint } from '../../../../utils/wkt';

const LocationRendererComponent: React.FC<ControlProps> = (props) => {
  const { data, handleChange, path, label, enabled = true } = props;
  
  const [showMap, setShowMap] = useState(false);
  
  const selectedPoint = useMemo(() => parseWktPoint(data), [data]);
  
  const handleLocationSelected = useCallback(
    (lat: number, lng: number, result?: NominatimResponse) => {
      const wktPoint = formatWktPoint(lng, lat);
      handleChange(path, wktPoint);
    },
    [handleChange, path]
  );
  
  const toggleMap = useCallback(() => {
    setShowMap((prev) => !prev);
  }, []);
  
  return (
    <FormControl fullWidth sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
        <Box sx={{ flexGrow: 1 }}>
          <NominatimAutocomplete
            label={label || 'Location'}
            onLocationSelected={handleLocationSelected}
            disabled={!enabled}
          />
        </Box>
        <IconButton
          onClick={toggleMap}
          color={showMap ? 'primary' : 'default'}
          disabled={!enabled}
          sx={{ mt: 1 }}
        >
          <MapIcon />
        </IconButton>
      </Box>
      
      <Collapse in={showMap}>
        <Box sx={{ mt: 2 }}>
          <LocationMapPicker
            selectedPoint={selectedPoint}
            onLocationPicked={handleLocationSelected}
            height={400}
          />
        </Box>
      </Collapse>
      
      {selectedPoint && (
        <Box sx={{ mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
          Selected: {selectedPoint[1].toFixed(6)}, {selectedPoint[0].toFixed(6)}
        </Box>
      )}
    </FormControl>
  );
};

export const LocationRenderer = withJsonFormsControlProps(LocationRendererComponent);

export const locationRendererTester: RankedTester = rankWith(
  10,
  and(isStringControl, formatIs('wktLiteral'))
);


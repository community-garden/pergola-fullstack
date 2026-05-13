import React, { useState, useCallback, useEffect } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { debounce } from 'lodash-es';
import { geocode, NominatimResponse } from './nominatim';

export interface NominatimAutocompleteProps {
  label?: string;
  onLocationSelected: (lat: number, lng: number, result: NominatimResponse) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const NominatimAutocomplete: React.FC<NominatimAutocompleteProps> = ({
  label = "Search for a location",
  onLocationSelected,
  disabled = false,
  placeholder = "Enter an address...",
}) => {
  const [options, setOptions] = useState<NominatimResponse[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const performSearch = useCallback(
    async (query: string) => {
      if (!query || query.length < 3) {
        setOptions([]);
        return;
      }

      setLoading(true);
      try {
        const results = await geocode({
          q: query,
          countrycodes: ['de', 'at', 'ch'],
          addressdetails: true,
          limit: 5,
        });
        setOptions(results);
      } catch (error) {
        console.error('Nominatim search error:', error);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      performSearch(query);
    }, 500),
    [performSearch]
  );

  useEffect(() => {
    debouncedSearch(searchString);
    
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchString, debouncedSearch]);

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, value: string) => {
      setSearchString(value);
    },
    []
  );

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, value: NominatimResponse | null) => {
      if (value) {
        const lat = parseFloat(value.lat);
        const lng = parseFloat(value.lon);
        onLocationSelected(lat, lng, value);
        setSearchString('');
      }
    },
    [onLocationSelected]
  );

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.display_name
      }
      onInputChange={handleInputChange}
      onChange={handleChange}
      loading={loading}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      noOptionsText={searchString.length < 3 ? "Type at least 3 characters" : "No locations found"}
    />
  );
};


export interface Viewbox {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface GeocodeAddress {
  county?: string;
  city?: string;
  city_district?: string;
  construction?: string;
  continent?: string;
  country?: string;
  country_code?: string;
  house_number?: string;
  neighbourhood?: string;
  postcode?: string;
  public_building?: string;
  state?: string;
  suburb?: string;
  road?: string;
  [key: string]: string | undefined;
}

export interface NominatimResponse {
  address: GeocodeAddress;
  boundingbox: string[];
  class: string;
  display_name: string;
  importance: number;
  lat: string;
  licence: string;
  lon: string;
  osm_id: string;
  osm_type: string;
  place_id: string;
  type: string;
}

export interface GeocodeRequest {
  q?: string;
  street?: string;
  city?: string;
  county?: string;
  state?: string;
  country?: string;
  postalcode?: string;
  countrycodes?: string[];
  viewbox?: Viewbox;
  bounded?: boolean;
  limit?: number;
  addressdetails?: boolean;
  extratags?: boolean;
  namedetails?: boolean;
}

export interface ReverseGeocodeRequest {
  lat: number;
  lon: number;
  zoom?: number;
  addressdetails?: boolean;
  extratags?: boolean;
  namedetails?: boolean;
}

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org';

/**
 * Geocode an address to coordinates
 */
export const geocode = async (params: GeocodeRequest): Promise<NominatimResponse[]> => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined) return;
    
    if (Array.isArray(value)) {
      queryParams.append(key, value.join(','));
    } else if (typeof value === 'object' && 'left' in value) {
      // Handle Viewbox
      const vb = value as Viewbox;
      queryParams.append(key, `${vb.left},${vb.top},${vb.right},${vb.bottom}`);
    } else {
      queryParams.append(key, String(value));
    }
  });
  
  queryParams.append('format', 'json');
  
  const response = await fetch(`${NOMINATIM_URL}/search?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Nominatim geocode failed: ${response.statusText}`);
  }
  
  return await response.json();
};

/**
 * Reverse geocode coordinates to an address
 */
export const reverse = async (params: ReverseGeocodeRequest): Promise<NominatimResponse> => {
  const queryParams = new URLSearchParams();
  
  queryParams.append('lat', String(params.lat));
  queryParams.append('lon', String(params.lon));
  queryParams.append('format', 'json');
  
  if (params.zoom !== undefined) {
    queryParams.append('zoom', String(params.zoom));
  }
  
  if (params.addressdetails !== undefined) {
    queryParams.append('addressdetails', String(params.addressdetails ? 1 : 0));
  }
  
  if (params.extratags !== undefined) {
    queryParams.append('extratags', String(params.extratags ? 1 : 0));
  }
  
  if (params.namedetails !== undefined) {
    queryParams.append('namedetails', String(params.namedetails ? 1 : 0));
  }
  
  const response = await fetch(`${NOMINATIM_URL}/reverse?${queryParams.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Nominatim reverse geocode failed: ${response.statusText}`);
  }
  
  return await response.json();
};


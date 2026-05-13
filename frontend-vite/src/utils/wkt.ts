import { wktToGeoJSON, geojsonToWKT } from '@terraformer/wkt';
import type { GeoJSON, Point } from 'geojson';

/**
 * Convert WKT string to GeoJSON
 * @param wkt - WKT string (e.g., "POINT (-122.6764 45.5165)")
 * @returns GeoJSON object or null if invalid
 */
export const parseWkt = (wkt: string | undefined | null): GeoJSON | null => {
  if (!wkt) return null;
  
  try {
    return wktToGeoJSON(wkt);
  } catch (error) {
    console.error('Failed to parse WKT:', error);
    return null;
  }
};

/**
 * Convert WKT POINT to [lng, lat] coordinates
 * @param wkt - WKT POINT string (e.g., "POINT (-122.6764 45.5165)")
 * @returns [longitude, latitude] or null if invalid
 */
export const parseWktPoint = (wkt: string | undefined | null): [number, number] | null => {
  const geojson = parseWkt(wkt);
  
  if (!geojson || geojson.type !== 'Point') return null;
  
  const point = geojson as Point;
  const [lng, lat] = point.coordinates;
  
  if (typeof lng !== 'number' || typeof lat !== 'number') return null;
  if (isNaN(lng) || isNaN(lat)) return null;
  
  return [lng, lat];
};

/**
 * Convert GeoJSON to WKT string
 * @param geojson - GeoJSON object
 * @returns WKT string or null if invalid
 */
export const formatWkt = (geojson: GeoJSON | undefined | null): string | null => {
  if (!geojson) return null;
  
  try {
    return geojsonToWKT(geojson);
  } catch (error) {
    console.error('Failed to format WKT:', error);
    return null;
  }
};

/**
 * Convert [lng, lat] coordinates to WKT POINT string
 * @param lng - Longitude
 * @param lat - Latitude
 * @returns WKT POINT string (e.g., "POINT (-122.6764 45.5165)")
 */
export const formatWktPoint = (lng: number, lat: number): string => {
  const point: Point = {
    type: 'Point',
    coordinates: [lng, lat],
  };
  
  return geojsonToWKT(point);
};


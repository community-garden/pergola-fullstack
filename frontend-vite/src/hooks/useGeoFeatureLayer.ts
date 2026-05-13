import { useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { wktToGeoJSON } from '@terraformer/wkt';

interface GeoFeature {
  '@id': string;
  geo: string; // WKT format
  name?: string;
  description?: string;
  [key: string]: any;
}

interface UseGeoFeatureLayerOptions {
  map: maplibregl.Map | null;
  features: GeoFeature[];
  enabled: boolean;
  onFeatureClick?: (feature: GeoFeature) => void;
}

const LAYER_ID = 'geofeatures-layer';
const SOURCE_ID = 'geofeatures-source';

/**
 * Hook that manages GeoFeature layers on a MapLibre map
 * Features are clickable and displayed in view mode
 */
export const useGeoFeatureLayer = ({
  map,
  features,
  enabled,
  onFeatureClick,
}: UseGeoFeatureLayerOptions) => {
  useEffect(() => {
    if (!map || !map.loaded() || !enabled) return;

    // Convert features to GeoJSON FeatureCollection
    const geojsonFeatures = features
      .filter(f => f.geo)
      .map((feature, index) => {
        try {
          const geometry = wktToGeoJSON(feature.geo);
          
          // Ensure clean properties - only primitives, no complex objects
          return {
            type: 'Feature' as const,
            id: index, // Use simple numeric ID for MapLibre
            geometry,
            properties: {
              featureIRI: feature['@id'],
              name: feature.name || 'Unnamed Feature',
              description: feature.description || '',
            },
          };
        } catch (error) {
          console.error('Failed to convert WKT to GeoJSON for feature:', feature['@id'], error);
          return null;
        }
      })
      .filter(Boolean);

    console.log('geojsonFeatures for view layer:', geojsonFeatures);

    const geojson: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: geojsonFeatures as any,
    };

    // Remove existing layers and source if they exist
    if (map.getLayer(LAYER_ID + '-fill')) map.removeLayer(LAYER_ID + '-fill');
    if (map.getLayer(LAYER_ID + '-line')) map.removeLayer(LAYER_ID + '-line');
    if (map.getLayer(LAYER_ID + '-point')) map.removeLayer(LAYER_ID + '-point');
    if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);

    // Add source
    map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: geojson,
    });

    // Add polygon fill layer
    map.addLayer({
      id: LAYER_ID + '-fill',
      type: 'fill',
      source: SOURCE_ID,
      filter: ['==', '$type', 'Polygon'],
      paint: {
        'fill-color': '#088',
        'fill-opacity': 0.4,
      },
    });

    // Add line layer (for LineStrings and Polygon outlines)
    map.addLayer({
      id: LAYER_ID + '-line',
      type: 'line',
      source: SOURCE_ID,
      filter: ['any',
        ['==', '$type', 'LineString'],
        ['==', '$type', 'Polygon'],
      ],
      paint: {
        'line-color': '#088',
        'line-width': 3,
      },
    });

    // Add point layer
    map.addLayer({
      id: LAYER_ID + '-point',
      type: 'circle',
      source: SOURCE_ID,
      filter: ['==', '$type', 'Point'],
      paint: {
        'circle-radius': 8,
        'circle-color': '#088',
        'circle-stroke-width': 2,
        'circle-stroke-color': '#fff',
      },
    });

    // Add click handlers
    const handleClick = (e: maplibregl.MapLayerMouseEvent) => {
      // Prevent default to avoid querying issues
      e.preventDefault();
      
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const featureIRI = feature.properties?.featureIRI;
      
      if (featureIRI && onFeatureClick) {
        const originalFeature = features.find(f => f['@id'] === featureIRI);
        if (originalFeature) {
          onFeatureClick(originalFeature);
        }
      }

      // Show popup
      const name = feature.properties?.name || 'Feature';
      new maplibregl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<strong>${name}</strong><br/><small>Click for details</small>`)
        .addTo(map);
    };

    // Add hover cursor
    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = 'pointer';
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = '';
    };

    // Register event listeners for all layers
    const layerIds = [LAYER_ID + '-fill', LAYER_ID + '-line', LAYER_ID + '-point'];
    layerIds.forEach(layerId => {
      map.on('click', layerId, handleClick);
      map.on('mouseenter', layerId, handleMouseEnter);
      map.on('mouseleave', layerId, handleMouseLeave);
    });

    // Cleanup
    return () => {
      layerIds.forEach(layerId => {
        if (map.getLayer(layerId)) {
          map.off('click', layerId, handleClick);
          map.off('mouseenter', layerId, handleMouseEnter);
          map.off('mouseleave', layerId, handleMouseLeave);
          map.removeLayer(layerId);
        }
      });
      if (map.getSource(SOURCE_ID)) {
        map.removeSource(SOURCE_ID);
      }
    };
  }, [map, features, enabled, onFeatureClick]);
};


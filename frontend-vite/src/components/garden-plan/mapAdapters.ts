import maplibregl, { type ImageSourceSpecification } from 'maplibre-gl';

const SOURCE_ID = 'garden-plan-image';
const LAYER_ID = 'garden-plan-layer';

export function applyImageSource(
  map: maplibregl.Map,
  spec: ImageSourceSpecification,
  opacity: number
): void {
  if (!map.isStyleLoaded()) return;
  const existing = map.getSource(SOURCE_ID);
  if (existing) {
    (existing as maplibregl.ImageSource).updateImage({
      url: spec.url,
      coordinates: spec.coordinates as [[number, number], [number, number], [number, number], [number, number]],
    });
    map.setPaintProperty(LAYER_ID, 'raster-opacity', opacity);
  } else {
    map.addSource(SOURCE_ID, spec);
    map.addLayer({
      id: LAYER_ID,
      type: 'raster',
      source: SOURCE_ID,
      paint: { 'raster-opacity': opacity },
    });
  }
}

export function removeImageSource(map: maplibregl.Map): void {
  if (!map.isStyleLoaded()) return;
  if (map.getLayer(LAYER_ID)) map.removeLayer(LAYER_ID);
  if (map.getSource(SOURCE_ID)) map.removeSource(SOURCE_ID);
}

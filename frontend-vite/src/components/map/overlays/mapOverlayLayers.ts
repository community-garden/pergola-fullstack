import type maplibregl from 'maplibre-gl';
import type { ResolvedOverlay } from './overlays';

export const OVERLAY_ID_PREFIX = 'map-overlay-';
/** The base maps; overlays go directly above the last of them, below everything else. */
const BASE_LAYERS = ['satellite', 'osm'];

const layerId = (id: string) => OVERLAY_ID_PREFIX + id;

/** First layer above the base maps that is not an overlay: overlays are inserted before it. */
const insertionPoint = (map: maplibregl.Map): string | undefined => {
  const layers = map.getStyle().layers ?? [];
  const lastBase = layers.reduce((acc, l, i) => (BASE_LAYERS.includes(l.id) ? i : acc), -1);
  return layers.slice(lastBase + 1).find((l) => !l.id.startsWith(OVERLAY_ID_PREFIX))?.id;
};

const sameCorners = (a: unknown, b: ResolvedOverlay['corners']) =>
  Array.isArray(a) && a.length === 4 && a.every((p, i) => p[0] === b[i][0] && p[1] === b[i][1]);

/**
 * Brings the overlay layers of the map in line with `overlays` (bottom to top):
 * adds new ones below the beds, updates image, corners, opacity and visibility,
 * keeps the order, removes overlays that are gone. Needs a loaded style.
 */
export const syncOverlayLayers = (map: maplibregl.Map, overlays: ResolvedOverlay[]): void => {
  const wanted = new Set(overlays.map((o) => layerId(o.id)));
  for (const layer of map.getStyle().layers ?? []) {
    if (layer.id.startsWith(OVERLAY_ID_PREFIX) && !wanted.has(layer.id)) {
      map.removeLayer(layer.id);
      if (map.getSource(layer.id)) map.removeSource(layer.id);
    }
  }

  const before = insertionPoint(map);
  for (const overlay of overlays) {
    const id = layerId(overlay.id);
    const source = map.getSource(id) as (maplibregl.ImageSource & { url?: string; coordinates?: unknown }) | undefined;
    if (!source) {
      map.addSource(id, { type: 'image', url: overlay.url, coordinates: overlay.corners });
    } else if (source.url !== overlay.url || !sameCorners(source.coordinates, overlay.corners)) {
      source.updateImage({ url: overlay.url, coordinates: overlay.corners });
    }

    const visibility = overlay.visible ? 'visible' : 'none';
    if (!map.getLayer(id)) {
      map.addLayer(
        {
          id,
          type: 'raster',
          source: id,
          layout: { visibility },
          paint: { 'raster-opacity': overlay.opacity, 'raster-fade-duration': 0 },
        },
        before,
      );
    } else {
      map.setLayoutProperty(id, 'visibility', visibility);
      map.setPaintProperty(id, 'raster-opacity', overlay.opacity);
      // moving each one just below the beds, bottom to top, keeps the order
      map.moveLayer(id, before);
    }
  }
};

export const removeOverlayLayers = (map: maplibregl.Map): void => syncOverlayLayers(map, []);

import { useEffect, useMemo } from 'react';
import type maplibregl from 'maplibre-gl';
import type { MapOverlay } from '../../../schema/map-overlay-schema';
import { resolveOverlays, type OverlayVisibility } from './overlays';
import { removeOverlayLayers, syncOverlayLayers } from './mapOverlayLayers';

/**
 * Draws the overlays of a garden on the map, above the base map and below the
 * beds. `visibility` holds what was switched on the map; everything else
 * follows the stored default of each overlay.
 */
export const useMapOverlays = (
  map: maplibregl.Map | null,
  mapLoaded: boolean,
  overlays: ReadonlyArray<Partial<MapOverlay>> | undefined,
  visibility: OverlayVisibility,
) => {
  const resolved = useMemo(() => resolveOverlays(overlays, visibility), [overlays, visibility]);

  useEffect(() => {
    if (!map || !mapLoaded) return;
    const apply = () => syncOverlayLayers(map, resolved);
    if (map.isStyleLoaded()) apply();
    else map.once('idle', apply);
    return () => {
      map.off('idle', apply);
    };
  }, [map, mapLoaded, resolved]);

  // take the layers down with the garden (or the page)
  useEffect(
    () => () => {
      if (map && map.getStyle()) removeOverlayLayers(map);
    },
    [map],
  );

  return resolved;
};

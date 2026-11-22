import type { MapOverlay } from '../../../schema/map-overlay-schema';
import { parseWkt } from '../../../utils/wkt';

/** [lng, lat] */
export type LngLatTuple = [number, number];
/** top-left, top-right, bottom-right, bottom-left */
export type OverlayCorners = [LngLatTuple, LngLatTuple, LngLatTuple, LngLatTuple];

/**
 * The four corners of an overlay from its WKT POLYGON (top-left, top-right,
 * bottom-right, bottom-left; the closing point is optional). Null if the text
 * is not such a polygon.
 */
export const parseOverlayCorners = (wkt: string | undefined | null): OverlayCorners | null => {
  const geo = parseWkt(wkt);
  if (!geo || geo.type !== 'Polygon') return null;
  const ring = geo.coordinates[0];
  if (!ring || ring.length < 4) return null;
  const points = ring.slice(0, 4);
  if (points.some((p) => p.length < 2 || !Number.isFinite(p[0]) || !Number.isFinite(p[1]))) return null;
  return points.map((p) => [p[0], p[1]] as LngLatTuple) as OverlayCorners;
};

export const formatOverlayCorners = (corners: OverlayCorners): string => {
  const ring = [...corners, corners[0]];
  return `POLYGON ((${ring.map(([lng, lat]) => `${lng} ${lat}`).join(', ')}))`;
};

export const DEFAULT_OVERLAY_OPACITY = 0.85;

export interface ResolvedOverlay {
  id: string;
  name: string;
  url: string;
  corners: OverlayCorners;
  opacity: number;
  visible: boolean;
}

/** Overlay IRI → shown (true) or hidden (false), chosen on the map; beats the stored default. */
export type OverlayVisibility = Record<string, boolean>;

/**
 * Overlays ready to draw: broken ones (no image, no valid corners) are left
 * out, the rest is ordered bottom to top (`sortOrder`, then name).
 */
export const resolveOverlays = (
  overlays: ReadonlyArray<Partial<MapOverlay>> | undefined,
  visibility: OverlayVisibility = {},
): ResolvedOverlay[] =>
  (overlays ?? [])
    .filter((o): o is Partial<MapOverlay> & { '@id': string } => typeof o?.['@id'] === 'string')
    .flatMap((o) => {
      const url = o.overlayImageUrl;
      const corners = parseOverlayCorners(o.corners);
      if (!url || !corners) return [];
      const opacity = typeof o.opacity === 'number' ? Math.min(1, Math.max(0, o.opacity)) : DEFAULT_OVERLAY_OPACITY;
      return [
        {
          order: o.sortOrder ?? 0,
          overlay: {
            id: o['@id'],
            name: o.name ?? '',
            url,
            corners,
            opacity,
            visible: visibility[o['@id']] ?? o.visible !== false,
          } satisfies ResolvedOverlay,
        },
      ];
    })
    .sort((a, b) => a.order - b.order || a.overlay.name.localeCompare(b.overlay.name))
    .map(({ overlay }) => overlay);

/**
 * Small geometry helpers for placing labels on garden features.
 * Coordinates are [lng, lat]; beds are a few metres wide, so a local
 * equirectangular approximation is good enough.
 */

type Position = number[];
type Ring = Position[];

const ringArea = (ring: Ring): number => {
  let sum = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    sum += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  }
  return sum / 2;
};

const ringCentroid = (ring: Ring): [number, number] | undefined => {
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const cross = ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
    area += cross;
    cx += (ring[j][0] + ring[i][0]) * cross;
    cy += (ring[j][1] + ring[i][1]) * cross;
  }
  if (Math.abs(area) < 1e-18) return undefined;
  return [cx / (3 * area), cy / (3 * area)];
};

/** Ray casting; works for any planar coordinates, not only [lng, lat]. */
export const pointInRing = ([x, y]: [number, number], ring: Ring): boolean => {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
};

/** Midpoint of the widest horizontal chord through latitude `y` — always inside. */
const widestChordMidpoint = (ring: Ring, y: number): [number, number] | undefined => {
  const xs: number[] = [];
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if (yi > y !== yj > y) xs.push(((xj - xi) * (y - yi)) / (yj - yi) + xi);
  }
  xs.sort((a, b) => a - b);
  let best: [number, number] | undefined;
  let bestWidth = -1;
  for (let k = 0; k + 1 < xs.length; k += 2) {
    const width = xs[k + 1] - xs[k];
    if (width > bestWidth) {
      bestWidth = width;
      best = [(xs[k] + xs[k + 1]) / 2, y];
    }
  }
  return best;
};

const bboxCenter = (positions: Position[]): [number, number] => {
  const lngs = positions.map((p) => p[0]);
  const lats = positions.map((p) => p[1]);
  return [(Math.min(...lngs) + Math.max(...lngs)) / 2, (Math.min(...lats) + Math.max(...lats)) / 2];
};

const polygonLabelPoint = (rings: Ring[]): [number, number] => {
  const outer = rings[0];
  const centroid = ringCentroid(outer) ?? bboxCenter(outer);
  if (pointInRing(centroid, outer)) return centroid;
  return widestChordMidpoint(outer, centroid[1]) ?? bboxCenter(outer);
};

/** Where to put the label of a feature. */
export const labelPoint = (geometry: GeoJSON.Geometry): [number, number] | undefined => {
  switch (geometry.type) {
    case 'Point':
      return [geometry.coordinates[0], geometry.coordinates[1]];
    case 'LineString': {
      const mid = geometry.coordinates[Math.floor(geometry.coordinates.length / 2)];
      return mid ? [mid[0], mid[1]] : undefined;
    }
    case 'Polygon':
      return geometry.coordinates[0]?.length ? polygonLabelPoint(geometry.coordinates) : undefined;
    case 'MultiPolygon': {
      // label the largest part
      const parts = [...geometry.coordinates].sort(
        (a, b) => Math.abs(ringArea(b[0])) - Math.abs(ringArea(a[0])),
      );
      return parts[0]?.[0]?.length ? polygonLabelPoint(parts[0]) : undefined;
    }
    default:
      return undefined;
  }
};

/** Rough area (in squared degrees) used to rank labels: bigger beds win collisions. */
export const approxArea = (geometry: GeoJSON.Geometry): number => {
  switch (geometry.type) {
    case 'Polygon':
      return Math.abs(ringArea(geometry.coordinates[0] ?? []));
    case 'MultiPolygon':
      return geometry.coordinates.reduce((sum, poly) => sum + Math.abs(ringArea(poly[0] ?? [])), 0);
    default:
      return 0;
  }
};

/** Metres per degree of latitude (and of longitude at the equator). */
export const METERS_PER_DEGREE = 111_320;

/** Outer ring of a polygon, or of the largest part of a multipolygon; undefined for points and lines. */
export const largestRing = (geometry: GeoJSON.Geometry): number[][] | undefined => {
  if (geometry.type === 'Polygon') return geometry.coordinates[0];
  if (geometry.type === 'MultiPolygon') {
    return [...geometry.coordinates]
      .map((poly) => poly[0] ?? [])
      .sort((a, b) => Math.abs(ringArea(b)) - Math.abs(ringArea(a)))[0];
  }
  return undefined;
};

/** Size of a feature on the ground, used to fit plant images into a bed. */
export interface Footprint {
  /** east–west extent of the bounding box in metres */
  widthM: number;
  /** north–south extent of the bounding box in metres */
  heightM: number;
  areaM2: number;
  /** latitude of the feature (for metres per pixel) */
  lat: number;
}

/** Footprint of a polygon (the largest part of a multipolygon); undefined for points and lines. */
export const footprint = (geometry: GeoJSON.Geometry): Footprint | undefined => {
  const ring = largestRing(geometry);
  if (!ring || ring.length < 3) return undefined;
  const lngs = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  const lat = (Math.min(...lats) + Math.max(...lats)) / 2;
  const kx = METERS_PER_DEGREE * Math.cos((lat * Math.PI) / 180);
  const ky = METERS_PER_DEGREE;
  return {
    widthM: (Math.max(...lngs) - Math.min(...lngs)) * kx,
    heightM: (Math.max(...lats) - Math.min(...lats)) * ky,
    areaM2: Math.abs(ringArea(ring)) * kx * ky,
    lat,
  };
};

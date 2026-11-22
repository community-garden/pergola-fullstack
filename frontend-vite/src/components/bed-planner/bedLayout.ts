/**
 * Rows and areas of plants in a bed.
 *
 * Besides a single plant, a placement can be a **row** (a polyline) or an
 * **area** (a polygon) in bed coordinates (cm, see `bedFrame.ts`). Rows and
 * areas store only their shape and spacing; where the single plants stand is
 * computed here:
 *
 *   row   ●───●───●───●     plants every `spacing`, centred on the line
 *
 *   area  ╱‾●‾‾‾●‾‾‾●‾╲     rows parallel to the longest edge, `rowSpacing`
 *        │ ●   ●   ●   │    apart, plants every `spacing` in each row,
 *         ╲_●___●___●_╱     the grid centred in the area
 *
 * The plants keep half a spacing to the ends of a row and to the edges of a
 * rectangular area, so their circles stay inside the drawn shape.
 * Pure functions, coordinates in centimetres.
 */
import { geojsonToWKT, wktToGeoJSON } from '@terraformer/wkt';
import { pointInRing } from '../map/labels/geometry';
import type { LocalPoint } from './bedFrame';

export type ShapeKind = 'line' | 'area';

/** A row (polyline) or an area (polygon ring, without repeating the first point). */
export interface BedShape {
  kind: ShapeKind;
  points: LocalPoint[];
}

/** More plants per row or area are not computed (a typo like 0.1 cm spacing must not freeze the page). */
export const MAX_PLANTS_PER_SHAPE = 2000;
/** Smallest spacing that is used. */
export const MIN_SPACING_CM = 1;

const EPS = 1e-9;

/** Points a shape needs: a row two, an area three. */
export const minPoints = (kind: ShapeKind) => (kind === 'line' ? 2 : 3);

const dist = (a: LocalPoint, b: LocalPoint) => Math.hypot(b.x - a.x, b.y - a.y);

/** Length of a polyline in cm. */
export const polylineLength = (points: LocalPoint[]): number =>
  points.reduce((sum, p, i) => (i === 0 ? 0 : sum + dist(points[i - 1], p)), 0);

/** Area of a polygon ring in cm² (shoelace formula; any orientation). */
export const polygonArea = (ring: LocalPoint[]): number => {
  let twice = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) twice += ring[j].x * ring[i].y - ring[i].x * ring[j].y;
  return Math.abs(twice) / 2;
};

/** The point `at` cm along a polyline. */
const pointAlong = (points: LocalPoint[], at: number): LocalPoint => {
  let walked = 0;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const len = dist(a, b);
    if (walked + len >= at - EPS || i === points.length - 1) {
      const f = len > 0 ? Math.min(1, Math.max(0, (at - walked) / len)) : 0;
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
    }
    walked += len;
  }
  return points[0];
};

/**
 * Plants along a polyline: as many as fit at `spacing` (at least one), centred,
 * so a 300 cm row with 30 cm spacing gets 10 plants at 15, 45, … 285 cm.
 */
export const pointsAlongLine = (points: LocalPoint[], spacing: number): LocalPoint[] => {
  const length = polylineLength(points);
  if (points.length < 2 || length <= 0) return [];
  const s = Math.max(spacing, MIN_SPACING_CM);
  const n = Math.min(MAX_PLANTS_PER_SHAPE, Math.max(1, Math.floor(length / s + EPS)));
  const offset = (length - (n - 1) * s) / 2;
  return Array.from({ length: n }, (_, i) => pointAlong(points, offset + i * s));
};

/** Direction (radians) of the longest edge of a ring. */
const longestEdgeAngle = (ring: LocalPoint[]): number => {
  let best = -1;
  let angle = 0;
  ring.forEach((a, i) => {
    const b = ring[(i + 1) % ring.length];
    const len = dist(a, b);
    if (len > best + EPS) {
      best = len;
      angle = Math.atan2(b.y - a.y, b.x - a.x);
    }
  });
  return angle;
};

const rotate = (p: LocalPoint, angle: number): LocalPoint => {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos };
};

/**
 * Plants filling a polygon: rows parallel to its longest edge, `rowSpacing`
 * apart, a plant every `spacing` in each row; the grid is centred in the area
 * and only points inside the polygon are kept.
 */
export const pointsInArea = (ring: LocalPoint[], spacing: number, rowSpacing = spacing): LocalPoint[] => {
  if (ring.length < 3 || polygonArea(ring) <= 0) return [];
  const s = Math.max(spacing, MIN_SPACING_CM);
  const rs = Math.max(rowSpacing, MIN_SPACING_CM);
  // turn the area so that its longest edge is horizontal, fill it, turn the plants back
  const angle = longestEdgeAngle(ring);
  const turned = ring.map((p) => rotate(p, -angle));
  const xs = turned.map((p) => p.x);
  const ys = turned.map((p) => p.y);
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const nx = Math.max(1, Math.floor((maxX - minX) / s + EPS));
  const ny = Math.max(1, Math.floor((maxY - minY) / rs + EPS));
  const ox = minX + (maxX - minX - (nx - 1) * s) / 2;
  const oy = minY + (maxY - minY - (ny - 1) * rs) / 2;
  const polygon = turned.map((p) => [p.x, p.y]);
  const plants: LocalPoint[] = [];
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const p = { x: ox + i * s, y: oy + j * rs };
      if (!pointInRing([p.x, p.y], polygon)) continue;
      plants.push(rotate(p, angle));
      if (plants.length >= MAX_PLANTS_PER_SHAPE) return plants;
    }
  }
  return plants;
};

export interface ShapePlants {
  /** where the single plants stand (inside the bed, if an outline is given) */
  points: LocalPoint[];
  /** stopped at MAX_PLANTS_PER_SHAPE */
  truncated: boolean;
}

/** The single plants of a row or area; with `bedOutline`, only those inside the bed. */
export const shapePlants = (
  shape: BedShape,
  spacing: number,
  rowSpacing?: number,
  bedOutline?: LocalPoint[],
): ShapePlants => {
  const all = shape.kind === 'line' ? pointsAlongLine(shape.points, spacing) : pointsInArea(shape.points, spacing, rowSpacing);
  const outline = bedOutline?.map((q) => [q.x, q.y]);
  return {
    points: outline ? all.filter((p) => pointInRing([p.x, p.y], outline)) : all,
    truncated: all.length >= MAX_PLANTS_PER_SHAPE,
  };
};

/** Where a shape's label sits: the middle of a row, the centroid of an area. */
export const shapeLabelPoint = (shape: BedShape): LocalPoint => {
  if (shape.kind === 'line') return pointAlong(shape.points, polylineLength(shape.points) / 2);
  const ring = shape.points;
  let twice = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const cross = ring[j].x * ring[i].y - ring[i].x * ring[j].y;
    twice += cross;
    cx += (ring[j].x + ring[i].x) * cross;
    cy += (ring[j].y + ring[i].y) * cross;
  }
  if (Math.abs(twice) < EPS) {
    return { x: ring.reduce((s, p) => s + p.x, 0) / ring.length, y: ring.reduce((s, p) => s + p.y, 0) / ring.length };
  }
  return { x: cx / (3 * twice), y: cy / (3 * twice) };
};

/** The shape moved by `d`. */
export const translateShape = (shape: BedShape, d: LocalPoint): BedShape => ({
  kind: shape.kind,
  points: shape.points.map((p) => ({ x: p.x + d.x, y: p.y + d.y })),
});

/**
 * The shape as stored in `PlantPlacement.shape`: WKT in bed centimetres,
 * `LINESTRING (x y, …)` for a row, `POLYGON ((x y, …))` for an area.
 */
export const shapeToWkt = (shape: BedShape): string => {
  const coords = shape.points.map((p) => [p.x, p.y]);
  return geojsonToWKT(
    shape.kind === 'line'
      ? { type: 'LineString', coordinates: coords }
      : { type: 'Polygon', coordinates: [[...coords, coords[0]]] },
  );
};

/** Reads `PlantPlacement.shape`; undefined for anything but a line string or a polygon. */
export const shapeFromWkt = (wkt: string | undefined): BedShape | undefined => {
  if (!wkt?.trim()) return undefined;
  try {
    const g = wktToGeoJSON(wkt) as GeoJSON.Geometry;
    const pt = (c: GeoJSON.Position): LocalPoint => ({ x: c[0], y: c[1] });
    if (g.type === 'LineString' && g.coordinates.length >= 2) return { kind: 'line', points: g.coordinates.map(pt) };
    if (g.type === 'Polygon' && g.coordinates[0]?.length >= 4) {
      const ring = g.coordinates[0].map(pt);
      const [first, last] = [ring[0], ring[ring.length - 1]];
      return { kind: 'area', points: first.x === last.x && first.y === last.y ? ring.slice(0, -1) : ring };
    }
  } catch {
    // not WKT
  }
  return undefined;
};

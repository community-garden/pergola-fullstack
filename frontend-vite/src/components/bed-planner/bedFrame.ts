/**
 * Bed coordinates for the bed planner.
 *
 * Plants are stored relative to their bed, in centimetres. The reference is a
 * "frame" computed from the bed polygon. The first (and for now only) frame is
 * the bounding box of the polygon:
 *
 *   topLeft = [west, north] ─────────── x (cm, to the east)
 *        │   ╱‾‾‾‾‾‾‾‾╲
 *        │  │   bed    │
 *        │   ╲________╱
 *        y (cm, to the south)           bottomRight = [east, south]
 *
 * Further frames (e.g. a rotated minimum rectangle, so the map can be turned to
 * the bed's long side) get their own `kind`.
 *
 * Beds are a few metres wide, so a local equirectangular approximation is
 * exact enough. It is the same as in `footprint()` (map labels), so sizes agree.
 * Pure functions, no MapLibre: coordinates are GeoJSON `[lng, lat]`.
 */
import { METERS_PER_DEGREE, largestRing, pointInRing } from '../map/labels/geometry';
import { metersPerPixel } from '../map/labels/imageGrid';

export type LngLat = [number, number];

/** A point in bed coordinates: centimetres from the frame's top-left corner. */
export interface LocalPoint {
  x: number;
  y: number;
}

export interface BedFrame {
  kind: 'bbox';
  /** north-west corner, the origin: [west, north] */
  topLeft: LngLat;
  /** south-east corner: [east, south] */
  bottomRight: LngLat;
  widthCm: number;
  heightCm: number;
  /** reference latitude (middle of the box) */
  lat: number;
  /** geographic → bed coordinates (cm, not rounded) */
  toLocal: (p: LngLat) => LocalPoint;
  /** bed coordinates (cm) → geographic */
  toLngLat: (p: LocalPoint) => LngLat;
}

/** Diameter used for plants without a known spacing. */
export const DEFAULT_PLANT_DIAMETER_CM = 30;

/** Outer ring of the bed (largest part of a multipolygon); undefined for points and lines. */
export const bedOutline = (geometry: GeoJSON.Geometry): number[][] | undefined => {
  const ring = largestRing(geometry);
  return ring && ring.length >= 3 ? ring : undefined;
};

/** Top-left (north-west) and bottom-right (south-east) corner of a ring. */
export const boundingBox = (ring: number[][]): { topLeft: LngLat; bottomRight: LngLat } => {
  const lngs = ring.map((p) => p[0]);
  const lats = ring.map((p) => p[1]);
  return {
    topLeft: [Math.min(...lngs), Math.max(...lats)],
    bottomRight: [Math.max(...lngs), Math.min(...lats)],
  };
};

/** Frame from the bounding box of the bed polygon. */
export const bboxFrame = (geometry: GeoJSON.Geometry): BedFrame | undefined => {
  const ring = bedOutline(geometry);
  if (!ring) return undefined;
  const { topLeft, bottomRight } = boundingBox(ring);
  const [west, north] = topLeft;
  const [east, south] = bottomRight;
  const lat = (north + south) / 2;
  const cmPerDegLng = METERS_PER_DEGREE * Math.cos((lat * Math.PI) / 180) * 100;
  const cmPerDegLat = METERS_PER_DEGREE * 100;
  return {
    kind: 'bbox',
    topLeft,
    bottomRight,
    widthCm: (east - west) * cmPerDegLng,
    heightCm: (north - south) * cmPerDegLat,
    lat,
    toLocal: ([lng, la]) => ({ x: (lng - west) * cmPerDegLng, y: (north - la) * cmPerDegLat }),
    toLngLat: ({ x, y }) => [west + x / cmPerDegLng, north - y / cmPerDegLat],
  };
};

/** Round a position to whole centimetres (what is stored). */
export const roundPoint = ({ x, y }: LocalPoint): LocalPoint => ({ x: Math.round(x), y: Math.round(y) });

/** The bed outline in bed coordinates. */
export const outlineLocal = (frame: BedFrame, ring: number[][]): LocalPoint[] =>
  ring.map((p) => frame.toLocal([p[0], p[1]]));

/** Is the point inside the bed polygon (not just inside the box)? */
export const insideBed = (outline: LocalPoint[], p: LocalPoint): boolean =>
  pointInRing(
    [p.x, p.y],
    outline.map((q) => [q.x, q.y]),
  );

/** [[west, south], [east, north]] of the frame, enlarged by `margin` (fraction of width/height). */
export const frameBounds = (frame: BedFrame, margin = 0): [LngLat, LngLat] => {
  const [west, north] = frame.topLeft;
  const [east, south] = frame.bottomRight;
  const dx = (east - west) * margin;
  const dy = (north - south) * margin;
  return [
    [west - dx, south - dy],
    [east + dx, north + dy],
  ];
};

/** The frame as a closed GeoJSON ring (for drawing the box). */
export const frameRing = (frame: BedFrame): LngLat[] => {
  const [west, north] = frame.topLeft;
  const [east, south] = frame.bottomRight;
  return [
    [west, north],
    [east, north],
    [east, south],
    [west, south],
    [west, north],
  ];
};

/**
 * Grid lines every `stepCm` inside the frame, starting at the origin. Lines on
 * multiples of `majorEveryCm` get `major: true`.
 */
export const gridLines = (
  frame: BedFrame,
  stepCm: number,
  majorEveryCm: number,
): GeoJSON.FeatureCollection<GeoJSON.LineString, { major: boolean }> => {
  const features: GeoJSON.Feature<GeoJSON.LineString, { major: boolean }>[] = [];
  const line = (a: LocalPoint, b: LocalPoint, at: number) =>
    features.push({
      type: 'Feature',
      properties: { major: Math.abs(at / majorEveryCm - Math.round(at / majorEveryCm)) < 1e-9 },
      geometry: { type: 'LineString', coordinates: [frame.toLngLat(a), frame.toLngLat(b)] },
    });
  for (let x = 0; x <= frame.widthCm + 1e-6; x += stepCm) line({ x, y: 0 }, { x, y: frame.heightCm }, x);
  for (let y = 0; y <= frame.heightCm + 1e-6; y += stepCm) line({ x: 0, y }, { x: frame.widthCm, y }, y);
  return { type: 'FeatureCollection', features };
};

/** Diameter a plant takes up in the bed: its spacing, else its spread, else a default. */
export const plantDiameterCm = (plant: { spacing?: number; spread?: number }): { cm: number; estimated: boolean } => {
  const cm = plant.spacing ?? plant.spread;
  return cm && cm > 0 ? { cm, estimated: false } : { cm: DEFAULT_PLANT_DIAMETER_CM, estimated: true };
};

/** Screen pixels for a length in centimetres at a zoom level. */
export const cmToPx = (cm: number, lat: number, zoom: number): number => cm / 100 / metersPerPixel(lat, zoom);

/** Zoom at which a `widthCm` × `heightCm` area (seen straight) fits into a `widthPx` × `heightPx` viewport. */
export const fitZoomFor = (
  widthCm: number,
  heightCm: number,
  lat: number,
  widthPx: number,
  heightPx: number,
  paddingPx = 0,
): number => {
  const w = Math.max(1, widthPx - 2 * paddingPx);
  const h = Math.max(1, heightPx - 2 * paddingPx);
  const mpp = Math.max(widthCm / 100 / w, heightCm / 100 / h);
  return Math.log2((40_075_016.686 * Math.cos((lat * Math.PI) / 180)) / (512 * mpp));
};

/** Zoom at which the whole frame fits into a `widthPx` × `heightPx` viewport. */
export const fitZoom = (frame: BedFrame, widthPx: number, heightPx: number, paddingPx = 0): number =>
  fitZoomFor(frame.widthCm, frame.heightCm, frame.lat, widthPx, heightPx, paddingPx);

// ── turned view ──────────────────────────────────────────────────────────────
// A bed standing at 45° is easier to plan when the map is turned so that its
// sides are straight. The turn is only the *view*: plants stay stored in the
// north-up frame above, so turning never moves them. The grid and the box
// follow the view (`ViewRect`).

/** Rotation in degrees (map bearing, clockwise), normalised to [-180, 180). */
export const normalizeRotation = (deg: number): number => ((((deg + 180) % 360) + 360) % 360) - 180;

/**
 * The rotation that makes the longest side of the bed straight, with the
 * smallest turn (−45° … 45°): sides end up vertical or horizontal.
 */
export const bestRotation = (outline: LocalPoint[]): number => {
  let longest = 0;
  let heading = 0;
  for (let i = 0; i < outline.length; i++) {
    const a = outline[i];
    const b = outline[(i + 1) % outline.length];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    if (len > longest) {
      longest = len;
      // compass heading of the side (x east, y south)
      heading = (Math.atan2(b.x - a.x, -(b.y - a.y)) * 180) / Math.PI;
    }
  }
  let r = ((heading % 90) + 90) % 90; // 0 … 90
  if (r > 45) r -= 90;
  return Math.round(r * 10) / 10 || 0;
};

/** The smallest rectangle around the bed that is straight on a map turned by `rotation`. */
export interface ViewRect {
  rotation: number;
  /** corner at the top-left of the screen, in bed coordinates */
  origin: LocalPoint;
  /** unit vectors of screen-right and screen-down, in bed coordinates */
  right: LocalPoint;
  down: LocalPoint;
  widthCm: number;
  heightCm: number;
  /** a point of the rectangle: `a` cm to the right and `b` cm down from the origin */
  at: (a: number, b: number) => LocalPoint;
}

export const viewRect = (outline: LocalPoint[], rotation: number): ViewRect => {
  const r = (rotation * Math.PI) / 180;
  const right = { x: Math.cos(r), y: Math.sin(r) };
  const down = { x: -Math.sin(r), y: Math.cos(r) };
  const as = outline.map((p) => p.x * right.x + p.y * right.y);
  const bs = outline.map((p) => p.x * down.x + p.y * down.y);
  const [a0, a1, b0, b1] = [Math.min(...as), Math.max(...as), Math.min(...bs), Math.max(...bs)];
  const at = (a: number, b: number): LocalPoint => ({
    x: (a0 + a) * right.x + (b0 + b) * down.x,
    y: (a0 + a) * right.y + (b0 + b) * down.y,
  });
  return { rotation, origin: at(0, 0), right, down, widthCm: a1 - a0, heightCm: b1 - b0, at };
};

/** The rectangle as a closed ring of [lng, lat]. */
export const viewRing = (frame: BedFrame, rect: ViewRect): LngLat[] =>
  [rect.at(0, 0), rect.at(rect.widthCm, 0), rect.at(rect.widthCm, rect.heightCm), rect.at(0, rect.heightCm), rect.at(0, 0)].map(
    (p) => frame.toLngLat(p),
  );

/** Grid lines every `stepCm` inside the rectangle, like `gridLines`, but along the turned view. */
export const viewGrid = (
  frame: BedFrame,
  rect: ViewRect,
  stepCm: number,
  majorEveryCm: number,
): GeoJSON.FeatureCollection<GeoJSON.LineString, { major: boolean }> => {
  const features: GeoJSON.Feature<GeoJSON.LineString, { major: boolean }>[] = [];
  const line = (a: LocalPoint, b: LocalPoint, at: number) =>
    features.push({
      type: 'Feature',
      properties: { major: Math.abs(at / majorEveryCm - Math.round(at / majorEveryCm)) < 1e-9 },
      geometry: { type: 'LineString', coordinates: [frame.toLngLat(a), frame.toLngLat(b)] },
    });
  for (let a = 0; a <= rect.widthCm + 1e-6; a += stepCm) line(rect.at(a, 0), rect.at(a, rect.heightCm), a);
  for (let b = 0; b <= rect.heightCm + 1e-6; b += stepCm) line(rect.at(0, b), rect.at(rect.widthCm, b), b);
  return { type: 'FeatureCollection', features };
};

export interface SpacedPlant extends LocalPoint {
  id: string;
  diameterCm: number;
  /** time in the bed [start, end) (e.g. day timestamps); plants that are never there at the same time do not conflict */
  period?: [number, number];
  /** plants of one row or area: their spacing is chosen on purpose, they do not conflict with each other */
  group?: string;
}

const overlap = (a?: [number, number], b?: [number, number]) => !a || !b || (a[0] < b[1] && b[0] < a[1]);

/**
 * Pairs of plants closer than their spacing at the same time: distance < (dA + dB) / 2.
 * Plants are sorted into cells as large as the biggest diameter, so only
 * neighbouring cells are compared (rows and areas have hundreds of plants).
 */
export const spacingConflicts = (plants: SpacedPlant[]): [string, string][] => {
  if (plants.length < 2) return [];
  const cell = Math.max(1, plants.reduce((m, p) => Math.max(m, p.diameterCm), 0));
  const key = (cx: number, cy: number) => `${cx}:${cy}`;
  const cells = new Map<string, number[]>();
  plants.forEach((p, i) => {
    const k = key(Math.floor(p.x / cell), Math.floor(p.y / cell));
    const list = cells.get(k);
    if (list) list.push(i);
    else cells.set(k, [i]);
  });
  const found: [number, number][] = [];
  plants.forEach((a, i) => {
    const cx = Math.floor(a.x / cell);
    const cy = Math.floor(a.y / cell);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (const j of cells.get(key(cx + dx, cy + dy)) ?? []) {
          if (j <= i) continue;
          const b = plants[j];
          if (a.group && a.group === b.group) continue;
          // 1e-6: plants exactly at their spacing (computed rows) are fine
          if (Math.hypot(a.x - b.x, a.y - b.y) < (a.diameterCm + b.diameterCm) / 2 - 1e-6 && overlap(a.period, b.period)) {
            found.push([i, j]);
          }
        }
      }
    }
  });
  found.sort((p, q) => p[0] - q[0] || p[1] - q[1]);
  return found.map(([i, j]) => [plants[i].id, plants[j].id]);
};

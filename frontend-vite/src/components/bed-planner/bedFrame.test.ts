import { describe, expect, it } from 'bun:test';
import { footprint } from '../map/labels/geometry';
import {
  DEFAULT_PLANT_DIAMETER_CM,
  bboxFrame,
  bedOutline,
  cmToPx,
  fitZoom,
  gridLines,
  insideBed,
  outlineLocal,
  plantDiameterCm,
  roundPoint,
  spacingConflicts,
} from './bedFrame';

/** Igel-Beet of the Wurzelwerk garden: a skewed quadrilateral, about 3.0 × 5.1 m. */
const IGEL: GeoJSON.Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [13.731424521, 51.083282497],
      [13.73146509, 51.083276705],
      [13.731447488, 51.083322409],
      [13.731422174, 51.083318829],
      [13.731424521, 51.083282497],
    ],
  ],
};

/** An L-shaped bed, 2 m × 2 m with the north-east quarter missing. */
const L_SHAPE = (() => {
  const lat = 51.0833;
  const dLat = 1 / 111_320; // one metre
  const dLng = 1 / (111_320 * Math.cos((lat * Math.PI) / 180));
  const at = (xM: number, yM: number) => [13.7314 + xM * dLng, lat - yM * dLat];
  return {
    type: 'Polygon',
    coordinates: [[at(0, 0), at(1, 0), at(1, 1), at(2, 1), at(2, 2), at(0, 2), at(0, 0)]],
  } as GeoJSON.Polygon;
})();

describe('bboxFrame', () => {
  const frame = bboxFrame(IGEL)!;

  it('takes the north-west and south-east corner of the polygon', () => {
    expect(frame.kind).toBe('bbox');
    expect(frame.topLeft).toEqual([13.731422174, 51.083322409]);
    expect(frame.bottomRight).toEqual([13.73146509, 51.083276705]);
  });

  it('has the same size as the map label footprint', () => {
    const fp = footprint(IGEL)!;
    expect(frame.widthCm).toBeCloseTo(fp.widthM * 100, 6);
    expect(frame.heightCm).toBeCloseTo(fp.heightM * 100, 6);
    expect(Math.round(frame.widthCm)).toBe(300);
    expect(Math.round(frame.heightCm)).toBe(509);
  });

  it('puts the origin top-left, x to the east and y to the south', () => {
    expect(frame.toLocal(frame.topLeft)).toEqual({ x: 0, y: 0 });
    const se = frame.toLocal(frame.bottomRight);
    expect(se.x).toBeCloseTo(frame.widthCm, 6);
    expect(se.y).toBeCloseTo(frame.heightCm, 6);
  });

  it('converts back and forth below a millimetre', () => {
    for (const p of [
      { x: 0, y: 0 },
      { x: 123.4, y: 456.7 },
      { x: 300, y: 509 },
    ]) {
      const back = frame.toLocal(frame.toLngLat(p));
      expect(Math.abs(back.x - p.x)).toBeLessThan(0.1);
      expect(Math.abs(back.y - p.y)).toBeLessThan(0.1);
    }
    expect(roundPoint({ x: 12.4, y: 12.6 })).toEqual({ x: 12, y: 13 });
  });

  it('has no frame for points and lines', () => {
    expect(bboxFrame({ type: 'Point', coordinates: [13.7, 51.08] })).toBeUndefined();
    expect(bboxFrame({ type: 'LineString', coordinates: [[13.7, 51.08], [13.71, 51.08]] })).toBeUndefined();
  });
});

describe('insideBed', () => {
  it('tests against the polygon, not just the box', () => {
    const frame = bboxFrame(L_SHAPE)!;
    const outline = outlineLocal(frame, bedOutline(L_SHAPE)!);
    expect(Math.round(frame.widthCm)).toBe(200);
    expect(insideBed(outline, { x: 50, y: 50 })).toBe(true); // north-west quarter
    expect(insideBed(outline, { x: 150, y: 150 })).toBe(true); // south-east quarter
    expect(insideBed(outline, { x: 150, y: 50 })).toBe(false); // missing north-east quarter
    expect(insideBed(outline, { x: 250, y: 50 })).toBe(false); // outside the box
  });
});

describe('gridLines', () => {
  it('draws lines from the origin with major lines every 50 cm', () => {
    const frame = bboxFrame(L_SHAPE)!; // 200 × 200 cm
    const grid = gridLines(frame, 10, 50);
    expect(grid.features).toHaveLength(2 * 21); // 0, 10, …, 200 in both directions
    expect(grid.features.filter((f) => f.properties.major)).toHaveLength(2 * 5); // 0, 50, 100, 150, 200
  });
});

describe('plant sizes', () => {
  it('uses the spacing, else the spread, else a default', () => {
    expect(plantDiameterCm({ spacing: 15, spread: 40 })).toEqual({ cm: 15, estimated: false });
    expect(plantDiameterCm({ spread: 40 })).toEqual({ cm: 40, estimated: false });
    expect(plantDiameterCm({})).toEqual({ cm: DEFAULT_PLANT_DIAMETER_CM, estimated: true });
  });

  it('doubles in pixels with each zoom level', () => {
    const lat = 51.0833;
    expect(cmToPx(30, lat, 23) * 2).toBeCloseTo(cmToPx(30, lat, 24), 9);
  });

  it('finds the zoom that shows the whole bed', () => {
    const frame = bboxFrame(IGEL)!;
    const zoom = fitZoom(frame, 700, 500);
    expect(cmToPx(frame.heightCm, frame.lat, zoom)).toBeCloseTo(500, 6); // the long side fills the height
    expect(cmToPx(frame.widthCm, frame.lat, zoom)).toBeLessThanOrEqual(700);
  });
});

describe('spacingConflicts', () => {
  it('reports plants closer than their spacing', () => {
    const plants = [
      { id: 'a', x: 0, y: 0, diameterCm: 30 },
      { id: 'b', x: 20, y: 0, diameterCm: 30 }, // 20 < 30: conflict with a
      { id: 'c', x: 60, y: 0, diameterCm: 30 }, // 40 from b: fine
    ];
    expect(spacingConflicts(plants)).toEqual([['a', 'b']]);
  });

  it('ignores plants that are not in the bed at the same time', () => {
    const radish = { id: 'radish', x: 0, y: 0, diameterCm: 5, period: [3, 6] as [number, number] }; // until May
    const maize = { id: 'maize', x: 10, y: 0, diameterCm: 30, period: [6, 10] as [number, number] }; // from June
    const pumpkin = { id: 'pumpkin', x: 20, y: 0, diameterCm: 100, period: [4, 11] as [number, number] };
    expect(spacingConflicts([radish, maize])).toEqual([]);
    expect(spacingConflicts([radish, pumpkin])).toEqual([['radish', 'pumpkin']]);
  });
});

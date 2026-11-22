import { describe, expect, it } from 'bun:test';
import { spacingConflicts, type LocalPoint } from './bedFrame';
import {
  MAX_PLANTS_PER_SHAPE,
  pointsAlongLine,
  pointsInArea,
  polygonArea,
  polylineLength,
  shapeFromWkt,
  shapeLabelPoint,
  shapePlants,
  shapeToWkt,
  translateShape,
} from './bedLayout';

const rounded = (points: LocalPoint[]) => points.map((p) => [Math.round(p.x * 10) / 10, Math.round(p.y * 10) / 10]);

describe('rows', () => {
  it('centres the plants on the line, half a spacing from the ends', () => {
    const row = [
      { x: 0, y: 50 },
      { x: 300, y: 50 },
    ];
    expect(polylineLength(row)).toBe(300);
    const plants = pointsAlongLine(row, 30);
    expect(plants).toHaveLength(10);
    expect(rounded(plants)[0]).toEqual([15, 50]);
    expect(rounded(plants)[9]).toEqual([285, 50]);
  });

  it('follows a bent row', () => {
    const bent = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
    ];
    const plants = rounded(pointsAlongLine(bent, 50)); // 200 cm: 4 plants at 25, 75, 125, 175 cm along the line
    expect(plants).toEqual([
      [25, 0],
      [75, 0],
      [100, 25],
      [100, 75],
    ]);
  });

  it('puts one plant in the middle of a row shorter than the spacing', () => {
    expect(rounded(pointsAlongLine([{ x: 0, y: 0 }, { x: 20, y: 0 }], 30))).toEqual([[10, 0]]);
    expect(pointsAlongLine([{ x: 5, y: 5 }], 30)).toEqual([]);
  });
});

describe('areas', () => {
  const rect = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 50 },
    { x: 0, y: 50 },
  ];

  it('fills a rectangle in rows, centred', () => {
    expect(polygonArea(rect)).toBe(5000);
    const plants = rounded(pointsInArea(rect, 25));
    expect(plants).toHaveLength(8); // 4 per row, 2 rows
    expect(plants[0]).toEqual([12.5, 12.5]);
    expect(plants[7]).toEqual([87.5, 37.5]);
  });

  it('uses a separate row spacing', () => {
    expect(pointsInArea(rect, 10, 25)).toHaveLength(10 * 2);
  });

  it('lays the rows along the longest edge', () => {
    // the same rectangle turned by 90°: 50 wide, 100 high → rows run north–south
    const tall = rect.map((p) => ({ x: p.y, y: p.x }));
    const plants = pointsInArea(tall, 25, 40);
    // 100 cm long rows with 4 plants; 50 cm across fits one row at 40 cm spacing
    expect(plants).toHaveLength(4);
    expect(new Set(plants.map((p) => Math.round(p.x)))).toEqual(new Set([25]));
  });

  it('keeps only points inside the polygon', () => {
    const triangle = [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 0, y: 100 },
    ];
    const plants = pointsInArea(triangle, 10);
    expect(plants.length).toBeGreaterThan(30);
    expect(plants.length).toBeLessThan(60); // about half of the 10 × 10 box
    for (const p of plants) expect(p.x + p.y).toBeLessThanOrEqual(100 + 1e-6);
  });

  it('stops at the maximum number of plants', () => {
    const big = rect.map((p) => ({ x: p.x * 10, y: p.y * 10 })); // 10 × 5 m at 1 cm
    const { points, truncated } = shapePlants({ kind: 'area', points: big }, 1);
    expect(points).toHaveLength(MAX_PLANTS_PER_SHAPE);
    expect(truncated).toBe(true);
  });
});

describe('shapes', () => {
  it('keeps only the plants inside the bed', () => {
    const bed = [
      { x: 0, y: 0 },
      { x: 200, y: 0 },
      { x: 200, y: 100 },
      { x: 0, y: 100 },
    ];
    // a 300 cm row that leaves the bed after 200 cm
    const { points } = shapePlants({ kind: 'line', points: [{ x: 0, y: 50 }, { x: 300, y: 50 }] }, 30, undefined, bed);
    expect(points).toHaveLength(7); // 15 … 195
  });

  it('has a label point in the middle', () => {
    expect(shapeLabelPoint({ kind: 'line', points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 100 }] })).toEqual({ x: 100, y: 0 });
    const area = shapeLabelPoint({ kind: 'area', points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 100, y: 50 }, { x: 0, y: 50 }] });
    expect(area.x).toBeCloseTo(50, 9);
    expect(area.y).toBeCloseTo(25, 9);
  });

  it('moves a shape', () => {
    expect(translateShape({ kind: 'line', points: [{ x: 0, y: 0 }, { x: 10, y: 0 }] }, { x: 5, y: -2 })).toEqual({
      kind: 'line',
      points: [
        { x: 5, y: -2 },
        { x: 15, y: -2 },
      ],
    });
  });

  it('is stored as WKT in centimetres', () => {
    const row = { kind: 'line' as const, points: [{ x: 10, y: 20 }, { x: 200, y: 25 }] };
    const area = { kind: 'area' as const, points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 0, y: 50 }] };
    expect(shapeToWkt(row)).toBe('LINESTRING (10 20, 200 25)');
    expect(shapeToWkt(area)).toBe('POLYGON ((0 0, 100 0, 0 50, 0 0))');
    expect(shapeFromWkt(shapeToWkt(row))).toEqual(row);
    expect(shapeFromWkt(shapeToWkt(area))).toEqual(area);
    expect(shapeFromWkt('POINT (1 2)')).toBeUndefined();
    expect(shapeFromWkt('nonsense')).toBeUndefined();
    expect(shapeFromWkt(undefined)).toBeUndefined();
  });
});

describe('conflicts of rows', () => {
  it('ignores plants of the same row, but not of another', () => {
    const row = pointsAlongLine([{ x: 0, y: 0 }, { x: 100, y: 0 }], 10).map((p, i) => ({
      ...p,
      id: `row#${i}`,
      diameterCm: 20, // spacing 10 is closer than the plant's 20 cm: chosen on purpose
      group: 'row',
    }));
    expect(spacingConflicts(row)).toEqual([]);
    const pumpkin = { id: 'pumpkin', x: 50, y: 30, diameterCm: 100 };
    const pairs = spacingConflicts([...row, pumpkin]);
    expect(pairs.length).toBeGreaterThan(0);
    expect(pairs.every(([, b]) => b === 'pumpkin')).toBe(true);
  });

  it('does not report plants exactly at their spacing', () => {
    const plants = pointsAlongLine([{ x: 0, y: 0 }, { x: 70, y: 13 }], 7).map((p, i) => ({ ...p, id: `p${i}`, diameterCm: 7 }));
    expect(spacingConflicts(plants)).toEqual([]);
  });
});

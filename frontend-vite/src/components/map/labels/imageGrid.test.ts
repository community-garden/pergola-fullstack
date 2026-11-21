import { describe, it, expect } from 'bun:test';
import { IMAGE_GRID, imageGridFor, metersPerPixel } from './imageGrid';
import type { Footprint } from './geometry';

const LAT = 52.5;
/** an axis-aligned rectangular bed of w × h metres */
const bed = (widthM: number, heightM: number): Footprint => ({
  widthM,
  heightM,
  areaM2: widthM * heightM,
  lat: LAT,
});

describe('metersPerPixel', () => {
  it('halves with every zoom level', () => {
    expect(metersPerPixel(LAT, 21) / metersPerPixel(LAT, 22)).toBeCloseTo(2);
  });
});

describe('imageGridFor', () => {
  it('needs a footprint and at least one plant', () => {
    expect(imageGridFor(undefined, 3, 21)).toBeUndefined();
    expect(imageGridFor(bed(4, 4), 0, 21)).toBeUndefined();
  });

  it('falls back to the text list when the bed is too small on screen', () => {
    expect(imageGridFor(bed(2, 2), 4, 19)).toBeUndefined();
  });

  it('grows with the zoom level and shows names once the images are big', () => {
    const near = imageGridFor(bed(4, 4), 4, 21)!;
    const nearer = imageGridFor(bed(4, 4), 4, 22)!;
    expect(nearer.size).toBeGreaterThan(near.size);
    expect(nearer.captionLines).toBeGreaterThan(0);
  });

  it('gives fewer plants bigger images', () => {
    const one = imageGridFor(bed(4, 4), 1, 21)!;
    const six = imageGridFor(bed(4, 4), 6, 21)!;
    expect(one.size).toBeGreaterThan(six.size);
  });

  it('never exceeds the maximum size', () => {
    expect(imageGridFor(bed(20, 20), 1, 22)!.size).toBe(IMAGE_GRID.maxSize);
  });

  it('stacks the plants of a narrow bed in one column', () => {
    expect(imageGridFor(bed(1.2, 6), 3, 22)!.columns).toBe(1);
  });

  it('keeps images small in a rotated bed whose bounding box is much larger than its area', () => {
    const square = imageGridFor(bed(4, 4), 2, 22)!;
    const rotated = imageGridFor({ ...bed(4, 4), areaM2: 4 }, 2, 22)!;
    expect(rotated.size).toBeLessThan(square.size);
  });
});

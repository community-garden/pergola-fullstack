import type { Footprint } from './geometry';

/**
 * Sizing of plant images inside a bed label: the images of all plants of a
 * bed are laid out as a grid that fits the bed as it appears on screen.
 * Few plants in a big bed get big images; many plants or a small bed get
 * small ones, or the text list when the images would be too small.
 */
export const IMAGE_GRID = {
  /** below this edge length the text list with small icons is clearer */
  minSize: 40,
  /** from this edge length the plant name is shown under each image */
  captionMinSize: 64,
  maxSize: 120,
  /** share of the bed's bounding box the grid may use */
  fill: 0.85,
  /** share of the bed's area the images may cover (keeps rotated beds in check) */
  areaFill: 0.6,
  gap: 4,
  /** caption lines of 12 px under each image, plus 2 px space */
  captionLineHeight: 12,
  titleHeight: 14,
} as const;

export interface ImageGrid {
  /** edge length of one image in CSS px */
  size: number;
  columns: number;
  /** lines of the plant name under each image: 2, 1 (ellipsis) or 0 (no names) */
  captionLines: 0 | 1 | 2;
}

export const captionHeight = (lines: number) => (lines ? lines * IMAGE_GRID.captionLineHeight + 2 : 0);

/** Metres per CSS pixel at a MapLibre zoom level (512 px tiles). */
export const metersPerPixel = (lat: number, zoom: number): number =>
  (40_075_016.686 * Math.cos((lat * Math.PI) / 180)) / (512 * 2 ** zoom);

/** Largest square cell for `count` items in a `width` × `height` box. */
const bestFit = (count: number, width: number, height: number, extraHeight: number) => {
  let best = { size: 0, columns: 1 };
  for (let columns = 1; columns <= count; columns++) {
    const rows = Math.ceil(count / columns);
    const size = Math.min(
      (width - IMAGE_GRID.gap * (columns - 1)) / columns,
      (height - IMAGE_GRID.gap * (rows - 1)) / rows - extraHeight,
    );
    if (size > best.size) best = { size, columns };
  }
  return best;
};

/**
 * Image grid for `count` plants in a bed with the given footprint at `zoom`,
 * or undefined when the images would be smaller than `IMAGE_GRID.minSize`.
 */
export const imageGridFor = (
  footprint: Footprint | undefined,
  count: number,
  zoom: number,
): ImageGrid | undefined => {
  if (!footprint || count < 1) return undefined;
  const mpp = metersPerPixel(footprint.lat, zoom);
  const width = (footprint.widthM / mpp) * IMAGE_GRID.fill;
  const height = (footprint.heightM / mpp) * IMAGE_GRID.fill - IMAGE_GRID.titleHeight;
  const areaLimit = Math.sqrt((IMAGE_GRID.areaFill * footprint.areaM2) / (mpp * mpp) / count);
  const limit = (size: number) => Math.floor(Math.min(size, areaLimit, IMAGE_GRID.maxSize));

  // names in two lines if they fit, else in one line, else images only
  for (const captionLines of [2, 1] as const) {
    const fit = bestFit(count, width, height, captionHeight(captionLines));
    if (limit(fit.size) >= IMAGE_GRID.captionMinSize) {
      return { size: limit(fit.size), columns: fit.columns, captionLines };
    }
  }
  const plain = bestFit(count, width, height, 0);
  if (limit(plain.size) >= IMAGE_GRID.minSize) {
    return { size: limit(plain.size), columns: plain.columns, captionLines: 0 };
  }
  return undefined;
};

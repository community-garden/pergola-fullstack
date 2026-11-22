import type maplibregl from 'maplibre-gl';
import { resolveMediaUrl } from '@utils/mediaUrl';

/** Logical edge length of a plant sprite (drawn at twice the resolution). */
export const SPRITE_PX = 64;
const PIXEL_RATIO = 2;

/** Map image id of a plant's sprite. */
export const spriteId = (icon?: string, image?: string) => `plant:${image ?? ''}:${icon ?? ''}`;

/** A round picture: the image cropped to a circle, or the emoji. */
const drawSprite = (icon: string | undefined, img?: HTMLImageElement): ImageData => {
  const size = SPRITE_PX * PIXEL_RATIO;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
  ctx.clip();
  if (img) {
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
  } else {
    ctx.font = `${Math.round(size * 0.72)}px "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(icon ?? '🌱', size / 2, size * 0.54);
  }
  return ctx.getImageData(0, 0, size, size);
};

/**
 * Makes sure the map has the sprite of a plant and returns its id: the emoji
 * right away, replaced by the image once it has loaded.
 */
export const ensureSprite = (map: maplibregl.Map, icon?: string, image?: string): string => {
  const id = spriteId(icon, image);
  if (map.hasImage(id)) return id;
  map.addImage(id, drawSprite(icon), { pixelRatio: PIXEL_RATIO });
  const src = resolveMediaUrl(image);
  if (src) {
    const img = new Image();
    img.onload = () => {
      if (map.getStyle() && map.hasImage(id)) map.updateImage(id, drawSprite(icon, img));
    };
    img.src = src;
  }
  return id;
};

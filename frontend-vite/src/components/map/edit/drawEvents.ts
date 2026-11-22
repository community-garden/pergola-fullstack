import type { TerraDrawEventListeners } from 'terra-draw';

/** Second argument of TerraDraw's 'finish' event: the mode and the action that ended. */
export type DrawFinishContext = Parameters<TerraDrawEventListeners['finish']>[1];

/**
 * TerraDraw fires 'finish' when a new shape is drawn, and also when an edit in select
 * mode ends: a corner or the whole shape dragged, a point inserted or deleted, a shape
 * resized. Only the action 'draw' means a new shape; everything else is an edit of a
 * shape that already exists and must not create a second GeoFeature.
 */
export const isEditFinish = (context?: { mode?: string; action?: string } | null): boolean =>
  Boolean(context?.action) && context?.action !== 'draw';

import { describe, expect, it } from 'bun:test';
import { isEditFinish } from './drawEvents';

describe('isEditFinish', () => {
  it('treats a newly drawn shape as new', () => {
    expect(isEditFinish({ mode: 'polygon', action: 'draw' })).toBe(false);
  });

  it('treats edits in select mode as edits', () => {
    for (const action of [
      'dragCoordinate',
      'dragFeature',
      'dragCoordinateResize',
      'insertMidpoint',
      'deleteCoordinate',
      'edit',
    ]) {
      expect(isEditFinish({ mode: 'select', action })).toBe(true);
    }
  });

  it('falls back to "new" without a context (the caller also checks the id mapping)', () => {
    expect(isEditFinish(undefined)).toBe(false);
    expect(isEditFinish(null)).toBe(false);
    expect(isEditFinish({})).toBe(false);
  });
});

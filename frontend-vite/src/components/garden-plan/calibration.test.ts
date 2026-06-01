import { describe, it, expect } from 'bun:test';
import {
  buildImageSource,
  updateCorner,
  nextUnplacedCorner,
  isCalibrated,
  calibrationReducer,
} from './calibration';
import { EMPTY_CORNERS } from './types';
import type { Corners, CalibrationState } from './types';

// ── Fixtures ─────────────────────────────────────────────────────────────────

const TL = { lng: 0, lat: 1 };
const TR = { lng: 1, lat: 1 };
const BR = { lng: 1, lat: 0 };
const BL = { lng: 0, lat: 0 };

const FULL_CORNERS: Corners = { topLeft: TL, topRight: TR, bottomRight: BR, bottomLeft: BL };

// ── buildImageSource ──────────────────────────────────────────────────────────

describe('buildImageSource', () => {
  it('returns image source spec with correct coordinate order', () => {
    const spec = buildImageSource('https://example.com/plan.jpg', FULL_CORNERS);
    expect(spec.type).toBe('image');
    expect(spec.url).toBe('https://example.com/plan.jpg');
    expect(spec.coordinates).toEqual([
      [TL.lng, TL.lat],
      [TR.lng, TR.lat],
      [BR.lng, BR.lat],
      [BL.lng, BL.lat],
    ]);
  });
});

// ── updateCorner ──────────────────────────────────────────────────────────────

describe('updateCorner', () => {
  it('sets a single corner without mutating others', () => {
    const result = updateCorner(EMPTY_CORNERS, 'topLeft', TL);
    expect(result.topLeft).toEqual(TL);
    expect(result.topRight).toBeNull();
    expect(result.bottomRight).toBeNull();
    expect(result.bottomLeft).toBeNull();
  });

  it('overwrites an already-placed corner', () => {
    const after = updateCorner(FULL_CORNERS, 'topLeft', { lng: 99, lat: 99 });
    expect(after.topLeft).toEqual({ lng: 99, lat: 99 });
    expect(after.topRight).toEqual(TR);
  });
});

// ── nextUnplacedCorner ────────────────────────────────────────────────────────

describe('nextUnplacedCorner', () => {
  it('returns topLeft when all corners are empty', () => {
    expect(nextUnplacedCorner(EMPTY_CORNERS)).toBe('topLeft');
  });

  it('returns topRight after topLeft is placed', () => {
    const c = updateCorner(EMPTY_CORNERS, 'topLeft', TL);
    expect(nextUnplacedCorner(c)).toBe('topRight');
  });

  it('returns bottomRight after topLeft and topRight are placed', () => {
    const c = updateCorner(updateCorner(EMPTY_CORNERS, 'topLeft', TL), 'topRight', TR);
    expect(nextUnplacedCorner(c)).toBe('bottomRight');
  });

  it('returns bottomLeft when only bottomLeft is missing', () => {
    const c: Corners = { topLeft: TL, topRight: TR, bottomRight: BR, bottomLeft: null };
    expect(nextUnplacedCorner(c)).toBe('bottomLeft');
  });

  it('returns null when all four corners are placed', () => {
    expect(nextUnplacedCorner(FULL_CORNERS)).toBeNull();
  });
});

// ── isCalibrated ──────────────────────────────────────────────────────────────

describe('isCalibrated', () => {
  it('returns false when any corner is null', () => {
    expect(isCalibrated(EMPTY_CORNERS)).toBe(false);
    expect(isCalibrated({ ...FULL_CORNERS, bottomLeft: null })).toBe(false);
  });

  it('returns true for a valid non-degenerate quadrilateral', () => {
    expect(isCalibrated(FULL_CORNERS)).toBe(true);
  });

  it('returns false when points are collinear', () => {
    // All points on the same horizontal line
    const collinear: Corners = {
      topLeft: { lng: 0, lat: 0 },
      topRight: { lng: 1, lat: 0 },
      bottomRight: { lng: 2, lat: 0 },
      bottomLeft: { lng: 3, lat: 0 },
    };
    expect(isCalibrated(collinear)).toBe(false);
  });
});

// ── calibrationReducer ────────────────────────────────────────────────────────

describe('calibrationReducer', () => {
  const idle: CalibrationState = { stage: 'idle' };
  const uploading: CalibrationState = { stage: 'uploading' };
  const placing: CalibrationState = {
    stage: 'placing_corners',
    imageUrl: 'https://example.com/plan.jpg',
    corners: EMPTY_CORNERS,
  };
  const adjusting: CalibrationState = {
    stage: 'adjusting',
    imageUrl: 'https://example.com/plan.jpg',
    corners: FULL_CORNERS,
    opacity: 0.7,
  };
  const confirmed: CalibrationState = {
    stage: 'confirmed',
    imageUrl: 'https://example.com/plan.jpg',
    corners: FULL_CORNERS,
  };

  it('startUpload: idle → uploading', () => {
    expect(calibrationReducer(idle, { type: 'startUpload' })).toEqual(uploading);
  });

  it('imageUploaded: uploading → placing_corners with empty corners', () => {
    const next = calibrationReducer(uploading, {
      type: 'imageUploaded',
      imageUrl: 'https://example.com/plan.jpg',
    });
    expect(next.stage).toBe('placing_corners');
    if (next.stage === 'placing_corners') {
      expect(next.corners).toEqual(EMPTY_CORNERS);
      expect(next.imageUrl).toBe('https://example.com/plan.jpg');
    }
  });

  it('uploadFailed: uploading → idle', () => {
    expect(calibrationReducer(uploading, { type: 'uploadFailed' })).toEqual(idle);
  });

  it('placeCorner: places a corner in placing_corners stage', () => {
    const next = calibrationReducer(placing, { type: 'placeCorner', key: 'topLeft', lngLat: TL });
    expect(next.stage).toBe('placing_corners');
    if (next.stage === 'placing_corners') {
      expect(next.corners.topLeft).toEqual(TL);
    }
  });

  it('placeCorner: transitions to adjusting when all 4 corners placed', () => {
    let state: CalibrationState = placing;
    state = calibrationReducer(state, { type: 'placeCorner', key: 'topLeft', lngLat: TL });
    state = calibrationReducer(state, { type: 'placeCorner', key: 'topRight', lngLat: TR });
    state = calibrationReducer(state, { type: 'placeCorner', key: 'bottomRight', lngLat: BR });
    state = calibrationReducer(state, { type: 'placeCorner', key: 'bottomLeft', lngLat: BL });
    expect(state.stage).toBe('adjusting');
    if (state.stage === 'adjusting') {
      expect(state.opacity).toBe(0.7);
    }
  });

  it('placeCorner: allows repositioning in adjusting stage', () => {
    const next = calibrationReducer(adjusting, {
      type: 'placeCorner',
      key: 'topLeft',
      lngLat: { lng: 99, lat: 99 },
    });
    expect(next.stage).toBe('adjusting');
    if (next.stage === 'adjusting') {
      expect(next.corners.topLeft).toEqual({ lng: 99, lat: 99 });
    }
  });

  it('placeCorner: ignored in idle/confirmed stage', () => {
    expect(calibrationReducer(idle, { type: 'placeCorner', key: 'topLeft', lngLat: TL })).toEqual(
      idle
    );
    expect(
      calibrationReducer(confirmed, { type: 'placeCorner', key: 'topLeft', lngLat: TL })
    ).toEqual(confirmed);
  });

  it('setOpacity: updates opacity in adjusting stage', () => {
    const next = calibrationReducer(adjusting, { type: 'setOpacity', opacity: 0.3 });
    expect(next.stage).toBe('adjusting');
    if (next.stage === 'adjusting') expect(next.opacity).toBe(0.3);
  });

  it('setOpacity: ignored outside adjusting stage', () => {
    expect(calibrationReducer(idle, { type: 'setOpacity', opacity: 0.3 })).toEqual(idle);
    expect(calibrationReducer(confirmed, { type: 'setOpacity', opacity: 0.3 })).toEqual(confirmed);
  });

  it('confirm: adjusting → confirmed', () => {
    const next = calibrationReducer(adjusting, { type: 'confirm' });
    expect(next.stage).toBe('confirmed');
    if (next.stage === 'confirmed') {
      expect(next.imageUrl).toBe(adjusting.imageUrl);
      expect(next.corners).toEqual(FULL_CORNERS);
    }
  });

  it('confirm: ignored outside adjusting stage', () => {
    expect(calibrationReducer(idle, { type: 'confirm' })).toEqual(idle);
  });

  it('reset: any state → idle', () => {
    expect(calibrationReducer(placing, { type: 'reset' })).toEqual(idle);
    expect(calibrationReducer(adjusting, { type: 'reset' })).toEqual(idle);
    expect(calibrationReducer(confirmed, { type: 'reset' })).toEqual(idle);
  });
});

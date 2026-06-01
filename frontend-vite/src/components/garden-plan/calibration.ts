import type { ImageSourceSpecification } from 'maplibre-gl';
import { CORNER_KEYS, EMPTY_CORNERS } from './types';
import type { CalibrationState, CornerKey, Corners, LngLat } from './types';

export function buildImageSource(url: string, corners: Corners): ImageSourceSpecification {
  return {
    type: 'image',
    url,
    coordinates: [
      [corners.topLeft!.lng, corners.topLeft!.lat],
      [corners.topRight!.lng, corners.topRight!.lat],
      [corners.bottomRight!.lng, corners.bottomRight!.lat],
      [corners.bottomLeft!.lng, corners.bottomLeft!.lat],
    ],
  };
}

export function updateCorner(corners: Corners, key: CornerKey, lngLat: LngLat): Corners {
  return { ...corners, [key]: lngLat };
}

export function nextUnplacedCorner(corners: Corners): CornerKey | null {
  return CORNER_KEYS.find(k => corners[k] === null) ?? null;
}

export function isCalibrated(corners: Corners): boolean {
  const { topLeft, topRight, bottomRight, bottomLeft } = corners;
  if (!topLeft || !topRight || !bottomRight || !bottomLeft) return false;
  // Cross product (TL→TR) × (TL→BL) — must be non-zero to ensure points are not collinear
  const cross =
    (topRight.lng - topLeft.lng) * (bottomLeft.lat - topLeft.lat) -
    (topRight.lat - topLeft.lat) * (bottomLeft.lng - topLeft.lng);
  return Math.abs(cross) > 1e-10;
}

export type CalibrationAction =
  | { type: 'startUpload' }
  | { type: 'imageUploaded'; imageUrl: string }
  | { type: 'uploadFailed' }
  | { type: 'placeCorner'; key: CornerKey; lngLat: LngLat }
  | { type: 'setOpacity'; opacity: number }
  | { type: 'confirm' }
  | { type: 'reset' };

export function calibrationReducer(
  state: CalibrationState,
  action: CalibrationAction
): CalibrationState {
  switch (action.type) {
    case 'startUpload':
      return { stage: 'uploading' };

    case 'imageUploaded':
      return { stage: 'placing_corners', imageUrl: action.imageUrl, corners: EMPTY_CORNERS };

    case 'uploadFailed':
      return { stage: 'idle' };

    case 'placeCorner': {
      if (state.stage !== 'placing_corners' && state.stage !== 'adjusting') return state;
      const corners = updateCorner(state.corners, action.key, action.lngLat);
      if (state.stage === 'placing_corners' && isCalibrated(corners)) {
        return { stage: 'adjusting', imageUrl: state.imageUrl, corners, opacity: 0.7 };
      }
      return { ...state, corners };
    }

    case 'setOpacity':
      if (state.stage !== 'adjusting') return state;
      return { ...state, opacity: action.opacity };

    case 'confirm':
      if (state.stage !== 'adjusting') return state;
      return { stage: 'confirmed', imageUrl: state.imageUrl, corners: state.corners };

    case 'reset':
      return { stage: 'idle' };

    default:
      return state;
  }
}

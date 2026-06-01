import { useCallback, useEffect, useReducer, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { useImageUpload } from '../graviola/renderers/image-upload/useImageUpload';
import { useMediaConfig } from '../graviola/renderers/image-upload/MediaConfigContext';
import {
  buildImageSource,
  calibrationReducer,
  isCalibrated,
  nextUnplacedCorner,
} from './calibration';
import { applyImageSource, removeImageSource } from './mapAdapters';
import type { CalibrationState, CornerKey, LngLat } from './types';

export interface UseGardenPlanCalibrationResult {
  state: CalibrationState;
  uploadStatus: ReturnType<typeof useImageUpload>['status'];
  uploadError: string | null;
  upload: (file: File) => Promise<void>;
  placeCorner: (key: CornerKey, lngLat: LngLat) => void;
  placeNextCorner: (lngLat: LngLat) => void;
  setOpacity: (opacity: number) => void;
  confirm: () => void;
  reset: () => void;
  isCalibrated: boolean;
  nextCorner: CornerKey | null;
}

export function useGardenPlanCalibration(
  map: maplibregl.Map | null,
  initialState?: CalibrationState
): UseGardenPlanCalibrationResult {
  const [state, dispatch] = useReducer(
    calibrationReducer,
    initialState ?? { stage: 'idle' }
  );

  const { mediaApiBase } = useMediaConfig();
  const imageUpload = useImageUpload({ apiBase: mediaApiBase });
  const prevUploadStatusRef = useRef(imageUpload.status);

  // Watch upload completion and drive the state machine
  useEffect(() => {
    const prev = prevUploadStatusRef.current;
    const curr = imageUpload.status;
    prevUploadStatusRef.current = curr;

    if (prev !== 'done' && curr === 'done' && imageUpload.mediaIri) {
      dispatch({ type: 'imageUploaded', imageUrl: imageUpload.mediaIri });
    } else if (prev !== 'error' && curr === 'error') {
      dispatch({ type: 'uploadFailed' });
    }
  }, [imageUpload.status, imageUpload.mediaIri]);

  // Sync image source / opacity with map
  useEffect(() => {
    if (!map) return;
    if (state.stage === 'adjusting' || state.stage === 'confirmed') {
      const opacity = state.stage === 'adjusting' ? state.opacity : 1;
      const spec = buildImageSource(state.imageUrl, state.corners);
      const onLoad = () => applyImageSource(map, spec, opacity);
      if (map.isStyleLoaded()) {
        onLoad();
      } else {
        map.once('load', onLoad);
        return () => { map.off('load', onLoad); };
      }
    } else {
      if (map.isStyleLoaded()) removeImageSource(map);
    }
  }, [
    map,
    state.stage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    state.stage === 'adjusting' || state.stage === 'confirmed' ? state.imageUrl : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    state.stage === 'adjusting' || state.stage === 'confirmed' ? state.corners : null,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    state.stage === 'adjusting' ? state.opacity : null,
  ]);

  const upload = useCallback(
    async (file: File) => {
      dispatch({ type: 'startUpload' });
      await imageUpload.upload(file);
    },
    [imageUpload]
  );

  const placeCorner = useCallback((key: CornerKey, lngLat: LngLat) => {
    dispatch({ type: 'placeCorner', key, lngLat });
  }, []);

  const placeNextCorner = useCallback(
    (lngLat: LngLat) => {
      const next =
        state.stage === 'placing_corners' ? nextUnplacedCorner(state.corners) : null;
      if (next) dispatch({ type: 'placeCorner', key: next, lngLat });
    },
    [state]
  );

  const setOpacity = useCallback((opacity: number) => {
    dispatch({ type: 'setOpacity', opacity });
  }, []);

  const confirm = useCallback(() => {
    dispatch({ type: 'confirm' });
  }, []);

  const reset = useCallback(() => {
    imageUpload.reset();
    dispatch({ type: 'reset' });
  }, [imageUpload]);

  const calibrated =
    (state.stage === 'adjusting' || state.stage === 'confirmed') &&
    isCalibrated(state.corners);

  const nextCorner =
    state.stage === 'placing_corners' ? nextUnplacedCorner(state.corners) : null;

  return {
    state,
    uploadStatus: imageUpload.status,
    uploadError: imageUpload.error,
    upload,
    placeCorner,
    placeNextCorner,
    setOpacity,
    confirm,
    reset,
    isCalibrated: calibrated,
    nextCorner,
  };
}

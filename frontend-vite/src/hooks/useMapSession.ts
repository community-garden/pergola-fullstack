import { useCallback, useSyncExternalStore } from 'react';

/**
 * What the garden map remembers while the browser window is open: where the
 * map was looking, which base layer and which labels were chosen. It lives in
 * memory only (not in localStorage), so it survives moving between pages of
 * the app, but not a reload or a new window.
 */
export interface MapSession {
  /** [lng, lat] */
  center?: [number, number];
  zoom?: number;
  bearing?: number;
  pitch?: number;
  baseLayer?: 'satellite' | 'osm';
  /** value of `?labels=`: `names`, `off` or a season such as `2027` */
  labels?: string;
  /** value of `?icons=` (`emoji`; `images` is the default) */
  icons?: string;
  /** overlay IRI → shown or hidden, as chosen on the map */
  overlays?: Record<string, boolean>;
}

const EMPTY: MapSession = {};

// one session per garden; snapshots are replaced, never mutated, for useSyncExternalStore
const sessions = new Map<string, MapSession>();
const listeners = new Set<() => void>();

export const getMapSession = (gardenId: string | undefined): MapSession =>
  (gardenId && sessions.get(gardenId)) || EMPTY;

export const updateMapSession = (gardenId: string | undefined, patch: Partial<MapSession>) => {
  if (!gardenId) return;
  sessions.set(gardenId, { ...getMapSession(gardenId), ...patch });
  listeners.forEach((l) => l());
};

/** Test helper: forget everything. */
export const resetMapSessions = () => {
  sessions.clear();
  listeners.forEach((l) => l());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** The session of a garden, and a function to change parts of it. */
export const useMapSession = (gardenId: string | undefined) => {
  const session = useSyncExternalStore(subscribe, () => getMapSession(gardenId));
  const update = useCallback((patch: Partial<MapSession>) => updateMapSession(gardenId, patch), [gardenId]);
  return [session, update] as const;
};

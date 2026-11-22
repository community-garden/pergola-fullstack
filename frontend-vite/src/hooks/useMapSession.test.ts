import { beforeEach, describe, expect, it } from 'bun:test';
import { getMapSession, resetMapSessions, updateMapSession } from './useMapSession';

describe('map session', () => {
  beforeEach(resetMapSessions);

  it('is empty until something is remembered', () => {
    expect(getMapSession('Wurzelwerk')).toEqual({});
    expect(getMapSession(undefined)).toEqual({});
  });

  it('merges changes and keeps gardens apart', () => {
    updateMapSession('Wurzelwerk', { zoom: 19, labels: '2027' });
    updateMapSession('Wurzelwerk', { baseLayer: 'osm' });
    updateMapSession('Andere', { zoom: 12 });
    expect(getMapSession('Wurzelwerk')).toEqual({ zoom: 19, labels: '2027', baseLayer: 'osm' });
    expect(getMapSession('Andere')).toEqual({ zoom: 12 });
  });

  it('replaces the snapshot instead of mutating it', () => {
    updateMapSession('g', { zoom: 1 });
    const before = getMapSession('g');
    updateMapSession('g', { zoom: 2 });
    expect(before.zoom).toBe(1);
    expect(getMapSession('g')).not.toBe(before);
  });
});

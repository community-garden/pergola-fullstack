import { describe, expect, it } from 'bun:test';
import {
  currentShapes,
  geometryOn,
  isCurrent,
  isValidOn,
  removal,
  sameGeometry,
  shapeChange,
  toDay,
  versionBefore,
} from './shapeHistory';

describe('validity', () => {
  it('is a half-open interval of days', () => {
    const shape = { validFrom: '2026-03-01', validUntil: '2027-03-01' };
    expect(isValidOn(shape, '2026-02-28')).toBe(false);
    expect(isValidOn(shape, '2026-03-01')).toBe(true);
    expect(isValidOn(shape, '2027-02-28')).toBe(true);
    expect(isValidOn(shape, '2027-03-01')).toBe(false);
  });

  it('without dates a shape holds always', () => {
    expect(isValidOn({}, '1990-01-01')).toBe(true);
    expect(isCurrent({})).toBe(true);
  });

  it('a shape taken off today is no longer current', () => {
    expect(isCurrent({ validUntil: '2026-11-22' }, '2026-11-22')).toBe(false);
    expect(isCurrent({ validUntil: '2026-11-23' }, '2026-11-22')).toBe(true);
    expect(
      currentShapes([{ validUntil: '2026-11-22' }, {}, { validFrom: '2026-01-01' }], '2026-11-22'),
    ).toHaveLength(2);
  });

  it('formats days in local time', () => {
    expect(toDay(new Date(2027, 2, 5, 23, 30))).toBe('2027-03-05');
  });
});

describe('geometryOn', () => {
  const feature = {
    geo: 'NEW',
    validFrom: '2026-11-22',
    versions: [
      { geo: 'FIRST', validUntil: '2025-04-01' },
      { geo: 'SECOND', validFrom: '2025-04-01', validUntil: '2026-11-22' },
    ],
  };

  it('picks the shape that held on a day', () => {
    expect(geometryOn(feature, '2024-06-01')).toBe('FIRST');
    expect(geometryOn(feature, '2025-06-01')).toBe('SECOND');
    expect(geometryOn(feature, '2026-11-22')).toBe('NEW');
  });

  it('has nothing after the feature was taken off', () => {
    expect(geometryOn({ geo: 'X', validUntil: '2026-01-01' }, '2026-06-01')).toBeUndefined();
  });
});

describe('shapeChange', () => {
  const base = { setupMode: false, createdInSession: false, changeDay: '2026-11-22' };

  it('keeps the old shape of an established feature', () => {
    expect(shapeChange(base)).toBe('version');
    expect(shapeChange({ ...base, validFrom: '2025-04-01' })).toBe('version');
  });

  it('only corrects while the garden is being set up', () => {
    expect(shapeChange({ ...base, setupMode: true })).toBe('correction');
  });

  it('only corrects a shape drawn in the same session', () => {
    expect(shapeChange({ ...base, createdInSession: true })).toBe('correction');
  });

  it('only corrects a shape that began on the change day (no empty period)', () => {
    expect(shapeChange({ ...base, validFrom: '2026-11-22' })).toBe('correction');
  });
});

describe('versionBefore', () => {
  it('keeps the old outline up to the change day', () => {
    expect(versionBefore({ geo: 'OLD', validFrom: '2025-04-01' }, '2026-11-22')).toEqual({
      geo: 'OLD',
      validFrom: '2025-04-01',
      validUntil: '2026-11-22',
      name: '2025-04-01 – 2026-11-22',
    });
    expect(versionBefore({ geo: 'OLD' }, '2026-11-22')).toEqual({
      geo: 'OLD',
      validUntil: '2026-11-22',
      name: '… – 2026-11-22',
    });
  });
});

describe('removal', () => {
  it('deletes only what was drawn in this session', () => {
    expect(removal(true)).toBe('delete');
    expect(removal(false)).toBe('end');
  });
});

describe('sameGeometry', () => {
  it('ignores spacing', () => {
    expect(sameGeometry('POLYGON ((1 2,  3 4))', 'POLYGON ((1 2, 3 4)) ')).toBe(true);
    expect(sameGeometry('POINT (1 2)', 'POINT (1 3)')).toBe(false);
  });
});

import { describe, it, expect } from 'bun:test';
import { formatOverlayCorners, parseOverlayCorners, resolveOverlays } from './overlays';

const WKT = 'POLYGON ((13.1 51.2, 13.3 51.2, 13.3 51.1, 13.1 51.1, 13.1 51.2))';
const base = { '@id': 'o1', name: 'A', overlayImageUrl: '/media/overlays/a.webp', corners: WKT };

describe('parseOverlayCorners', () => {
  it('reads the four corners in order', () => {
    expect(parseOverlayCorners(WKT)).toEqual([
      [13.1, 51.2],
      [13.3, 51.2],
      [13.3, 51.1],
      [13.1, 51.1],
    ]);
  });
  it('rejects text that is not a polygon', () => {
    expect(parseOverlayCorners('POINT (1 2)')).toBeNull();
    expect(parseOverlayCorners('nonsense')).toBeNull();
    expect(parseOverlayCorners(undefined)).toBeNull();
  });
  it('round-trips through formatOverlayCorners', () => {
    const corners = parseOverlayCorners(WKT)!;
    expect(parseOverlayCorners(formatOverlayCorners(corners))).toEqual(corners);
  });
});

describe('resolveOverlays', () => {
  it('drops overlays without image, valid corners or IRI', () => {
    const out = resolveOverlays([
      base,
      { ...base, '@id': 'o2', overlayImageUrl: undefined },
      { ...base, '@id': 'o3', corners: 'POINT (1 2)' },
      { ...base, '@id': undefined },
    ] as never);
    expect(out.map((o) => o.id)).toEqual(['o1']);
  });
  it('orders by sortOrder, then name', () => {
    const out = resolveOverlays([
      { ...base, '@id': 'top', name: 'A', sortOrder: 2 },
      { ...base, '@id': 'b', name: 'B' },
      { ...base, '@id': 'a', name: 'A' },
    ] as never);
    expect(out.map((o) => o.id)).toEqual(['a', 'b', 'top']);
  });
  it('is visible by default and follows the stored flag, but the map choice wins', () => {
    expect(resolveOverlays([base] as never)[0].visible).toBe(true);
    expect(resolveOverlays([{ ...base, visible: false }] as never)[0].visible).toBe(false);
    expect(resolveOverlays([{ ...base, visible: false }] as never, { o1: true })[0].visible).toBe(true);
    expect(resolveOverlays([base] as never, { o1: false })[0].visible).toBe(false);
  });
  it('keeps opacity within 0..1 and has a default', () => {
    expect(resolveOverlays([{ ...base, opacity: 3 }] as never)[0].opacity).toBe(1);
    expect(resolveOverlays([base] as never)[0].opacity).toBeGreaterThan(0);
  });
});

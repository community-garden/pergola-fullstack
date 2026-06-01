import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import { CORNER_LABELS } from './types';
import type { CornerKey, LngLat } from './types';

interface CornerMarkerProps {
  map: maplibregl.Map | null;
  cornerKey: CornerKey;
  lngLat: LngLat | null;
  isNext: boolean;
  onPlace: (key: CornerKey, lngLat: LngLat) => void;
}

const COLOR_PLACED = '#eb8d17';
const COLOR_NEXT = '#009e7e';

export function CornerMarker({ map, cornerKey, lngLat, isNext, onPlace }: CornerMarkerProps) {
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!map || !lngLat) return;

    const el = document.createElement('div');
    el.style.cssText = [
      'width:32px',
      'height:32px',
      'border-radius:50%',
      `background-color:${isNext ? COLOR_NEXT : COLOR_PLACED}`,
      'border:2px solid white',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'cursor:grab',
      'box-shadow:0 2px 6px rgba(0,0,0,0.35)',
      'font-family:sans-serif',
      'font-size:10px',
      'font-weight:700',
      'color:white',
      'user-select:none',
      ...(isNext ? ['outline:3px solid rgba(0,158,126,0.45)', 'outline-offset:2px'] : []),
    ].join(';');
    el.textContent = CORNER_LABELS[cornerKey];

    const marker = new maplibregl.Marker({ element: el, draggable: true })
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(map);

    marker.on('dragend', () => {
      const { lng, lat } = marker.getLngLat();
      onPlace(cornerKey, { lng, lat });
    });

    markerRef.current = marker;
    return () => {
      marker.remove();
      markerRef.current = null;
    };
  }, [map, cornerKey, lngLat, isNext, onPlace]);

  return null;
}

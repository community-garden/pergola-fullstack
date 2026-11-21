import { useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import maplibregl from 'maplibre-gl';
import { PlantIcon } from '../../plants/PlantIcon';
import {
  labelDetailForZoom,
  MAX_PLANT_LINES,
  type LabelDetail,
  type MapIconMode,
  type MapLabel,
  type MapLabelMode,
} from './buildMapLabels';
import { captionHeight, IMAGE_GRID, imageGridFor, type ImageGrid } from './imageGrid';

/** Map zoom rounded to `step`; re-renders only when the rounded value changes. */
const useMapZoom = (map: maplibregl.Map | null, step = 0.25): number => {
  const quantize = (zoom: number) => Math.round(zoom / step) * step;
  const [zoom, setZoom] = useState(() => (map ? quantize(map.getZoom()) : 0));
  useEffect(() => {
    if (!map) return;
    const update = () => setZoom(quantize(map.getZoom()));
    update();
    map.on('zoom', update);
    return () => {
      map.off('zoom', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, step]);
  return zoom;
};

/** Detail level for the map's current zoom; re-renders only when the level changes. */
export const useMapLabelDetail = (map: maplibregl.Map | null): LabelDetail => {
  const [detail, setDetail] = useState<LabelDetail>(() =>
    map ? labelDetailForZoom(map.getZoom()) : 'hidden',
  );
  useEffect(() => {
    if (!map) return;
    const update = () => setDetail(labelDetailForZoom(map.getZoom()));
    update();
    map.on('zoom', update);
    return () => {
      map.off('zoom', update);
    };
  }, [map]);
  return detail;
};

const COLLISION_PADDING = 3;

/**
 * Hides labels that overlap a label of a bigger feature, like a symbol layer
 * would. Labels keep their layout while hidden, so they can be measured again.
 */
const resolveCollisions = (labels: MapLabel[], elements: Map<string, HTMLElement>) => {
  const placed: DOMRect[] = [];
  [...labels]
    .sort((a, b) => b.priority - a.priority)
    .forEach((label) => {
      const el = elements.get(label.key);
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const hit = placed.some(
        (p) =>
          r.left < p.right + COLLISION_PADDING &&
          r.right > p.left - COLLISION_PADDING &&
          r.top < p.bottom + COLLISION_PADDING &&
          r.bottom > p.top - COLLISION_PADDING,
      );
      el.style.visibility = hit ? 'hidden' : 'visible';
      if (!hit) placed.push(r);
    });
};

const pillSx = {
  bgcolor: 'rgba(255, 255, 255, 0.88)',
  color: '#1f2d24',
  borderRadius: 1,
  boxShadow: '0 1px 3px rgba(0,0,0,0.35)',
  px: 0.75,
  py: 0.25,
  textAlign: 'center',
  lineHeight: 1.25,
  fontWeight: 600,
  maxWidth: 150,
  overflowWrap: 'anywhere',
  userSelect: 'none',
} as const;

interface LabelContentProps {
  label: MapLabel;
  mode: MapLabelMode;
  detail: LabelDetail;
  iconMode: MapIconMode;
  zoom: number;
}

const titleSx = {
  fontSize: 10,
  fontWeight: 700,
  color: '#2e6b4f',
  textAlign: 'center',
} as const;

/** Plant images as a grid sized to the bed; names under the images when they are big enough. */
const ImageGridLabel = ({ label, grid }: { label: MapLabel; grid: ImageGrid }) => (
  <Box data-testid="map-label" sx={{ ...pillSx, px: 0.75, py: 0.5, maxWidth: 'none' }}>
    <Box sx={titleSx}>{label.title}</Box>
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${grid.columns}, ${grid.size}px)`,
        gap: `${IMAGE_GRID.gap}px`,
        justifyContent: 'center',
        mt: 0.25,
      }}
    >
      {label.lines.map((line) => (
        <Box key={line.text} sx={{ width: grid.size }}>
          <PlantIcon icon={line.icon} image={line.image} size={grid.size} shape="rounded" />
          {grid.captionLines > 0 && (
            <Box
              sx={{
                fontSize: 10,
                lineHeight: `${IMAGE_GRID.captionLineHeight}px`,
                height: captionHeight(grid.captionLines),
                pt: '2px',
                fontWeight: 500,
                textAlign: 'center',
                overflowWrap: 'anywhere',
                // at most captionLines lines, then an ellipsis
                display: '-webkit-box',
                WebkitLineClamp: grid.captionLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                color: line.muted ? '#4a5a50' : 'inherit',
                fontStyle: line.muted ? 'italic' : 'normal',
              }}
            >
              {line.text}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  </Box>
);

const LabelContent = ({ label, mode, detail, iconMode, zoom }: LabelContentProps) => {
  const images = iconMode === 'images';
  const { t } = useTranslation('garden');
  const fontSize = detail === 'detail' ? 12 : 11;

  if (mode.kind === 'names') {
    return (
      <Box data-testid="map-label" sx={{ ...pillSx, fontSize }}>
        {label.lines.map((line) => (
          <div key={line.text}>{line.text}</div>
        ))}
      </Box>
    );
  }

  // season mode
  if (detail === 'compact') {
    if (!label.lines.length) return null;
    const icons = label.lines.slice(0, 6);
    return (
      <Box
        data-testid="map-label"
        title={label.title}
        sx={{
          ...pillSx,
          display: 'flex',
          alignItems: 'center',
          gap: images ? '2px' : 0,
          px: images ? '3px' : 0.5,
          py: images ? '3px' : 0,
          whiteSpace: 'nowrap',
          maxWidth: 'none',
        }}
      >
        {icons.map((line) => (
          <PlantIcon key={line.text} icon={line.icon} image={line.image} preferImage={images} size={images ? 22 : 19} />
        ))}
        {label.lines.length > icons.length && (
          <Box component="span" sx={{ fontSize: 10, ml: 0.25 }}>
            +{label.lines.length - icons.length}
          </Box>
        )}
      </Box>
    );
  }

  // zoomed in far enough: images sized to the bed instead of the text list
  const grid = images ? imageGridFor(label.footprint, label.lines.length, zoom) : undefined;
  if (grid) return <ImageGridLabel label={label} grid={grid} />;

  const shown = label.lines.slice(0, MAX_PLANT_LINES);
  const hidden = label.lines.length - shown.length;
  return (
    <Box data-testid="map-label" sx={{ ...pillSx, fontSize, textAlign: 'left', maxWidth: 170 }}>
      <Box sx={{ ...titleSx, opacity: label.lines.length ? 1 : 0.75 }}>{label.title}</Box>
      {shown.map((line) => (
        <Box
          key={line.text}
          sx={{
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            // wishes: still readable, but visibly not confirmed yet
            color: line.muted ? '#4a5a50' : 'inherit',
            fontStyle: line.muted ? 'italic' : 'normal',
          }}
        >
          <PlantIcon icon={line.icon} image={line.image} preferImage={images} size={16} /> {line.text}
        </Box>
      ))}
      {hidden > 0 && (
        <Box sx={{ fontSize: 10, fontWeight: 500, opacity: 0.7 }}>{t('mapLabels.more', { count: hidden })}</Box>
      )}
    </Box>
  );
};

interface GeoFeatureLabelsProps {
  map: maplibregl.Map | null;
  labels: MapLabel[];
  mode: MapLabelMode;
  detail: LabelDetail;
  /** plant main images or emoji in season labels */
  iconMode: MapIconMode;
}

/**
 * Text labels on garden features, rendered as HTML markers (the raster style
 * has no glyphs, and HTML renders emoji). Clicks pass through to the feature.
 */
export const GeoFeatureLabels = ({ map, labels, mode, detail, iconMode }: GeoFeatureLabelsProps) => {
  const [elements, setElements] = useState<Map<string, HTMLElement>>(() => new Map());
  // image sizes follow the zoom continuously (in quarter steps), not only the detail level
  const zoom = useMapZoom(mode.kind === 'season' && detail === 'detail' ? map : null);
  const active = Boolean(map) && detail !== 'hidden' && mode.kind !== 'off';

  useEffect(() => {
    if (!map || !active) {
      setElements(new Map());
      return;
    }
    const els = new Map<string, HTMLElement>();
    const markers = labels.map((label) => {
      const el = document.createElement('div');
      el.style.pointerEvents = 'none';
      el.style.visibility = 'hidden'; // until collisions are resolved
      els.set(label.key, el);
      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(label.lngLat)
        .addTo(map);
      // a label is not a button: let screen readers read its text instead
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
      return marker;
    });
    setElements(els);
    return () => markers.forEach((marker) => marker.remove());
  }, [map, labels, active]);

  // Re-check overlaps after every render and whenever the map stops moving.
  useLayoutEffect(() => {
    if (!map || !elements.size) return;
    const run = () => resolveCollisions(labels, elements);
    const frame = requestAnimationFrame(run);
    map.on('moveend', run);
    return () => {
      cancelAnimationFrame(frame);
      map.off('moveend', run);
    };
  }, [map, labels, elements, detail, mode, iconMode, zoom]);

  if (!active) return null;
  return (
    <>
      {labels.map((label) => {
        const el = elements.get(label.key);
        return el
          ? createPortal(
              <LabelContent label={label} mode={mode} detail={detail} iconMode={iconMode} zoom={zoom} />,
              el,
              label.key,
            )
          : null;
      })}
    </>
  );
};

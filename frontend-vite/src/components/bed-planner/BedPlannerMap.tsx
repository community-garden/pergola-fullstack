import 'maplibre-gl/dist/maplibre-gl.css';

import LinearScaleIcon from '@mui/icons-material/LinearScale';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import { Box, Typography } from '@mui/material';
import maplibregl from 'maplibre-gl';
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { createPortal } from 'react-dom';
import { PlantIcon } from '../plants/PlantIcon';
import {
  cmToPx,
  fitZoomFor,
  viewGrid,
  viewRing,
  type ViewRect,
  type BedFrame,
  type LocalPoint,
} from './bedFrame';
import { minPoints, type BedShape, type ShapeKind } from './bedLayout';
import { ensureSprite, SPRITE_PX } from './plantSprites';

/** A placed plant as the map draws it. */
export interface PlacedPlantView extends LocalPoint {
  iri: string;
  plantingIri: string;
  name: string;
  icon?: string;
  image?: string;
  diameterCm: number;
  /** no spacing known: the diameter is a default */
  estimated: boolean;
  /** closer to another plant than their spacing */
  conflict: boolean;
}

/** A row or an area as the map draws it. */
export interface ShapeView {
  iri: string;
  plantingIri: string;
  /** tooltip and screen reader text, e.g. "Karotten · Reihe · 10 Pflanzen" */
  title: string;
  icon?: string;
  image?: string;
  shape: BedShape;
  /** where its plants stand (inside the bed) */
  plants: LocalPoint[];
  /** circle of each plant: the spacing in the row */
  diameterCm: number;
  /** indexes of plants closer to another placement than their spacing */
  conflicts: Set<number>;
  /** where the label sits: middle of the row, centre of the area */
  labelAt: LocalPoint;
}

/** A row or an area being drawn. */
export interface DrawingView {
  kind: ShapeKind;
  vertices: LocalPoint[];
  diameterCm: number;
  icon?: string;
  image?: string;
  /** the plants a shape would get (inside the bed), for the preview */
  layout: (shape: BedShape) => LocalPoint[];
}

export interface BedPlannerMapHandle {
  /** Bed coordinates of a screen point (e.g. where something was dropped), or undefined outside the map. */
  clientToLocal: (clientX: number, clientY: number) => LocalPoint | undefined;
}

interface BedPlannerMapProps {
  /** the box around the bed that is straight in the (turned) view; its `rotation` is the map's bearing */
  rect: ViewRect;
  geometry: GeoJSON.Geometry;
  frame: BedFrame;
  plants: PlacedPlantView[];
  shapes: ShapeView[];
  /** other features of the garden, drawn in grey */
  context?: GeoJSON.Geometry[];
  /** satellite image under the bed (blurry at these zoom levels) */
  satellite?: boolean;
  /** plants, rows and areas can be dragged (edit mode); default on */
  editable?: boolean;
  /** a plant is chosen for placing: clicks on the map place it (or draw its row/area) */
  armed: boolean;
  /** a row or an area is being drawn: clicks add points */
  drawing?: DrawingView;
  selectedIri?: string;
  highlightPlantingIri?: string;
  onSelect: (iri: string | undefined) => void;
  /** click on the map while armed (single plants) */
  onPlace: (at: LocalPoint) => void;
  /** click while drawing */
  onDrawPoint: (at: LocalPoint) => void;
  /** click on the last point (double click), or on the first point of an area */
  onDrawFinish: () => void;
  /** a plant was dragged; return false to reject (it jumps back) */
  onMove: (iri: string, to: LocalPoint) => boolean;
  /** a row or an area was dragged by `d` (cm); return false to reject */
  onMoveShape: (iri: string, d: LocalPoint) => boolean;
  handleRef?: Ref<BedPlannerMapHandle>;
}

/** Highest zoom: MapLibre renders GeoJSON precisely up to about 24; markers stay exact beyond. */
const MAX_ZOOM = 25;
const FIT_PADDING = 32;
const MIN_PLANT_PX = 18;
/** Plants of rows and areas may be smaller (dense sowing). */
const MIN_SHAPE_PLANT_PX = 8;
/** Clicking this close to the last point finishes a row; to the first point closes an area. */
const SNAP_PX = 10;

const SOIL = '#d9c7a7';
const SOIL_EDGE = '#6d4c41';
const PAPER = '#f4f1ea';
const GREEN = '#2e7d32';
const BLUE = '#1565c0';
const RED = '#d32f2f';

/** Layers one can click to select a row or an area. */
const SHAPE_LAYERS = ['shape-plant-ring', 'shape-line', 'shape-area-line', 'shape-area-fill'];

const emptyStyle = (): maplibregl.StyleSpecification => ({
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      maxzoom: 19,
      attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community',
    },
  },
  layers: [
    { id: 'paper', type: 'background', paint: { 'background-color': PAPER } },
    {
      id: 'satellite',
      type: 'raster',
      source: 'satellite',
      layout: { visibility: 'none' },
      paint: { 'raster-opacity': 0.55 },
    },
  ],
});

/** Zoom from which the 10 cm grid is at least 8 px apart. */
const minorGridZoom = (lat: number) => 22 + Math.log2(8 / cmToPx(10, lat, 22));

/**
 * A length in cm (feature property `d`) in screen pixels × `factor`, at least
 * `minPx` × `factor`: exact at every zoom (pixels double with each zoom level).
 */
const zoomScaled = (lat: number, factor: number, minPx: number): maplibregl.ExpressionSpecification => {
  const stops: unknown[] = [];
  for (let z = 14; z <= 26; z++) stops.push(z, ['max', minPx * factor, ['*', ['get', 'd'], cmToPx(1, lat, z) * factor]]);
  return ['interpolate', ['exponential', 2], ['zoom'], ...stops] as maplibregl.ExpressionSpecification;
};

const emptyCollection = (): GeoJSON.FeatureCollection => ({ type: 'FeatureCollection', features: [] });

/**
 * The map is still usable: after `remove()` (unmount, hot reload) effects and
 * drag handlers may still see the old instance, whose style is gone.
 */
const alive = (map: maplibregl.Map | null): map is maplibregl.Map => Boolean(map?.style);

const geoJsonSource = (map: maplibregl.Map, id: string) =>
  alive(map) ? (map.getSource(id) as maplibregl.GeoJSONSource | undefined) : undefined;

/**
 * The bed planner's map: a second MapLibre view locked to one bed. One can
 * zoom out only until the whole bed is visible, and not draw features. Single
 * plants are HTML markers whose size follows their spacing; rows and areas are
 * map layers with a draggable label.
 */
export const BedPlannerMap = ({
  geometry,
  frame,
  rect,
  plants,
  shapes,
  context,
  satellite = false,
  armed,
  editable = true,
  drawing,
  selectedIri,
  highlightPlantingIri,
  onSelect,
  onPlace,
  onDrawPoint,
  onDrawFinish,
  onMove,
  onMoveShape,
  handleRef,
}: BedPlannerMapProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const markersRef = useRef(new Map<string, { marker: maplibregl.Marker; el: HTMLDivElement }>());
  const [elements, setElements] = useState<Map<string, HTMLDivElement>>(() => new Map());
  const chipsRef = useRef(new Map<string, { marker: maplibregl.Marker; el: HTMLDivElement }>());
  const [chipElements, setChipElements] = useState<Map<string, HTMLDivElement>>(() => new Map());
  /** pointer position while drawing (rubber band) */
  const cursorRef = useRef<LocalPoint | undefined>(undefined);

  // latest props for the map's event handlers
  const live = useRef({
    editable,
    frame,
    plants,
    shapes,
    armed,
    drawing,
    selectedIri,
    highlightPlantingIri,
    onSelect,
    onPlace,
    onDrawPoint,
    onDrawFinish,
    onMove,
    onMoveShape,
  });
  live.current = {
    editable,
    frame,
    plants,
    shapes,
    armed,
    drawing,
    selectedIri,
    highlightPlantingIri,
    onSelect,
    onPlace,
    onDrawPoint,
    onDrawFinish,
    onMove,
    onMoveShape,
  };

  useImperativeHandle(
    handleRef,
    () => ({
      clientToLocal: (clientX, clientY) => {
        const container = containerRef.current;
        if (!map || !container) return undefined;
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        if (x < 0 || y < 0 || x > rect.width || y > rect.height) return undefined;
        const { lng, lat } = map.unproject([x, y]);
        return live.current.frame.toLocal([lng, lat]);
      },
    }),
    [map],
  );

  // ── map, locked to the bed ────────────────────────────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const center = frame.toLngLat(rect.at(rect.widthCm / 2, rect.heightCm / 2));
    const fit = () =>
      fitZoomFor(rect.widthCm, rect.heightCm, frame.lat, container.clientWidth, container.clientHeight, FIT_PADDING);
    const m = new maplibregl.Map({
      container,
      style: emptyStyle(),
      center,
      zoom: fit(),
      bearing: rect.rotation,
      maxZoom: MAX_ZOOM,
      dragRotate: false,
      pitchWithRotate: false,
      touchPitch: false,
      renderWorldCopies: false,
      attributionControl: { compact: true },
    });
    m.touchZoomRotate.disableRotation();
    m.keyboard.disableRotation();
    m.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    /** Fit the whole bed, then forbid zooming out further or panning away. */
    const lock = () => {
      m.setMaxBounds(null);
      m.setMinZoom(null);
      m.jumpTo({ center, zoom: fit(), bearing: rect.rotation });
      m.setMinZoom(m.getZoom());
      // for a turned map this is the box around the turned viewport
      m.setMaxBounds(m.getBounds());
      container.dataset.minZoom = m.getMinZoom().toFixed(2);
    };
    const onZoom = () => {
      const zoom = m.getZoom();
      container.style.setProperty('--px-per-cm', String(cmToPx(1, frame.lat, zoom)));
      container.dataset.zoom = zoom.toFixed(2);
    };
    m.on('zoom', onZoom);
    m.on('resize', lock);
    m.once('load', () => {
      lock();
      onZoom();
      setMap(m);
    });
    onZoom();
    return () => {
      setMap(null);
      m.remove();
    };
  }, [frame, rect]);

  // ── bed, frame, grid, context ─────────────────────────────────────────────
  useEffect(() => {
    if (!alive(map)) return;
    const bed: GeoJSON.Feature = { type: 'Feature', properties: {}, geometry };
    const box: GeoJSON.Feature = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'LineString', coordinates: viewRing(frame, rect) },
    };
    const ctx: GeoJSON.FeatureCollection = {
      type: 'FeatureCollection',
      features: (context ?? []).map((g) => ({ type: 'Feature', properties: {}, geometry: g })),
    };
    // below rows, areas and drawing, if those are there already
    const below = map.getLayer('shape-area-fill') ? 'shape-area-fill' : undefined;
    const add = (layer: maplibregl.LayerSpecification) => map.addLayer(layer, below);
    map.addSource('context', { type: 'geojson', data: ctx, maxzoom: 24 });
    map.addSource('bed', { type: 'geojson', data: bed, maxzoom: 24 });
    map.addSource('frame', { type: 'geojson', data: box, maxzoom: 24 });
    map.addSource('grid', { type: 'geojson', data: viewGrid(frame, rect, 10, 50), maxzoom: 24 });
    add({ id: 'context-fill', type: 'fill', source: 'context', paint: { 'fill-color': '#9e9e9e', 'fill-opacity': 0.25 } });
    add({ id: 'context-line', type: 'line', source: 'context', paint: { 'line-color': '#9e9e9e', 'line-width': 1 } });
    add({ id: 'bed-fill', type: 'fill', source: 'bed', paint: { 'fill-color': SOIL, 'fill-opacity': 0.85 } });
    add({
      id: 'grid-minor',
      type: 'line',
      source: 'grid',
      minzoom: minorGridZoom(frame.lat),
      filter: ['!', ['get', 'major']],
      paint: { 'line-color': 'rgba(60, 40, 20, 0.12)', 'line-width': 0.5 },
    });
    add({
      id: 'grid-major',
      type: 'line',
      source: 'grid',
      filter: ['get', 'major'],
      paint: { 'line-color': 'rgba(60, 40, 20, 0.28)', 'line-width': 1 },
    });
    add({ id: 'bed-line', type: 'line', source: 'bed', paint: { 'line-color': SOIL_EDGE, 'line-width': 2 } });
    add({
      id: 'frame-line',
      type: 'line',
      source: 'frame',
      paint: { 'line-color': SOIL_EDGE, 'line-width': 1, 'line-dasharray': [3, 3], 'line-opacity': 0.6 },
    });

    // corner labels: the origin and the size of the frame
    const corner = (text: string, lngLat: [number, number], anchor: maplibregl.PositionAnchor, testId: string) => {
      const el = document.createElement('div');
      el.textContent = text;
      el.dataset.testid = testId;
      Object.assign(el.style, {
        font: '11px/1.2 Roboto, sans-serif',
        color: SOIL_EDGE,
        padding: '2px 4px',
        pointerEvents: 'none',
        whiteSpace: 'nowrap',
      });
      const marker = new maplibregl.Marker({ element: el, anchor }).setLngLat(lngLat).addTo(map);
      // a label, not a button: screen readers read its text
      el.removeAttribute('role');
      el.removeAttribute('aria-label');
      return marker;
    };
    const corners = [
      // the origin of the stored coordinates only agrees with the view when it is not turned
      ...(rect.rotation === 0 ? [corner('0 / 0', frame.topLeft, 'bottom-left', 'bed-frame-origin')] : []),
      corner(
        `${Math.round(rect.widthCm)} × ${Math.round(rect.heightCm)} cm`,
        frame.toLngLat(rect.at(rect.widthCm, rect.heightCm)),
        'top-right',
        'bed-frame-size',
      ),
    ];
    return () => {
      corners.forEach((c) => c.remove());
      if (!map.getStyle()) return;
      ['frame-line', 'bed-line', 'grid-major', 'grid-minor', 'bed-fill', 'context-line', 'context-fill'].forEach(
        (id) => map.getLayer(id) && map.removeLayer(id),
      );
      ['grid', 'frame', 'bed', 'context'].forEach((id) => map.getSource(id) && map.removeSource(id));
    };
  }, [map, geometry, frame, rect, context]);

  // ── rows, areas and the one being drawn: layers ───────────────────────────
  useEffect(() => {
    if (!alive(map)) return;
    const ringRadius = zoomScaled(frame.lat, 0.5, MIN_SHAPE_PLANT_PX);
    const iconSize = zoomScaled(frame.lat, 0.72 / SPRITE_PX, MIN_SHAPE_PLANT_PX);
    const dim = (on: number, off: number): maplibregl.ExpressionSpecification => ['case', ['get', 'dim'], off, on];
    const stateColor: maplibregl.ExpressionSpecification = [
      'case',
      ['get', 'conflict'],
      RED,
      ['get', 'selected'],
      BLUE,
      GREEN,
    ];
    for (const id of ['shapes', 'shape-plants', 'draft']) {
      map.addSource(id, { type: 'geojson', data: emptyCollection(), maxzoom: 24 });
    }
    const layers: maplibregl.LayerSpecification[] = [
      {
        id: 'shape-area-fill',
        type: 'fill',
        source: 'shapes',
        filter: ['==', ['get', 'kind'], 'area'],
        paint: { 'fill-color': ['case', ['get', 'selected'], BLUE, GREEN], 'fill-opacity': dim(0.12, 0.04) },
      },
      {
        id: 'shape-area-line',
        type: 'line',
        source: 'shapes',
        filter: ['==', ['get', 'kind'], 'area'],
        paint: {
          'line-color': ['case', ['get', 'selected'], BLUE, GREEN],
          'line-width': ['case', ['get', 'selected'], 2.5, 1.5],
          'line-dasharray': [3, 2],
          'line-opacity': dim(0.9, 0.3),
        },
      },
      {
        id: 'shape-line',
        type: 'line',
        source: 'shapes',
        filter: ['==', ['get', 'kind'], 'line'],
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: {
          'line-color': ['case', ['get', 'selected'], BLUE, GREEN],
          'line-width': ['case', ['get', 'selected'], 3, 2],
          'line-opacity': dim(0.9, 0.3),
        },
      },
      {
        id: 'shape-plant-ring',
        type: 'circle',
        source: 'shape-plants',
        paint: {
          'circle-radius': ringRadius,
          'circle-color': ['case', ['get', 'conflict'], 'rgba(211, 47, 47, 0.15)', 'rgba(255, 255, 255, 0.35)'],
          'circle-stroke-color': stateColor,
          'circle-stroke-width': 1.5,
          'circle-opacity': dim(1, 0.35),
          'circle-stroke-opacity': dim(0.9, 0.3),
        },
      },
      {
        id: 'shape-plant-icon',
        type: 'symbol',
        source: 'shape-plants',
        layout: {
          'icon-image': ['get', 'sprite'],
          'icon-size': iconSize,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        },
        paint: { 'icon-opacity': dim(1, 0.35) },
      },
      {
        id: 'draft-fill',
        type: 'fill',
        source: 'draft',
        filter: ['==', ['geometry-type'], 'Polygon'],
        paint: { 'fill-color': BLUE, 'fill-opacity': 0.08 },
      },
      {
        id: 'draft-line',
        type: 'line',
        source: 'draft',
        filter: ['any', ['==', ['geometry-type'], 'LineString'], ['==', ['geometry-type'], 'Polygon']],
        paint: { 'line-color': BLUE, 'line-width': 2, 'line-dasharray': [2, 2] },
      },
      {
        id: 'draft-plant-ring',
        type: 'circle',
        source: 'draft',
        filter: ['==', ['get', 'role'], 'plant'],
        paint: {
          'circle-radius': ringRadius,
          'circle-color': 'rgba(255, 255, 255, 0.35)',
          'circle-stroke-color': BLUE,
          'circle-stroke-width': 1,
          'circle-opacity': 0.8,
        },
      },
      {
        id: 'draft-plant-icon',
        type: 'symbol',
        source: 'draft',
        filter: ['==', ['get', 'role'], 'plant'],
        layout: {
          'icon-image': ['get', 'sprite'],
          'icon-size': iconSize,
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        },
        paint: { 'icon-opacity': 0.75 },
      },
      {
        id: 'draft-vertex',
        type: 'circle',
        source: 'draft',
        filter: ['==', ['get', 'role'], 'vertex'],
        paint: {
          'circle-radius': ['case', ['get', 'closes'], 7, 4],
          'circle-color': '#ffffff',
          'circle-stroke-color': BLUE,
          'circle-stroke-width': 2,
        },
      },
    ];
    layers.forEach((layer) => map.addLayer(layer));
    return () => {
      if (!map.getStyle()) return;
      [...layers].reverse().forEach(({ id }) => map.getLayer(id) && map.removeLayer(id));
      ['draft', 'shape-plants', 'shapes'].forEach((id) => map.getSource(id) && map.removeSource(id));
    };
  }, [map, frame.lat]);

  /** Draws rows and areas; `moving` shifts one of them while its label is dragged. */
  const renderShapes = (m: maplibregl.Map, moving?: { iri: string; d: LocalPoint }) => {
    const { frame: f, shapes: all, selectedIri: sel, highlightPlantingIri: hl } = live.current;
    const shapesSource = geoJsonSource(m, 'shapes');
    const plantsSource = geoJsonSource(m, 'shape-plants');
    if (!shapesSource || !plantsSource) return;
    const outlines: GeoJSON.Feature[] = [];
    const points: GeoJSON.Feature[] = [];
    for (const s of all) {
      const d = moving?.iri === s.iri ? moving.d : { x: 0, y: 0 };
      const at = (p: LocalPoint) => f.toLngLat({ x: p.x + d.x, y: p.y + d.y });
      const state = { iri: s.iri, selected: s.iri === sel, dim: Boolean(hl) && s.plantingIri !== hl };
      const ring = s.shape.points.map(at);
      outlines.push({
        type: 'Feature',
        properties: { ...state, kind: s.shape.kind, conflict: s.conflicts.size > 0 },
        geometry:
          s.shape.kind === 'line' ? { type: 'LineString', coordinates: ring } : { type: 'Polygon', coordinates: [[...ring, ring[0]]] },
      });
      const sprite = ensureSprite(m, s.icon, s.image);
      s.plants.forEach((p, i) =>
        points.push({
          type: 'Feature',
          properties: { ...state, sprite, d: s.diameterCm, conflict: s.conflicts.has(i) },
          geometry: { type: 'Point', coordinates: at(p) },
        }),
      );
    }
    shapesSource.setData({ type: 'FeatureCollection', features: outlines });
    plantsSource.setData({ type: 'FeatureCollection', features: points });
  };

  /** Draws the row or area being drawn, up to the pointer, with the plants it would get. */
  const renderDraft = (m: maplibregl.Map) => {
    const source = geoJsonSource(m, 'draft');
    if (!source) return;
    const { frame: f, drawing: draft } = live.current;
    if (!draft) {
      source.setData(emptyCollection());
      return;
    }
    const cursor = cursorRef.current;
    const points = cursor ? [...draft.vertices, cursor] : draft.vertices;
    const features: GeoJSON.Feature[] = [];
    const coords = points.map((p) => f.toLngLat(p));
    if (draft.kind === 'area' && points.length >= 3) {
      features.push({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [[...coords, coords[0]]] } });
    } else if (points.length >= 2) {
      features.push({ type: 'Feature', properties: {}, geometry: { type: 'LineString', coordinates: coords } });
    }
    if (points.length >= minPoints(draft.kind)) {
      const sprite = ensureSprite(m, draft.icon, draft.image);
      for (const p of draft.layout({ kind: draft.kind, points })) {
        features.push({
          type: 'Feature',
          properties: { role: 'plant', sprite, d: draft.diameterCm },
          geometry: { type: 'Point', coordinates: f.toLngLat(p) },
        });
      }
    }
    const closable = draft.kind === 'area' && draft.vertices.length >= 3;
    draft.vertices.forEach((p, i) =>
      features.push({
        type: 'Feature',
        properties: { role: 'vertex', closes: closable && i === 0 },
        geometry: { type: 'Point', coordinates: f.toLngLat(p) },
      }),
    );
    source.setData({ type: 'FeatureCollection', features });
  };

  useEffect(() => {
    if (alive(map) && map.getSource('shapes')) renderShapes(map);
    // renderShapes reads the latest props from `live`
  }, [map, shapes, selectedIri, highlightPlantingIri, frame]);

  useEffect(() => {
    if (!drawing) cursorRef.current = undefined;
    if (alive(map) && map.getSource('draft')) renderDraft(map);
  }, [map, drawing]);

  useEffect(() => {
    if (alive(map) && map.getLayer('satellite')) {
      map.setLayoutProperty('satellite', 'visibility', satellite ? 'visible' : 'none');
    }
  }, [map, satellite]);

  // ── clicks: draw, place, select or deselect ──────────────────────────────
  useEffect(() => {
    if (!alive(map)) return;
    const onClick = (e: maplibregl.MapMouseEvent) => {
      if ((e.originalEvent.target as HTMLElement | null)?.closest('.maplibregl-marker')) return;
      const L = live.current;
      const at = L.frame.toLocal([e.lngLat.lng, e.lngLat.lat]);
      if (L.drawing) {
        const { vertices, kind } = L.drawing;
        const near = (p: LocalPoint) => {
          const s = map.project(L.frame.toLngLat(p));
          return Math.hypot(s.x - e.point.x, s.y - e.point.y) <= SNAP_PX;
        };
        const enough = vertices.length >= minPoints(kind);
        if (vertices.length > 0 && near(vertices[vertices.length - 1])) {
          // the second click of a double click, or a click on the last point
          if (enough) L.onDrawFinish();
          return;
        }
        if (kind === 'area' && enough && near(vertices[0])) {
          L.onDrawFinish();
          return;
        }
        L.onDrawPoint(at);
        return;
      }
      if (L.armed) {
        L.onPlace(at);
        return;
      }
      const { x, y } = e.point;
      const hit = map.queryRenderedFeatures(
        [
          [x - 4, y - 4],
          [x + 4, y + 4],
        ],
        { layers: SHAPE_LAYERS.filter((id) => map.getLayer(id)) },
      );
      L.onSelect(hit[0]?.properties?.iri as string | undefined);
    };
    const onMouseMove = (e: maplibregl.MapMouseEvent) => {
      const L = live.current;
      if (L.drawing) {
        cursorRef.current = L.frame.toLocal([e.lngLat.lng, e.lngLat.lat]);
        renderDraft(map);
        return;
      }
      if (L.armed) return;
      const { x, y } = e.point;
      const over = map.queryRenderedFeatures(
        [
          [x - 4, y - 4],
          [x + 4, y + 4],
        ],
        { layers: SHAPE_LAYERS.filter((id) => map.getLayer(id)) },
      );
      map.getCanvas().style.cursor = over.length ? 'pointer' : '';
    };
    const onMouseOut = () => {
      if (!live.current.drawing) return;
      cursorRef.current = undefined;
      renderDraft(map);
    };
    map.on('click', onClick);
    map.on('mousemove', onMouseMove);
    map.on('mouseout', onMouseOut);
    return () => {
      map.off('click', onClick);
      map.off('mousemove', onMouseMove);
      map.off('mouseout', onMouseOut);
    };
    // the handlers read the latest props from `live`
  }, [map]);

  useEffect(() => {
    if (!alive(map)) return;
    map.getCanvas().style.cursor = armed ? 'crosshair' : '';
    // while placing or drawing, a double click finishes a row instead of zooming
    if (armed) map.doubleClickZoom.disable();
    else map.doubleClickZoom.enable();
  }, [map, armed]);

  // ── one draggable marker per plant ───────────────────────────────────────
  useEffect(() => {
    if (!alive(map)) return;
    const markers = markersRef.current;
    const wanted = new Set(plants.map((p) => p.iri));
    let changed = false;
    for (const [iri, { marker }] of markers) {
      if (!wanted.has(iri)) {
        marker.remove();
        markers.delete(iri);
        changed = true;
      }
    }
    for (const plant of plants) {
      const lngLat = frame.toLngLat(plant);
      const existing = markers.get(plant.iri);
      if (existing) {
        existing.marker.setLngLat(lngLat);
        continue;
      }
      const el = document.createElement('div');
      el.dataset.testid = 'bed-plant';
      Object.assign(el.style, {
        width: `max(${MIN_PLANT_PX}px, calc(var(--d) * var(--px-per-cm) * 1px))`,
        height: `max(${MIN_PLANT_PX}px, calc(var(--d) * var(--px-per-cm) * 1px))`,
        cursor: live.current.editable ? 'grab' : 'pointer',
      });
      const marker = new maplibregl.Marker({ element: el, anchor: 'center', draggable: live.current.editable })
        .setLngLat(lngLat)
        .addTo(map);
      let dragged = false;
      marker.on('dragstart', () => {
        dragged = true;
        live.current.onSelect(plant.iri);
      });
      marker.on('dragend', () => {
        const { lng, lat } = marker.getLngLat();
        const current = live.current.plants.find((p) => p.iri === plant.iri);
        const ok = live.current.onMove(plant.iri, live.current.frame.toLocal([lng, lat]));
        if (!ok && current) marker.setLngLat(live.current.frame.toLngLat(current));
        setTimeout(() => (dragged = false), 0);
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!dragged) live.current.onSelect(plant.iri);
      });
      markers.set(plant.iri, { marker, el });
      changed = true;
    }
    if (changed) setElements(new Map([...markers].map(([iri, { el }]) => [iri, el])));
  }, [map, plants, frame]);

  // ── one draggable label per row or area: moves it as a whole ─────────────
  useEffect(() => {
    if (!alive(map)) return;
    const chips = chipsRef.current;
    const wanted = new Set(shapes.map((s) => s.iri));
    let changed = false;
    for (const [iri, { marker }] of chips) {
      if (!wanted.has(iri)) {
        marker.remove();
        chips.delete(iri);
        changed = true;
      }
    }
    for (const s of shapes) {
      const existing = chips.get(s.iri);
      if (existing) {
        existing.marker.setLngLat(frame.toLngLat(s.labelAt));
        continue;
      }
      const el = document.createElement('div');
      el.dataset.testid = 'bed-shape';
      el.style.cursor = live.current.editable ? 'grab' : 'pointer';
      const marker = new maplibregl.Marker({ element: el, anchor: 'center', draggable: live.current.editable })
        .setLngLat(frame.toLngLat(s.labelAt))
        .addTo(map);
      const shift = () => {
        const current = live.current.shapes.find((c) => c.iri === s.iri);
        if (!current) return undefined;
        const { lng, lat } = marker.getLngLat();
        const p = live.current.frame.toLocal([lng, lat]);
        return { current, d: { x: p.x - current.labelAt.x, y: p.y - current.labelAt.y } };
      };
      let dragged = false;
      marker.on('dragstart', () => {
        dragged = true;
        live.current.onSelect(s.iri);
      });
      marker.on('drag', () => {
        const moved = shift();
        if (moved) renderShapes(map, { iri: s.iri, d: moved.d });
      });
      marker.on('dragend', () => {
        const moved = shift();
        if (moved && !live.current.onMoveShape(s.iri, moved.d)) {
          marker.setLngLat(live.current.frame.toLngLat(moved.current.labelAt));
          renderShapes(map);
        }
        setTimeout(() => (dragged = false), 0);
      });
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!dragged) live.current.onSelect(s.iri);
      });
      chips.set(s.iri, { marker, el });
      changed = true;
    }
    if (changed) setChipElements(new Map([...chips].map(([iri, { el }]) => [iri, el])));
    // renderShapes reads the latest props from `live`
  }, [map, shapes, frame]);

  // read-only: markers can be selected but not dragged
  useEffect(() => {
    for (const ref of [markersRef, chipsRef]) {
      ref.current.forEach(({ marker, el }) => {
        marker.setDraggable(editable);
        el.style.cursor = editable ? 'grab' : 'pointer';
      });
    }
  }, [editable, elements, chipElements]);

  // markers belong to the map instance
  useEffect(
    () => () => {
      for (const ref of [markersRef, chipsRef]) {
        ref.current.forEach(({ marker }) => marker.remove());
        ref.current.clear();
      }
      setElements(new Map());
      setChipElements(new Map());
    },
    [map],
  );

  return (
    <Box
      ref={containerRef}
      data-testid="bed-planner-map"
      data-armed={armed}
      data-drawing={drawing ? drawing.kind : undefined}
      data-vertices={drawing ? drawing.vertices.length : undefined}
      sx={
        {
          position: 'absolute',
          inset: 0,
          '--px-per-cm': '1',
          // while placing, clicks go through the plants into the bed (e.g. radishes under a pumpkin)
          '&[data-armed="true"] [data-testid="bed-plant"], &[data-armed="true"] [data-testid="bed-shape"]': {
            pointerEvents: 'none',
          },
        } as object
      }
    >
      {plants.map((plant) => {
        const el = elements.get(plant.iri);
        if (!el) return null;
        el.style.setProperty('--d', String(plant.diameterCm));
        el.dataset.x = String(Math.round(plant.x));
        el.dataset.y = String(Math.round(plant.y));
        el.dataset.iri = plant.iri;
        el.dataset.planting = plant.plantingIri;
        el.dataset.conflict = String(plant.conflict);
        el.title = `${plant.name} · x ${Math.round(plant.x)} cm · y ${Math.round(plant.y)} cm`;
        el.setAttribute('aria-label', el.title);
        return createPortal(
          <PlantMarker
            plant={plant}
            selected={plant.iri === selectedIri}
            dimmed={Boolean(highlightPlantingIri) && plant.plantingIri !== highlightPlantingIri}
          />,
          el,
          plant.iri,
        );
      })}
      {shapes.map((s) => {
        const el = chipElements.get(s.iri);
        if (!el) return null;
        el.dataset.kind = s.shape.kind;
        el.dataset.count = String(s.plants.length);
        el.dataset.iri = s.iri;
        el.dataset.planting = s.plantingIri;
        el.dataset.conflict = String(s.conflicts.size > 0);
        el.dataset.x = String(Math.round(s.labelAt.x));
        el.dataset.y = String(Math.round(s.labelAt.y));
        el.title = s.title;
        el.setAttribute('aria-label', s.title);
        return createPortal(
          <ShapeLabel
            shape={s}
            selected={s.iri === selectedIri}
            dimmed={Boolean(highlightPlantingIri) && s.plantingIri !== highlightPlantingIri}
          />,
          el,
          s.iri,
        );
      })}
    </Box>
  );
};

/** Circle of the plant's spacing with its picture inside. */
const PlantMarker = ({ plant, selected, dimmed }: { plant: PlacedPlantView; selected: boolean; dimmed: boolean }) => {
  const ring = plant.conflict ? RED : selected ? BLUE : 'rgba(46, 125, 50, 0.9)';
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        border: `2px ${plant.estimated ? 'dotted' : 'dashed'} ${ring}`,
        boxShadow: selected ? '0 0 0 3px rgba(21, 101, 192, 0.35)' : undefined,
        bgcolor: plant.conflict ? 'rgba(211, 47, 47, 0.12)' : 'rgba(255, 255, 255, 0.35)',
        opacity: dimmed ? 0.35 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transition: 'opacity 120ms',
        containerType: 'size',
        '& > img': { width: '72% !important', height: '72% !important' },
        '& > span': { width: '72% !important', fontSize: '50cqmin !important', lineHeight: '72cqmin !important' },
      }}
    >
      <PlantIcon icon={plant.icon} image={plant.image} size={64} />
    </Box>
  );
};

/** Label of a row or an area: its plant and how many plants it has. Drag it to move the row. */
const ShapeLabel = ({ shape, selected, dimmed }: { shape: ShapeView; selected: boolean; dimmed: boolean }) => {
  const color = shape.conflicts.size > 0 ? RED : selected ? BLUE : GREEN;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        pl: 0.25,
        pr: 0.75,
        py: 0.25,
        borderRadius: 999,
        border: `2px solid ${color}`,
        bgcolor: 'rgba(255, 255, 255, 0.92)',
        boxShadow: selected ? '0 0 0 3px rgba(21, 101, 192, 0.35)' : '0 1px 3px rgba(0, 0, 0, 0.25)',
        opacity: dimmed ? 0.4 : 1,
        whiteSpace: 'nowrap',
        userSelect: 'none',
      }}
    >
      <PlantIcon icon={shape.icon} image={shape.image} size={20} />
      {shape.shape.kind === 'line' ? (
        <LinearScaleIcon sx={{ fontSize: 14, color }} />
      ) : (
        <PentagonOutlinedIcon sx={{ fontSize: 13, color }} />
      )}
      <Typography variant="caption" sx={{ fontWeight: 600, color, lineHeight: 1 }}>
        {shape.plants.length}
      </Typography>
    </Box>
  );
};

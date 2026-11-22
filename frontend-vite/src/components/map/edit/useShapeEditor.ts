import { useCallback, useEffect, useRef, useState } from 'react';
import type maplibregl from 'maplibre-gl';
import {
  TerraDraw,
  TerraDrawAngledRectangleMode,
  TerraDrawLineStringMode,
  TerraDrawPointMode,
  TerraDrawPolygonMode,
  TerraDrawSelectMode,
  type GeoJSONStoreFeatures,
  type GeoJSONStoreGeometries,
} from 'terra-draw';
import { TerraDrawMapLibreGLAdapter } from 'terra-draw-maplibre-gl-adapter';
import { geojsonToWKT, wktToGeoJSON } from '@terraformer/wkt';
import { isEditFinish, type DrawFinishContext } from './drawEvents';
import { sameGeometry } from './shapeHistory';

/** The tools of the edit bar; their values are TerraDraw mode names. */
export type ShapeTool = 'select' | 'polygon' | 'angled-rectangle' | 'point';

/** A shape on the map, as loaded from the store. */
export interface EditableShape {
  iri: string;
  geo: string;
}

/** A shape whose outline changed in the session (or that was drawn in it). */
export interface SessionChange {
  iri: string;
  /** outline at the start of the session (for a new shape: as first drawn) */
  before: string;
  after: string;
  created: boolean;
}

/** Writes of the editor; they run one after another. */
export interface ShapePersistence {
  /** a new shape was drawn; returns the IRI of its GeoFeature */
  create: (geo: string) => Promise<string>;
  /** the outline of a shape changed (saved at once, as it is) */
  update: (iri: string, geo: string) => Promise<void>;
  /** the shape is taken off the map */
  remove: (iri: string, kind: 'delete' | 'end') => Promise<void>;
  /** the session ends: decide what to keep of the old outlines */
  finish: (changes: SessionChange[]) => Promise<void>;
}

type UndoEntry =
  | { kind: 'edit'; drawId: string; before: GeoJSONStoreGeometries }
  | { kind: 'create'; drawId: string };

const ACCENT = '#ff8f00' as const;
const SHAPE = '#008888' as const;

// Only the corners of a shape move; the whole shape cannot be dragged by accident.
const SHAPE_FLAGS = {
  feature: {
    draggable: false,
    rotateable: false,
    scaleable: false,
    coordinates: { draggable: true, midpoints: true, deletable: true },
  },
};

const createDraw = (map: maplibregl.Map) =>
  new TerraDraw({
    adapter: new TerraDrawMapLibreGLAdapter({ map }),
    modes: [
      new TerraDrawSelectMode({
        flags: {
          polygon: SHAPE_FLAGS,
          'angled-rectangle': SHAPE_FLAGS,
          linestring: SHAPE_FLAGS,
          point: { feature: { draggable: true } },
        },
        // taking a shape off the map goes through the edit bar (it keeps the history)
        keyEvents: { deselect: 'Escape', delete: null, rotate: null, scale: null },
        styles: {
          selectedPolygonColor: ACCENT,
          selectedPolygonFillOpacity: 0.25,
          selectedPolygonOutlineColor: ACCENT,
          selectedPolygonOutlineWidth: 3,
          selectedLineStringColor: ACCENT,
          selectedPointColor: ACCENT,
          selectionPointColor: '#ffffff',
          selectionPointOutlineColor: ACCENT,
          selectionPointOutlineWidth: 2,
          selectionPointWidth: 6,
          midPointColor: '#ffffff',
          midPointOutlineColor: ACCENT,
          midPointWidth: 4,
        },
      }),
      new TerraDrawPolygonMode({
        styles: { fillColor: SHAPE, fillOpacity: 0.2, outlineColor: SHAPE, outlineWidth: 2 },
      }),
      new TerraDrawAngledRectangleMode({
        styles: { fillColor: SHAPE, fillOpacity: 0.2, outlineColor: SHAPE, outlineWidth: 2 },
      }),
      new TerraDrawPointMode({ styles: { pointColor: SHAPE, pointOutlineColor: '#ffffff' } }),
      new TerraDrawLineStringMode({ styles: { lineStringColor: SHAPE, lineStringWidth: 3 } }),
    ],
  });

const modeOf = (geometry: GeoJSON.Geometry): string | null => {
  if (geometry.type === 'Polygon') return 'polygon';
  if (geometry.type === 'Point') return 'point';
  if (geometry.type === 'LineString') return 'linestring';
  return null; // multi geometries cannot be edited here
};

/**
 * Editing the shapes of the garden map with TerraDraw.
 *
 * TerraDraw runs only while `active`; it is started with the shapes given then and
 * stopped again afterwards, so the view mode is truly read-only. Every edit is saved at
 * once (`persistence.update`); what becomes history is decided when the session ends
 * (`finish`), so undo stays simple and a session leaves at most one version per shape.
 */
export const useShapeEditor = ({
  map,
  active,
  shapes,
  persistence,
  onError,
}: {
  map: maplibregl.Map | null;
  active: boolean;
  shapes: EditableShape[];
  persistence: ShapePersistence;
  onError: (error: unknown) => void;
}) => {
  const [tool, setToolState] = useState<ShapeTool>('select');
  const [selectedIri, setSelectedIri] = useState<string | null>(null);
  const [undoDepth, setUndoDepth] = useState(0);
  const [changedCount, setChangedCount] = useState(0);
  const [newIris, setNewIris] = useState<ReadonlySet<string>>(new Set());

  const drawRef = useRef<TerraDraw | null>(null);
  const idToIri = useRef(new Map<string, string>());
  const startGeo = useRef(new Map<string, string>()); // iri → WKT at the start (or as first drawn)
  const lastGeometry = useRef(new Map<string, GeoJSONStoreGeometries>()); // drawId → last saved
  const created = useRef(new Set<string>());
  const undoStack = useRef<UndoEntry[]>([]);
  const queue = useRef<Promise<unknown>>(Promise.resolve());
  const finished = useRef(false);

  const persistenceRef = useRef(persistence);
  persistenceRef.current = persistence;
  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;
  const shapesRef = useRef(shapes);
  shapesRef.current = shapes;

  const enqueue = useCallback((write: () => Promise<void>) => {
    const next = queue.current.then(write).catch((error) => onErrorRef.current(error));
    queue.current = next;
    return next;
  }, []);

  const syncCounters = () => {
    setUndoDepth(undoStack.current.length);
    setChangedCount(startGeo.current.size === 0 ? 0 : collectChanges().length);
  };

  const geometryOf = (drawId: string) =>
    drawRef.current?.getSnapshotFeature(drawId)?.geometry as GeoJSONStoreGeometries | undefined;

  /** Shapes whose outline differs from the start of the session. */
  const collectChanges = (): SessionChange[] => {
    const changes: SessionChange[] = [];
    idToIri.current.forEach((iri, drawId) => {
      const before = startGeo.current.get(iri);
      const geometry = geometryOf(drawId);
      if (before === undefined || !geometry) return;
      const after = geojsonToWKT(geometry);
      const isNew = created.current.has(iri);
      if (isNew || !sameGeometry(before, after)) changes.push({ iri, before, after, created: isNew });
    });
    return changes;
  };

  // --- start and stop TerraDraw with the edit mode ---
  useEffect(() => {
    if (!active || !map) return;
    const draw = createDraw(map);
    drawRef.current = draw;
    finished.current = false;

    const onReady = () => {
      const features: GeoJSONStoreFeatures[] = [];
      shapesRef.current.forEach((shape) => {
        try {
          const geometry = wktToGeoJSON(shape.geo) as GeoJSON.Geometry;
          const mode = modeOf(geometry);
          if (!mode) return;
          const drawId = crypto.randomUUID();
          features.push({ type: 'Feature', id: drawId, geometry: geometry as never, properties: { mode } });
          idToIri.current.set(drawId, shape.iri);
          startGeo.current.set(shape.iri, shape.geo);
          lastGeometry.current.set(drawId, geometry as GeoJSONStoreGeometries);
        } catch (error) {
          console.error('Shape could not be loaded:', shape.iri, error);
        }
      });
      draw
        .addFeatures(features)
        .filter((result) => !result.valid)
        .forEach((result) => console.warn('Shape rejected by TerraDraw:', result));
      draw.setMode('select');
    };

    const onFinish = (id: string | number, context?: DrawFinishContext) => {
      const drawId = String(id);
      const geometry = geometryOf(drawId);
      if (!geometry) return;

      if (isEditFinish(context) || idToIri.current.has(drawId)) {
        const before = lastGeometry.current.get(drawId);
        if (before) undoStack.current.push({ kind: 'edit', drawId, before });
        lastGeometry.current.set(drawId, geometry);
        const wkt = geojsonToWKT(geometry);
        // the IRI is looked up when the write runs: a shape drawn just before is created by then
        void enqueue(async () => {
          const iri = idToIri.current.get(drawId);
          if (iri) await persistenceRef.current.update(iri, wkt);
        });
        syncCounters();
        return;
      }

      // a new shape
      const wkt = geojsonToWKT(geometry);
      lastGeometry.current.set(drawId, geometry);
      undoStack.current.push({ kind: 'create', drawId });
      void enqueue(async () => {
        const iri = await persistenceRef.current.create(wkt);
        idToIri.current.set(drawId, iri);
        created.current.add(iri);
        startGeo.current.set(iri, wkt);
        setNewIris(new Set(created.current));
        if (drawRef.current?.getMode() === 'select') setSelectedIri(iri);
        syncCounters();
      });
      // go on with the new shape selected, so its corners can be adjusted right away
      setTimeout(() => {
        if (drawRef.current !== draw) return;
        draw.setMode('select');
        setToolState('select');
        draw.selectFeature(drawId);
      }, 0);
      syncCounters();
    };

    const onSelect = (id: string | number) => setSelectedIri(idToIri.current.get(String(id)) ?? null);
    const onDeselect = () => setSelectedIri(null);

    draw.on('ready', onReady);
    draw.on('finish', onFinish);
    draw.on('select', onSelect);
    draw.on('deselect', onDeselect);
    draw.start();

    return () => {
      // left without "Done" (e.g. another page): still decide about the history
      if (!finished.current) {
        const changes = collectChanges();
        if (changes.length > 0) void enqueue(() => persistenceRef.current.finish(changes));
      }
      draw.off('ready', onReady);
      draw.off('finish', onFinish);
      draw.off('select', onSelect);
      draw.off('deselect', onDeselect);
      try {
        draw.stop();
      } catch (error) {
        console.warn('TerraDraw stop failed:', error);
      }
      drawRef.current = null;
      idToIri.current = new Map();
      startGeo.current = new Map();
      lastGeometry.current = new Map();
      created.current = new Set();
      undoStack.current = [];
      setNewIris(new Set());
      setSelectedIri(null);
      setToolState('select');
      setUndoDepth(0);
      setChangedCount(0);
    };
    // the shapes are read once per session (shapesRef); a refetch must not restart it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, map, enqueue]);

  const setTool = useCallback((next: ShapeTool) => {
    const draw = drawRef.current;
    if (!draw) return;
    draw.setMode(next);
    setToolState(next);
    if (next !== 'select') setSelectedIri(null);
  }, []);

  const drawIdOf = (iri: string) => [...idToIri.current].find(([, value]) => value === iri)?.[0];

  const undo = useCallback(() => {
    const draw = drawRef.current;
    const entry = undoStack.current.pop();
    if (!draw || !entry) return;
    if (entry.kind === 'edit') {
      draw.updateFeatureGeometry(entry.drawId, entry.before);
      lastGeometry.current.set(entry.drawId, entry.before);
      const wkt = geojsonToWKT(entry.before);
      void enqueue(async () => {
        const iri = idToIri.current.get(entry.drawId);
        if (iri) await persistenceRef.current.update(iri, wkt);
      });
    } else {
      if (draw.getSnapshotFeature(entry.drawId)?.properties?.selected) draw.deselectFeature(entry.drawId);
      draw.removeFeatures([entry.drawId]);
      void enqueue(async () => {
        const iri = idToIri.current.get(entry.drawId);
        if (!iri) return;
        idToIri.current.delete(entry.drawId);
        created.current.delete(iri);
        startGeo.current.delete(iri);
        setNewIris(new Set(created.current));
        await persistenceRef.current.remove(iri, 'delete');
      });
    }
    syncCounters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueue]);

  /** Takes the selected shape off the map. */
  const removeSelected = useCallback(
    (kind: 'delete' | 'end') => {
      const draw = drawRef.current;
      const iri = selectedIri;
      if (!draw || !iri) return;
      const drawId = drawIdOf(iri);
      if (!drawId) return;
      draw.deselectFeature(drawId);
      draw.removeFeatures([drawId]);
      idToIri.current.delete(drawId);
      startGeo.current.delete(iri);
      created.current.delete(iri);
      undoStack.current = undoStack.current.filter((entry) => entry.drawId !== drawId);
      setNewIris(new Set(created.current));
      setSelectedIri(null);
      void enqueue(() => persistenceRef.current.remove(iri, kind));
      syncCounters();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedIri, enqueue],
  );

  /** Ends the session: waits for all writes and decides about the history. */
  const finish = useCallback(async () => {
    const changes = collectChanges();
    finished.current = true;
    await enqueue(async () => {
      if (changes.length > 0) await persistenceRef.current.finish(changes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueue]);

  return {
    tool,
    setTool,
    selectedIri,
    /** shapes drawn in this session (they have no history yet) */
    newIris,
    canUndo: undoDepth > 0,
    undo,
    removeSelected,
    /** number of shapes changed or drawn in this session */
    changedCount,
    finish,
  };
};

import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import { useCurrentGarden } from '../hooks/useCurrentGarden';
import { getMapSession, updateMapSession as updateMapSessionFor, useMapSession } from '../hooks/useMapSession';
import maplibregl from 'maplibre-gl';
import { useSnackbar } from 'notistack';
import NiceModal from '@ebay/nice-modal-react';
import { useCurrentGardenInfo, useGeoFeatureLayer } from '@hooks/index';
import { parseWktPoint } from '../utils/wkt';
import { NewFeatureWizardNiceModal } from '@components/garden/NewFeatureWizardNiceModal';
import { GeoFeatureDetailsModal } from '@components/garden/GeoFeatureDetailsModal';
import { useSeasonData } from '@hooks/useSeasonData';
import { useGeoFeatureNames } from '@hooks/useGeoFeatureNames';
import { SEASON_QUERY_KEY } from '../api/season';
import {
  availableSeasons,
  buildMapLabels,
  featureAnchors,
  formatLabelMode,
  LABEL_MIN_ZOOM,
  parseIconMode,
  parseLabelMode,
  type MapIconMode,
  type MapLabelMode,
} from '@components/map/labels/buildMapLabels';
import { useMapOverlays } from '@components/map/overlays/useMapOverlays';
import { MapOverlayFab } from '@components/map/overlays/MapOverlayFab';
import { GeoFeatureLabels, useMapLabelDetail } from '@components/map/labels/GeoFeatureLabels';
import { MapLabelModeFab } from '@components/map/labels/MapLabelModeFab';
import { MapEditBar } from '@components/map/edit/MapEditBar';
import { useShapeEditor, type EditableShape } from '@components/map/edit/useShapeEditor';
import { useShapePersistence } from '@components/map/edit/useShapePersistence';
import { currentShapes, toDay } from '@components/map/edit/shapeHistory';
import 'maplibre-gl/dist/maplibre-gl.css';

/** Opening zoom: the garden fills the screen (was 17: the whole neighbourhood). */
const GARDEN_ZOOM = 18;
const EMPTY_VISIBILITY: Record<string, boolean> = {};
const NAMES_MODE: MapLabelMode = { kind: 'names' };

const GardenMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation('garden');
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('sm'));
  const queryClient = useQueryClient();

  const { garden, isLoading: gardenLoading, refetch: refetchGarden } = useCurrentGardenInfo();
  // view, base layer and labels are kept while the window is open (in memory, not localStorage)
  const { gardenId } = useCurrentGarden();
  const [session, updateSession] = useMapSession(gardenId);
  const gardenIdRef = useRef(gardenId);
  gardenIdRef.current = gardenId;
  const gardenIRI = garden?.['@id'];

  const mapCenter = useMemo<[number, number]>(() => {
    const gardenLocation = parseWktPoint(garden?.location);
    return gardenLocation || [13.737262, 51.050407]; // Default to Dresden
  }, [garden?.location]);

  // Track if map has loaded
  const [mapLoaded, setMapLoaded] = useState(false);

  // Handle feature click in view mode
  const handleFeatureClick = useCallback((feature: any) => {
    NiceModal.show(GeoFeatureDetailsModal, { feature });
  }, []);

  // --- Labels: bed names or the plantings of a season (mode in ?labels=) ---
  const [searchParams, setSearchParams] = useSearchParams();
  // the address wins (shared links), else what was chosen before in this window
  const labelMode = parseLabelMode(searchParams.get('labels') ?? session.labels ?? null);
  const setLabelMode = useCallback(
    (mode: MapLabelMode) => {
      updateSession({ labels: formatLabelMode(mode) });
      setSearchParams(
        (params) => {
          params.set('labels', formatLabelMode(mode));
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams, updateSession],
  );
  // plant symbols in season labels (?icons=emoji, default: main images)
  const iconMode = parseIconMode(searchParams.get('icons') ?? session.icons ?? null);
  const setIconMode = useCallback(
    (mode: MapIconMode) => {
      updateSession({ icons: mode });
      setSearchParams(
        (params) => {
          if (mode === 'emoji') params.set('icons', mode);
          else params.delete('icons');
          return params;
        },
        { replace: true },
      );
    },
    [setSearchParams, updateSession],
  );
  const { data: featureNames } = useGeoFeatureNames();
  const { data: seasonData } = useSeasonData();

  // Only the shapes that are still on the map; shapes taken off keep their history.
  const today = toDay();
  const geoFeatures = useMemo(
    () => currentShapes((garden?.geoFeatures ?? []) as any[], today),
    [garden?.geoFeatures, today],
  );
  const anchors = useMemo(() => featureAnchors(geoFeatures), [geoFeatures]);
  // while editing, the bed names tell which shape is which
  const shownLabelMode = isEditMode ? NAMES_MODE : labelMode;
  const labels = useMemo(
    () => buildMapLabels(shownLabelMode, anchors, featureNames, seasonData),
    // the label mode is rebuilt from the URL on every render, so depend on its value
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formatLabelMode(shownLabelMode), anchors, featureNames, seasonData],
  );
  const seasons = useMemo(() => availableSeasons(seasonData), [seasonData]);
  const labelMap = mapLoaded ? mapRef.current : null;
  const labelDetail = useMapLabelDetail(labelMap);

  // --- Overlays: images under the beds, switched on and off per garden ---
  const overlayVisibility = session.overlays ?? EMPTY_VISIBILITY;
  const overlays = useMapOverlays(labelMap, mapLoaded, garden?.mapOverlays, overlayVisibility);
  const toggleOverlay = useCallback(
    (id: string, visible: boolean) =>
      updateSession({ overlays: { ...(getMapSession(gardenIdRef.current).overlays ?? {}), [id]: visible } }),
    [updateSession],
  );

  // GeoFeatures have no name of their own; use the names of what sits on them.
  const viewFeatures = useMemo(
    () =>
      geoFeatures.map((feature: any) => ({
        ...feature,
        name: feature.name || featureNames.get(feature['@id'])?.join(' / '),
      })),
    [geoFeatures, featureNames],
  );

  // View mode: the shapes as a clickable layer (read-only)
  useGeoFeatureLayer({
    map: labelMap,
    features: viewFeatures,
    enabled: !isEditMode,
    onFeatureClick: handleFeatureClick,
  });

  // --- Edit mode: TerraDraw with our own bar, history of shapes ---
  const [changeDay, setChangeDay] = useState(today);
  const [setupMode, setSetupModeState] = useState(Boolean(garden?.setupMode));
  useEffect(() => setSetupModeState(Boolean(garden?.setupMode)), [garden?.setupMode]);
  const [busy, setBusy] = useState(false);

  const persistence = useShapePersistence({
    gardenIRI,
    setupMode,
    changeDay,
    onKept: (iris) => enqueueSnackbar(t('mapEdit.kept', { count: iris.length }), { variant: 'info' }),
  });
  const editableShapes = useMemo<EditableShape[]>(
    () =>
      geoFeatures
        .filter((feature: any) => feature?.['@id'] && feature.geo)
        .map((feature: any) => ({ iri: feature['@id'], geo: feature.geo })),
    [geoFeatures],
  );
  const editor = useShapeEditor({
    map: labelMap,
    active: isEditMode,
    shapes: editableShapes,
    persistence,
    onError: (error) => {
      console.error('Saving a shape failed:', error);
      enqueueSnackbar(t('mapEdit.saveError'), { variant: 'error' });
    },
  });

  const refreshMapData = useCallback(async () => {
    await Promise.all([
      refetchGarden(),
      queryClient.invalidateQueries({ queryKey: [...SEASON_QUERY_KEY, 'featureNames'] }),
    ]);
  }, [refetchGarden, queryClient]);

  const startEditing = useCallback(async () => {
    // edit what is stored now, not what was loaded when the page opened
    await refetchGarden();
    setChangeDay(toDay());
    setIsEditMode(true);
  }, [refetchGarden]);

  const finishEditing = useCallback(async () => {
    setBusy(true);
    try {
      await editor.finish();
    } finally {
      setIsEditMode(false);
      await refreshMapData();
      setBusy(false);
    }
  }, [editor, refreshMapData]);

  const changeSetupMode = useCallback(
    async (value: boolean) => {
      setSetupModeState(value);
      try {
        await persistence.setSetupMode(value);
        await refetchGarden();
      } catch (error) {
        console.error('Saving the setup mode failed:', error);
        setSetupModeState(!value);
        enqueueSnackbar(t('mapEdit.saveError'), { variant: 'error' });
      }
    },
    [persistence, refetchGarden, enqueueSnackbar, t],
  );

  const selectedName =
    editor.selectedIri === null ? null : (featureNames.get(editor.selectedIri)?.join(' / ') ?? '');
  const describeSelected = useCallback(async () => {
    if (!editor.selectedIri) return;
    await NiceModal.show(NewFeatureWizardNiceModal, { geoFeatureIRI: editor.selectedIri });
  }, [editor.selectedIri]);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    // wait for the garden, so the map opens on it at once instead of flying over from a default
    if (gardenLoading && !getMapSession(gardenIdRef.current).center) return;

    const remembered = getMapSession(gardenIdRef.current);
    // Create map with satellite as default
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: {
        version: 8,
        sources: {
          'satellite': {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            ],
            tileSize: 256,
            maxzoom: 20,
            attribution: '© Esri, Maxar, Earthstar Geographics, and the GIS User Community',
          },
          'osm': {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap Contributors',
          },
        },
        layers: [
          {
            id: 'satellite',
            type: 'raster',
            source: 'satellite',
            layout: {
              visibility: remembered.baseLayer === 'osm' ? 'none' : 'visible',
            },
          },
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            layout: {
              visibility: remembered.baseLayer === 'osm' ? 'visible' : 'none',
            },
          },
        ],
      },
      center: remembered.center ?? mapCenter,
      zoom: remembered.zoom ?? GARDEN_ZOOM,
      bearing: remembered.bearing ?? 0,
      pitch: remembered.pitch ?? 0,
      maxPitch: 85,
    });

    mapRef.current = map;

    // remember where the map looks (only changes made by the user, not the first fly-in)
    map.on('moveend', (e) => {
      // the initial camera and the fly-in to the garden have no originalEvent; they must not
      // count as "the user looked around", or the fly-in would be skipped
      if (!e.originalEvent && !getMapSession(gardenIdRef.current).center) return;
      const c = map.getCenter();
      updateMapSessionFor(gardenIdRef.current, {
        center: [c.lng, c.lat],
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch(),
      });
    });

    // Mark map as loaded when it's ready
    map.once('load', () => {
      setMapLoaded(true);
    });

    // Add zoom and rotation controls
    map.addControl(new maplibregl.NavigationControl(), 'top-right');

    // Create custom layer switcher control
    class LayerSwitcherControl implements maplibregl.IControl {
      private _container?: HTMLDivElement;

      onAdd(map: maplibregl.Map): HTMLElement {
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        this._container.style.marginTop = '10px';

        // Satellite button
        const satelliteBtn = document.createElement('button');
        satelliteBtn.className = 'maplibregl-ctrl-icon';
        satelliteBtn.type = 'button';
        satelliteBtn.title = 'Satellite';
        satelliteBtn.innerHTML = '🛰️';
        satelliteBtn.style.fontSize = '16px';
        satelliteBtn.style.width = '29px';
        satelliteBtn.style.height = '29px';
        satelliteBtn.onclick = () => {
          map.setLayoutProperty('satellite', 'visibility', 'visible');
          map.setLayoutProperty('osm', 'visibility', 'none');
          updateMapSessionFor(gardenIdRef.current, { baseLayer: 'satellite' });
        };

        // OSM button
        const osmBtn = document.createElement('button');
        osmBtn.className = 'maplibregl-ctrl-icon';
        osmBtn.type = 'button';
        osmBtn.title = 'OpenStreetMap';
        osmBtn.innerHTML = '🗺️';
        osmBtn.style.fontSize = '16px';
        osmBtn.style.width = '29px';
        osmBtn.style.height = '29px';
        osmBtn.onclick = () => {
          map.setLayoutProperty('satellite', 'visibility', 'none');
          map.setLayoutProperty('osm', 'visibility', 'visible');
          updateMapSessionFor(gardenIdRef.current, { baseLayer: 'osm' });
        };

        this._container.appendChild(satelliteBtn);
        this._container.appendChild(osmBtn);

        return this._container;
      }

      onRemove(): void {
        this._container?.parentNode?.removeChild(this._container);
      }
    }

    // Add layer switcher below navigation control
    map.addControl(new LayerSwitcherControl(), 'top-right');

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapLoaded(false);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gardenLoading]);

  return (
    <Box
      sx={{
        width: '100%',
        height: 'calc(100vh - 64px)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        margin: '0',
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <div
          ref={mapContainer}
          data-testid="garden-map"
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        />
      </Box>

      <GeoFeatureLabels
        map={labelMap}
        labels={labels}
        mode={shownLabelMode}
        detail={labelDetail}
        iconMode={iconMode}
      />

      {isEditMode ? (
        <MapEditBar
          tool={editor.tool}
          onToolChange={editor.setTool}
          selectedName={selectedName}
          onDescribe={describeSelected}
          canUndo={editor.canUndo}
          onUndo={editor.undo}
          removeDeletes={Boolean(editor.selectedIri && editor.newIris.has(editor.selectedIri) && !selectedName)}
          onRemove={() =>
            editor.removeSelected(
              editor.selectedIri && editor.newIris.has(editor.selectedIri) && !selectedName ? 'delete' : 'end',
            )
          }
          setupMode={setupMode}
          onSetupModeChange={changeSetupMode}
          changeDay={changeDay}
          today={today}
          onChangeDayChange={setChangeDay}
          onDone={finishEditing}
          busy={busy}
        />
      ) : (
        <>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            startIcon={compact ? undefined : <EditOutlinedIcon />}
            onClick={startEditing}
            disabled={!mapLoaded}
            data-testid="map-edit-open"
            aria-label={t('mapEdit.editTitle')}
            title={t('mapEdit.editTitle')}
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              zIndex: 2,
              minWidth: compact ? 36 : undefined,
              bgcolor: 'background.paper',
              textTransform: 'none',
            }}
          >
            {compact ? <EditOutlinedIcon fontSize="small" /> : t('mapEdit.edit')}
          </Button>
          <MapOverlayFab overlays={overlays} onToggle={toggleOverlay} />
          <MapLabelModeFab
            mode={labelMode}
            seasons={seasons}
            onChange={setLabelMode}
            iconMode={iconMode}
            onIconModeChange={setIconMode}
            showZoomHint={labelMode.kind !== 'off' && labelMap !== null && labelDetail === 'hidden'}
            onZoomHintClick={() => labelMap?.easeTo({ zoom: LABEL_MIN_ZOOM + 0.5, duration: 800 })}
          />
        </>
      )}
    </Box>
  );
};

export default GardenMap;

import { Box } from '@mui/material';
import { useEffect, useRef, useState, useMemo } from 'react';
import maplibregl from 'maplibre-gl';
import { MaplibreTerradrawControl } from '@watergis/maplibre-gl-terradraw';
import type { GeoJSONStoreFeatures } from 'terra-draw';
import { useSnackbar } from 'notistack';
import NiceModal from '@ebay/nice-modal-react';
import { 
  useCurrentGardenInfo, 
  useCreateEntity, 
  useUpdateEntity, 
  useDeleteEntity,
  useGeoFeatureLayer 
} from '@hooks/index';
import { parseWktPoint } from '../utils/wkt';
import { NewFeatureWizardNiceModal } from '@components/garden/NewFeatureWizardNiceModal';
import { GeoFeatureDetailsModal } from '@components/garden/GeoFeatureDetailsModal';
import { useDataStore, useAdbContext } from '@graviola/edb-state-hooks';
import { geojsonToWKT, wktToGeoJSON } from '@terraformer/wkt';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css';

const GardenMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const drawControlRef = useRef<MaplibreTerradrawControl | null>(null);
  const [features, setFeatures] = useState<GeoJSONStoreFeatures[]>([]);
  const [currentLayer, setCurrentLayer] = useState<'osm' | 'satellite'>('satellite');
  const [isEditMode, setIsEditMode] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  
  const { garden, isLoading, refetch: refetchGarden } = useCurrentGardenInfo();
  const { ready: dataStoreReady } = useDataStore();
  const { createEntityIRI } = useAdbContext();
  const gardenIRI = garden?.['@id'];
  const geoFeatureTypeIRI = 'https://ontology.semantic-desk.top/garden#GeoFeature';
  const gardenTypeIRI = 'https://ontology.semantic-desk.top/garden#Garden';
  
  // Map TerraDraw feature IDs to GeoFeature IRIs
  const featureIdToIRIMapRef = useRef<Record<string | number, string>>({});

  // Use our clean CRUD hooks
  const { mutateAsync: createGeoFeature } = useCreateEntity({ typeIRI: geoFeatureTypeIRI });
  const { mutateAsync: updateGeoFeature } = useUpdateEntity({ typeIRI: geoFeatureTypeIRI });
  const { mutateAsync: deleteGeoFeature } = useDeleteEntity({ typeIRI: geoFeatureTypeIRI });
  const { mutateAsync: updateGarden } = useUpdateEntity({ typeIRI: gardenTypeIRI });
  
  const mapCenter = useMemo<[number, number]>(() => {
    const gardenLocation = parseWktPoint(garden?.location);
    return gardenLocation || [13.737262, 51.050407]; // Default to Dresden
  }, [garden?.location]);

  // Track if we've already loaded features into TerraDraw
  const featuresLoadedRef = useRef(false);
  // Track if map has loaded
  const [mapLoaded, setMapLoaded] = useState(false);

  // Handle feature click in view mode
  const handleFeatureClick = (feature: any) => {
    NiceModal.show(GeoFeatureDetailsModal, { feature });
  };

  console.log('garden', garden);

  // Use the GeoFeatureLayer hook for view mode
  useGeoFeatureLayer({
    map: mapRef.current,
    features: garden?.geoFeatures || [],
    enabled: !isEditMode,
    onFeatureClick: handleFeatureClick,
  });

  // Load existing GeoFeatures from the garden and add them to TerraDraw
  useEffect(() => {
    // Skip if already loaded or conditions not met
    if (featuresLoadedRef.current || !mapLoaded || !drawControlRef.current || !dataStoreReady || !garden) {
      return;
    }

    const loadGeoFeatures = async () => {
      const terraDrawInstance = drawControlRef.current?.getTerraDrawInstance();
      if (!terraDrawInstance) {
        return; // TerraDraw not ready yet
      }

      try {
        // Get GeoFeatures from the garden relationship
        const geoFeatures = garden.geoFeatures;
        
        if (!geoFeatures || geoFeatures.length === 0) {
          console.log('No GeoFeatures found in garden');
          featuresLoadedRef.current = true;
          return;
        }

        // Convert GeoFeatures to TerraDraw features and add them to the map
        const loadedFeatures: GeoJSONStoreFeatures[] = [];

        for (const geoFeature of geoFeatures) {
          if (geoFeature.geo) {
            try {
              // Convert WKT to GeoJSON
              const geojsonGeometry = wktToGeoJSON(geoFeature.geo);
              
              // Determine mode based on geometry type
              let mode = 'polygon';
              if (geojsonGeometry.type === 'Point') mode = 'point';
              else if (geojsonGeometry.type === 'LineString') mode = 'linestring';
              else if (geojsonGeometry.type === 'Polygon') mode = 'polygon';
              else if (geojsonGeometry.type.includes('Rectangle')) mode = 'rectangle';
              
              // Generate a simple UUID for the feature (TerraDraw needs clean IDs)
              const featureId = crypto.randomUUID();
              
              // Create a TerraDraw-compatible feature
              // IMPORTANT: properties should ONLY contain 'mode' - nothing else!
              const feature: GeoJSONStoreFeatures = {
                type: 'Feature',
                geometry: geojsonGeometry as any,
                properties: {
                  mode: mode, // Only mode, no extra properties!
                },
                id: featureId,
              };

              loadedFeatures.push(feature);
              
              // Store the bidirectional mapping
              featureIdToIRIMapRef.current[featureId] = geoFeature['@id'];
            } catch (error) {
              console.error('Failed to load GeoFeature:', geoFeature['@id'], error);
            }
          }
        }

        if (loadedFeatures.length > 0) {
          // Add features to TerraDraw
          terraDrawInstance.addFeatures(loadedFeatures);
          setFeatures((prev: GeoJSONStoreFeatures[]) => [...prev, ...loadedFeatures]);
          console.log(`Loaded ${loadedFeatures.length} GeoFeatures from garden onto the map`);
        }
        
        featuresLoadedRef.current = true;
      } catch (error) {
        console.error('Failed to load GeoFeatures from garden:', error);
        featuresLoadedRef.current = true;
      }
    };

    // Small delay to ensure TerraDraw is fully initialized
    const timeoutId = setTimeout(loadGeoFeatures, 300);
    
    return () => clearTimeout(timeoutId);
  }, [mapLoaded, dataStoreReady, garden]);



  useEffect(() => {
    if (!mapContainer.current || mapRef.current || isLoading) return;

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
              visibility: 'visible',
            },
          },
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
            layout: {
              visibility: 'none',
            },
          },
        ],
      },
      center: mapCenter,
      zoom: 17,
      maxPitch: 85,
    });

    mapRef.current = map;

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
          setCurrentLayer('satellite');
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
          setCurrentLayer('osm');
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

    // Create edit mode toggle control
    class EditModeControl implements maplibregl.IControl {
      private _container?: HTMLDivElement;

      onAdd(map: maplibregl.Map): HTMLElement {
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        this._container.style.marginTop = '10px';

        // View mode button
        const viewBtn = document.createElement('button');
        viewBtn.className = 'maplibregl-ctrl-icon';
        viewBtn.type = 'button';
        viewBtn.title = 'View Mode (Read Only)';
        viewBtn.innerHTML = '👁️';
        viewBtn.style.fontSize = '16px';
        viewBtn.style.width = '29px';
        viewBtn.style.height = '29px';
        viewBtn.onclick = () => {
          setIsEditMode(false);
          viewBtn.style.backgroundColor = '#088';
          editBtn.style.backgroundColor = '';
        };

        // Edit mode button
        const editBtn = document.createElement('button');
        editBtn.className = 'maplibregl-ctrl-icon';
        editBtn.type = 'button';
        editBtn.title = 'Edit Mode';
        editBtn.innerHTML = '✏️';
        editBtn.style.fontSize = '16px';
        editBtn.style.width = '29px';
        editBtn.style.height = '29px';
        editBtn.onclick = () => {
          setIsEditMode(true);
          editBtn.style.backgroundColor = '#088';
          viewBtn.style.backgroundColor = '';
        };

        // Set initial state (view mode)
        viewBtn.style.backgroundColor = '#088';

        this._container.appendChild(viewBtn);
        this._container.appendChild(editBtn);

        return this._container;
      }

      onRemove(): void {
        this._container?.parentNode?.removeChild(this._container);
      }
    }

    // Add edit mode toggle below layer switcher
    map.addControl(new EditModeControl(), 'top-right');

    // Create TerraDraw control with clean mode list
    const drawControl = new MaplibreTerradrawControl({
      modes: [
        'render',
        'point',
        'polygon',
        'rectangle',
        'freehand',
        'angled-rectangle',
        'select',
        'delete-selection',
      ],
      open: true,
    });

    // Add control to map
    map.addControl(drawControl, 'top-left');
    drawControlRef.current = drawControl;

    // Listen to TerraDraw events
    const terraDrawInstance = drawControl.getTerraDrawInstance();
    if (terraDrawInstance) {
      // When a shape is finished
      terraDrawInstance.on('finish', async (id: string | number) => {
        const allFeatures = drawControl.getFeatures().features;
        setFeatures(allFeatures);
        
        // Find the newly created feature
        const newFeature = allFeatures.find(f => f.id === id);
        
        if (newFeature && newFeature.geometry && dataStoreReady) {
          try {
            // Create a new GeoFeature entity
            const geoFeatureIRI = createEntityIRI('GeoFeature');
            const now = new Date().toISOString();
            
            // Convert GeoJSON geometry to WKT for storage
            const wktGeometry = geojsonToWKT(newFeature.geometry);
            
            const geoFeatureData = {
              geo: wktGeometry,
              creationTime: now,
              modificationTime: now,
            };
            
            // Create GeoFeature using our clean hook
            await createGeoFeature({
              entityIRI: geoFeatureIRI,
              data: geoFeatureData,
            });
            
            // Add GeoFeature to the garden's geoFeatures array
            if (gardenIRI && garden) {
              const existingGeoFeatures = garden.geoFeatures || [];
              const updatedGarden = {
                ...garden,
                geoFeatures: [
                  ...existingGeoFeatures,
                  { '@id': geoFeatureIRI }
                ],
              };
              
              // Update garden using our clean hook
              await updateGarden({
                entityIRI: gardenIRI,
                data: updatedGarden,
              });
              await refetchGarden();
            }
            
            // Store the mapping
            featureIdToIRIMapRef.current[id] = geoFeatureIRI;
            
            console.log('GeoFeature saved and added to garden:', geoFeatureIRI);
            
            // Show snackbar asking if user wants to specify the feature
            enqueueSnackbar('', {
              variant: 'newFeature' as const,
              preventDuplicate: true,
              onSpecifyFeature: () => {
                NiceModal.show(NewFeatureWizardNiceModal, { geoFeatureIRI });
              },
            });
          } catch (error) {
            console.error('Failed to save GeoFeature:', error);
            enqueueSnackbar('Failed to save feature', { variant: 'error' });
          }
        }
      });

      // When features are deleted or modified
      terraDrawInstance.on('change', async (ids: (string | number)[], type: string) => {
        if (type === 'delete') {
          const allFeatures = drawControl.getFeatures().features;
          setFeatures(allFeatures);
          
          // Delete the corresponding GeoFeatures
          if (dataStoreReady) {
            for (const id of ids) {
              const geoFeatureIRI = featureIdToIRIMapRef.current[id];
              if (geoFeatureIRI) {
                try {
                  // Remove from garden's geoFeatures array first
                  if (gardenIRI && garden) {
                    const existingGeoFeatures = garden.geoFeatures || [];
                    const updatedGeoFeatures = existingGeoFeatures.filter(
                      (gf: any) => gf['@id'] !== geoFeatureIRI
                    );
                    const updatedGarden = {
                      ...garden,
                      geoFeatures: updatedGeoFeatures,
                    };
                    
                    // Update garden using our clean hook
                    await updateGarden({
                      entityIRI: gardenIRI,
                      data: updatedGarden,
                    });
                    await refetchGarden();
                  }
                  
                  // Delete GeoFeature using our clean hook
                  await deleteGeoFeature(geoFeatureIRI);
                  
                  delete featureIdToIRIMapRef.current[id];
                  console.log('GeoFeature deleted from garden:', geoFeatureIRI);
                } catch (error) {
                  console.error('Failed to delete GeoFeature:', error);
                }
              }
            }
          }
        } else if (type === 'update' || type === 'styling') {
          // Update the geometry when a feature is modified
          const allFeatures = drawControl.getFeatures().features;
          setFeatures(allFeatures);
          
          if (dataStoreReady) {
            for (const id of ids) {
              const geoFeatureIRI = featureIdToIRIMapRef.current[id];
              const updatedFeature = allFeatures.find(f => f.id === id);
              
              if (geoFeatureIRI && updatedFeature && updatedFeature.geometry) {
                try {
                  // Convert GeoJSON geometry to WKT
                  const wktGeometry = geojsonToWKT(updatedFeature.geometry);
                  
                  // Update with new geometry and modification time
                  const updatedData = {
                    geo: wktGeometry,
                    modificationTime: new Date().toISOString(),
                  };
                  
                  // Update using our clean hook
                  await updateGeoFeature({
                    entityIRI: geoFeatureIRI,
                    data: updatedData,
                  });
                  
                  console.log('GeoFeature updated:', geoFeatureIRI);
                } catch (error) {
                  console.error('Failed to update GeoFeature:', error);
                }
              }
            }
          }
        }
      });

      // When a feature is selected
      terraDrawInstance.on('select', (id: string | number) => {
        console.log('Feature selected:', id);
        const geoFeatureIRI = featureIdToIRIMapRef.current[id];
        if (geoFeatureIRI) {
          console.log('Mapped to GeoFeature:', geoFeatureIRI);
        }
      });
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setMapLoaded(false);
      }
    };
  }, [mapCenter, isLoading]);

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
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        />
      </Box>
      
      {/* Debug: Show feature count, current layer, and mode */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: 1,
          boxShadow: 1,
          fontSize: '0.875rem',
        }}
      >
        Layer: {currentLayer === 'satellite' ? '🛰️ Satellite' : '🗺️ OSM'} | 
        Mode: {isEditMode ? '✏️ Edit' : '👁️ View'} | 
        Features: {garden?.geoFeatures?.length || 0}
      </Box>
    </Box>
  );
};

export default GardenMap;

import "@watergis/maplibre-gl-terradraw/dist/maplibre-gl-terradraw.css";

import { Box, Button, Toolbar } from "@mui/material";
import { MaplibreTerradrawControl } from "@watergis/maplibre-gl-terradraw";
import maplibregl from "maplibre-gl";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { GeoJSONStoreFeatures } from "terra-draw";

import { MapLibreComponent } from "./MapLibreComponent";

interface TerradrawMapComponentProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  features?: GeoJSONStoreFeatures[];
  editFeatures?: GeoJSONStoreFeatures[];
  onFeaturesCreated?: (features: GeoJSONStoreFeatures[]) => void;
  onFeatureSelected?: (id: string | number) => void;
  onFeatureDeleted?: (
    ids: (string | number)[],
    type: string,
  ) => void;
  showToolbar?: boolean;
  useSatelliteTiles?: boolean;
}

export const TerradrawMapComponent: React.FC<TerradrawMapComponentProps> = ({
  initialCenter,
  initialZoom = 12,
  features,
  editFeatures,
  onFeaturesCreated,
  onFeatureSelected,
  onFeatureDeleted,
  showToolbar = true,
  useSatelliteTiles = true,
}) => {
  const [draw, setDraw] = useState<MaplibreTerradrawControl | null>(null);
  const initializedRef = useRef<boolean>(false);

  const handleMapCreated = useCallback(
    (_map: maplibregl.Map) => {
      // Wait for map to load, then initialize TerraDraw (following vanilla JS example)
      _map.once("load", () => {
        if (!initializedRef.current) {
          const terraDraw = new MaplibreTerradrawControl({
            modes: [
              "render",
              "point",
              "polygon",
              "rectangle",
              "freehand",
              "angled-rectangle",
              "select",
              "delete-selection",
              "delete",
              "download",
            ],
            open: true,
          });
          
          _map.addControl(terraDraw, "top-left");
          terraDraw.activate();
          
          // Get TerraDraw instance after map load (as per example)
          const drawInstance = terraDraw.getTerraDrawInstance();
          
          if (drawInstance) {
            // Set up event handlers
            drawInstance.on("finish", (_id: string | number) => {
              const allFeatures = terraDraw.getFeatures().features;
              onFeaturesCreated?.(allFeatures);
            });
            
            drawInstance.on("select", (id: string | number) => {
              onFeatureSelected?.(id);
            });
            
            drawInstance.on("change", (ids: (string | number)[], type: string) => {
              if (type === "delete") {
                onFeatureDeleted?.(ids, type);
              }
            });
          }
          
          setDraw(terraDraw);
          initializedRef.current = true;
        }
      });
    },
    [onFeaturesCreated, onFeatureSelected, onFeatureDeleted],
  );

  // Load initial features into TerraDraw (if provided)
  useEffect(() => {
    if (draw && features && features.length > 0) {
      const drawInstance = draw.getTerraDrawInstance();
      if (drawInstance) {
        drawInstance.addFeatures(features);
      }
    }
  }, [draw, features]);

  // Handle edit features
  useEffect(() => {
    if (draw && editFeatures && editFeatures.length > 0) {
      const drawInstance = draw.getTerraDrawInstance();
      if (drawInstance) {
        if (!drawInstance.enabled) {
          drawInstance.start();
        }
        drawInstance.clear();
        drawInstance.start();
        editFeatures.forEach((feature) => {
          drawInstance.addFeatures([feature]);
        });
      }
    }
  }, [draw, editFeatures]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (draw) {
        // Remove the control from the map
        draw.deactivate();
      }
    };
  }, [draw]);

  const handleCancel = () => {};

  const handleAccept = useCallback(() => {
    if (draw) {
      const allFeatures = draw.getFeatures().features;
      onFeaturesCreated?.(allFeatures);
      draw.getTerraDrawInstance().clear();
      draw.getTerraDrawInstance().start();
    }
  }, [draw, onFeaturesCreated]);

  return (
    <>
      {showToolbar && (
        <Box sx={{ marginBottom: 1 }}>
          <Toolbar
            variant="dense"
            sx={{
              justifyContent: "flex-end",
              gap: 1,
              backgroundColor: "#f5f5f5",
              borderRadius: 1,
            }}
          >
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleAccept}
            >
              Accept
            </Button>
          </Toolbar>
        </Box>
      )}
      <MapLibreComponent
        initialCenter={initialCenter}
        initialZoom={initialZoom}
        onMapCreated={handleMapCreated}
        useSatelliteTiles={useSatelliteTiles}
      />
    </>
  );
};


import "maplibre-gl/dist/maplibre-gl.css";

import { Box } from "@mui/material";
import maplibregl from "maplibre-gl";
import React, { useEffect, useRef, useState } from "react";

interface MapLibreComponentProps {
  initialCenter?: [number, number];
  initialZoom?: number;
  onPointPicked?: (point: [number, number]) => void;
  selectedPoint?: [number, number];
  onMapCreated?: (map: maplibregl.Map) => void;
  useSatelliteTiles?: boolean;
}

export const MapLibreComponent: React.FC<MapLibreComponentProps> = ({
  initialCenter,
  initialZoom,
  onPointPicked,
  selectedPoint,
  onMapCreated,
  useSatelliteTiles = true,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const marker = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (map) return;

    const style: maplibregl.StyleSpecification = {
      version: 8,
      sources: {
        satellite: {
          type: "raster",
          tiles: [
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
          ],
          tileSize: 256,
          attribution:
            "&copy; <a href='http://www.esri.com/'>Esri</a> i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxzoom: 19,
        },
        osm: {
          type: "raster",
          tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "&copy; OpenStreetMap Contributors",
          maxzoom: 19,
        },
      },
      layers: [
        {
          id: useSatelliteTiles ? "satellite" : "osm",
          type: "raster",
          source: useSatelliteTiles ? "satellite" : "osm",
        },
      ],
    };

    const newMap = new maplibregl.Map({
      container: mapContainer.current!,
      style: style,
      center: initialCenter || [13.404954, 52.520008], // Default to Berlin
      zoom: initialZoom || 12,
    });

    newMap.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add click handler for point picking
    if (onPointPicked) {
      newMap.on("click", (e) => {
        const coordinates: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        onPointPicked(coordinates);
        updateMarker(coordinates);
      });
    }

    // Add initial marker if selectedPoint is provided
    if (selectedPoint) {
      updateMarker(selectedPoint);
    }

    // Call the onMapCreated callback if provided
    if (onMapCreated) {
      onMapCreated(newMap);
    }

    setMap(newMap);
  }, [initialCenter, initialZoom, onPointPicked, onMapCreated, useSatelliteTiles]);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map]);

  // Update marker when selectedPoint changes
  useEffect(() => {
    if (selectedPoint && map) {
      updateMarker(selectedPoint);
    }
  }, [selectedPoint, map]);

  const updateMarker = (coordinates: [number, number]) => {
    if (!map) return;

    if (marker.current) {
      marker.current.remove();
    }
    marker.current = new maplibregl.Marker({ color: "#FF0000" })
      .setLngLat(coordinates)
      .addTo(map);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        ref={mapContainer}
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </Box>
  );
};


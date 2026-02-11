"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = icon;

interface MapClickHandlerProps {
  onLocationSelect: (lat: number, lon: number) => void;
}

function MapClickHandler({ onLocationSelect }: MapClickHandlerProps) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

interface MapCenterHandlerProps {
  center: LatLngExpression;
}

function MapCenterHandler({ center }: MapCenterHandlerProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      duration: 1.5,
    });
  }, [center, map]);

  return null;
}

interface WeatherMapProps {
  center: LatLngExpression;
  selectedLocation: { lat: number; lon: number } | null;
  onLocationSelect: (lat: number, lon: number) => void;
  mapCenter?: LatLngExpression;
}

export default function WeatherMap({
  center,
  selectedLocation,
  onLocationSelect,
  mapCenter,
}: WeatherMapProps) {
  return (
    <div className="h-full w-full rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={mapCenter || center}
        zoom={10}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={onLocationSelect} />
        <MapCenterHandler center={mapCenter || center} />
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lon]} />
        )}
      </MapContainer>
    </div>
  );
}

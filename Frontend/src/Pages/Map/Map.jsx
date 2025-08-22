import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker shadow
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Default blue icon
const defaultIcon = new L.Icon.Default();

// Red icon for inactive devices
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Map = () => {
  const [devices, setDevices] = useState([]);
  const center = [12.9716, 77.5946];

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/devices");
        const data = await res.json();
        setDevices(data);
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; https://www.openstreetmap.org/ contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {devices.map((device) => (
          <Marker
            key={device._id}
            position={[device.latitude, device.longitude]}
            icon={
              device.status?.toLowerCase() === "inactive"
                ? redIcon
                : defaultIcon
            }
          >
            <Popup>
              <strong>{device.componentName}</strong>
              <br />
              Type: {device.type}
              <br />
              IP: {device.ip}
              <br />
              MAC: {device.mac}
              <br />
              Status: {device.status}
              <br />
              Category: {device.category}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;

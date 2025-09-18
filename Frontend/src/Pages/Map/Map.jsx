import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
 
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import Cookies from "js-cookie";

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
 
const defaultIcon = new L.Icon.Default();
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
 
// Zoom to selected device
const ZoomToDevice = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 16); // Zoom level
    }
  }, [position, map]);
  return null;
};
 
const Map = () => {
  const mapRef = useRef();
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [expandedDeviceId, setExpandedDeviceId] = useState(null);
  const [error, setError] = useState("");
  const token = Cookies.get("accessToken");
  
 
  useEffect(() => {
    const fetchDevices = async () => {
      setError("");
      try {
        const res = await fetch("http://localhost:5000/api/devices", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch devices");
        const data = await res.json();
 
        // Normalize status to lowercase
        const normalized = data.map((d) => ({
          ...d,
          status: d.status?.toLowerCase(),
        }));
 
        setDevices(normalized);
        setFilteredDevices(normalized);
      } catch (err) {
        console.error(err);
        setError("Error fetching devices.",err);
      }
    };
    fetchDevices();
  }, []);

  const center = [12.9716, 77.5946]; //Bengaluru
  const filterDevices = (status) => {
    if (status === "all") {
      setFilteredDevices(devices);
    } else {
      setFilteredDevices(
        devices.filter((d) => d.status === status.toLowerCase())
      );
    }
    setExpandedDeviceId(null);
    setSelectedDevice(null);
    
    if (mapRef.current) {
      mapRef.current.setView(center, 12);
    }

  };
 
  const toggleExpand = (deviceId) => {
    setExpandedDeviceId((prev) => (prev === deviceId ? null : deviceId));
    const device = devices.find((d) => d._id === deviceId);
    if (device) setSelectedDevice(device);
  };
 
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <div className="w-1/3 p-4 overflow-y-hidden bg-gray-100 border-r">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Scanned Devices</h2>
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded"
            onClick={() => filterDevices("up")}
          >
            Active
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => filterDevices("down")}
          >
            Inactive
          </button>
          <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => filterDevices("all")}
          >
            All
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {filteredDevices.map((device) => (
          <div key={device._id} className="mb-2">
            <div
              className="p-2 bg-white rounded shadow cursor-pointer hover:bg-blue-50"
              onClick={() => toggleExpand(device._id)}
            >
              <strong>{device.componentName}</strong> ({device.status})
              <br />
              {device.ip} | {device.type}
            </div>
            {expandedDeviceId === device._id && (
              <div className="ml-4 mt-2 space-y-2 text-sm text-gray-800">
                <p><strong>Component Name:</strong> {device.componentName || "N/A"}</p>
                <p><strong>Type:</strong> {device.type}</p>
                <p><strong>IP Address:</strong> {device.ip}</p>
                <p><strong>MAC Address:</strong> {device.mac}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={device.status === "up" ? "text-green-600" : "text-red-600"}>
                    {device.status}
                  </span>
                </p>
                <p><strong>Category:</strong> {device.category}</p>
                <p><strong>Serial Number:</strong> {device.serialNumber || "N/A"}</p>
                <p><strong>Location:</strong> {device.location || "N/A"}</p>
                <p><strong>Latitude:</strong> {device.latitude || "N/A"}</p>
                <p><strong>Longitude:</strong> {device.longitude || "N/A"}</p>
              </div>
            )}
          </div>
        ))}
      </div>
 
      {/* Map */}
      <div className="w-2/3 h-full">
        <MapContainer center={center} zoom={12} scrollWheelZoom className="h-full w-full" ref={mapRef}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {selectedDevice && (
            <ZoomToDevice position={[selectedDevice.latitude, selectedDevice.longitude]} />
          )}
          {filteredDevices.map((device) => (
            <Marker
              key={device._id}
              position={[device.latitude, device.longitude]}
              icon={device.status === "down" ? redIcon : defaultIcon}
              eventHandlers={{
                click: () => setSelectedDevice(device),
              }}
            >
              <Popup>
                IP: {device.ip}<br />
                Type: {device.type}<br />
                Category: {device.category}<br />
                Location: {device.location}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
 
export default Map;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteDevice = () => {
  const [devices, setDevices] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  // Fetch devices from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error("Error fetching devices:", err));
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const response = await fetch(`http://localhost:5000/api/devices/${selectedId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setToast("🗑️ Device deleted successfully!");
        setDevices(devices.filter((d) => d._id !== selectedId));
        setTimeout(() => {
          setToast(null);
          navigate("/inventory");
        }, 2000);
      } else {
        setToast("❌ Failed to delete device.");
      }
    } catch (error) {
      console.error("Error deleting device:", error);
      setToast("❌ Server error.");
    }
  };

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          {toast}
        </div>
      )}
      <div className="p-6 mt-20 max-w-lg mx-auto bg-white rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Delete Device</h1>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="">-- Select a device --</option>
          {devices.map((device) => (
            <option key={device._id} value={device._id}>
              {device.componentName}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleDelete}
          disabled={!selectedId}
          className={`w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg shadow-red-500/50 ${
            !selectedId ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Delete Device
        </button>
      </div>
    </>
  );
};

export default DeleteDevice;

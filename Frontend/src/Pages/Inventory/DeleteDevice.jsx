import React, { useState } from "react";
import devicesData from "../../data/dummyData";
import { useNavigate } from "react-router-dom";

const DeleteDevice = () => {
  const [devices, setDevices] = useState(devicesData);
  const [selectedId, setSelectedId] = useState("");
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleDelete = () => {
    if (!selectedId) return;
    const updatedList = devices.filter((d) => d.id !== parseInt(selectedId));
    setDevices(updatedList);

    setToast("🗑️ Device deleted successfully!");
    setTimeout(() => {
      setToast(null);
      navigate("/inventory");
    }, 2000);
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
            <option key={device.id} value={device.id}>
              {device.devicename}
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
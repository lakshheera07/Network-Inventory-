import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDevice = () => {
  const [scannedDevices, setScannedDevices] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [toast, setToast] = useState(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [failedDevices, setFailedDevices] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleScan = async () => {
    setScanning(true);
    setScannedDevices([]);
    setHasScanned(true);
    try {
      const res = await fetch("http://localhost:5000/api/devices/scan");
      const data = await res.json();
      setScannedDevices(data);
    } catch (err) {
      setToast("❌ Scan failed.");
    }
    setScanning(false);
  };

  const handleAddDevice = async (device) => {
    const payload = {
      componentName: device.hostname || "Unnamed",
      ip: device.ip || "",
      manufacturer: device.description || "Unknown", 
      location: device.location || "Unknown",
      type: device.physicalType || "Unknown",
      category: device.interfaceType || "Unknown",
      status: device.operStatus || "Unknown",
      serialNumber: device.objectID || "",
    };

    try {
      const res = await fetch("http://localhost:5000/api/devices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setToast(`✅ Added ${payload.componentName}`);
      } else {
        const errorMessages = data.errors
          ? Object.values(data.errors).join(", ")
          : data.error || "Unknown error";
        setToast(`❌ Failed to add ${payload.componentName}: ${errorMessages}`);
      }
    } catch (err) {
      setToast("❌ Server error while adding device.");
    }
  };

  const handleAddAll = async () => {
    let successCount = 0;
    const failed = [];

    for (const device of scannedDevices) {
      const payload = {
        componentName: device.hostname || "Unnamed",
        ip: device.ip || "",
        manufacturer: device.description || "Unknown", 
        location: device.location || "Unknown",
        type: device.physicalType || "Unknown",
        category: device.interfaceType || "Unknown",
        status: device.operStatus || "Unknown",
        serialNumber: device.objectID || "",
        };
      
      try {
        const res = await fetch("http://localhost:5000/api/devices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok) {
          successCount++;
        } else {
          failed.push({
            name: payload.componentName,
            errors: data.errors || { general: data.error || "Unknown error" },
          });
        }
      } catch (err) {
        failed.push({
          name: payload.componentName,
          errors: { general: "Server error" },
        });
      }
    }

    setToast(`✅ ${successCount} added, ❌ ${failed.length} failed`);
    setFailedDevices(failed);
    if (failed.length > 0) setShowErrorModal(true);

    setTimeout(() => {
      setToast(null);
      navigate("/home/inventory");
    }, 3000);
  };

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex justify-center items-start pt-16 pb-16">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Add Devices</h2>
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={handleScan}
          disabled={scanning}
        >
          {scanning ? "Scanning..." : "Scan Devices"}
        </button>

        {hasScanned && scannedDevices.length === 0 && !scanning && (
          <p className="text-center text-gray-500 mt-4">No devices found.</p>
        )}

        {scannedDevices.length > 0 && (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Discovered Devices:</h3>
            <ul className="divide-y">
              {scannedDevices.map((d, idx) => (
                <li
                  key={d.ip + idx}
                  className="py-2 flex flex-col cursor-pointer"
                  onClick={() => toggleExpand(idx)}
                >
                  <div className="flex justify-between items-center">
                    <span>
                      <b>{d.hostname || "Unknown"}</b>
                    </span>
                    <button
                      className="ml-4 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddDevice(d);
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {expandedIndex === idx && (
                    <div className="mt-2 text-sm text-gray-700 pl-2 space-y-1">
                      <p><b>IP:</b> {d.ip}</p>
                      <p><b>Serial Number:</b> {d.objectID || "Unknown"}</p>
                      <p><b>Type:</b> {d.physicalType || "Unknown"}</p>
                      <p><b>Category:</b> {d.interfaceType || "Unknown"}</p>
                      <p><b>Status:</b> {d.operStatus || "Unknown"}</p>
                      <p><b>Manufacturer:</b> {d.description || "Unknown"}</p>
                      <p><b>Location:</b> {d.location || "Unknown"}</p>
                      <p><b>Uptime:</b> {d.uptime || "N/A"}</p>
                    </div>
                  )}

                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
              onClick={handleAddAll}
            >
              Add All Devices
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          {toast}
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">Failed to Add Devices</h3>
            <ul className="max-h-64 overflow-y-auto divide-y">
              {failedDevices.map((fd, idx) => (
                <li key={idx} className="py-2">
                  <p><b>{fd.name}</b></p>
                  <ul className="list-disc ml-5 text-sm text-red-600">
                    {Object.entries(fd.errors).map(([field, msg], i) => (
                      <li key={i}>{field}: {msg}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => setShowErrorModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDevice;

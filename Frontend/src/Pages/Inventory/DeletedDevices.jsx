import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";

export default function DeletedDevices() {
  const [deletedDevices, setDeletedDevices] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/devices/deleted")
      .then((res) => res.json())
      .then((data) => setDeletedDevices(data))
      .catch((err) => console.error("Error fetching deleted devices:", err));
  }, []);

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/devices/restore/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        

        setToast("✅ Device restored successfully!");
        setTimeout(() => {
          setToast(null);
          navigate("/home/find-devices");
        }, 2000);
      } else {
        setToast("❌ Failed to restore device.");
      }
    } catch (error) {
      console.error("Restore error:", error);
      setToast("❌ Server error.");
    }
  };

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          {toast}
        </div>
      )}
      <div className="p-6 mt-20 max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">🗃️ Archived Devices</h1>
        {deletedDevices.length === 0 ? (
            <>
                <p className="text-center text-gray-500">No deleted devices found.</p>
                <div className="flex justify-center mt-6">
                            <button
                                onClick={() => navigate("/home/find-devices")}
                                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700 transition"
                            >
                                ⬅️ Back to Find Devices
                            </button>
                </div>
            </>
        ) : (
            <>
                <ul className="divide-y">
                    {deletedDevices.map((device) => (
                    <li key={device._id} className="py-4 flex justify-between items-center">
                        <div>
                        <div className="font-bold text-lg text-red-600">{device.componentName}</div>
                        <div className="text-sm text-gray-500">{device.ip} • {device.location}</div>
                        </div>
                        <button
                        onClick={() => handleRestore(device._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                        >
                        <RotateCcw className="w-5 h-5" /> Restore
                        </button>
                    </li>
                    ))}
                </ul>
                
                <div className="flex justify-center mt-6">
                    <button
                        onClick={() => navigate("/home/find-devices")}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700 transition"
                    >
                        ⬅️ Back to Find Devices
                    </button>
                </div>

            </> 
        )}
      </div>
    </>
  );
}
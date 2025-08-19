import React, { useEffect, useState } from "react";
import DeviceDetail from "../../components/DeviceDetail";

const AddDevice = () => {
  const [devicename, setdevicename] = useState("");
  const [status, setstatus] = useState("");
  const [type, settype] = useState("");
  const [ip, setip] = useState("");
  const [devices, setdevices] = useState([]);
  const [show, setshow] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {}, [devices]);

  const submitDevice = () => {
    const id = devices.length === 0 ? 0 : devices[devices.length - 1].id + 1;
    setdevices([
      ...devices,
      { id: id, devicename: devicename, status: status, type: type, ip: ip },
    ]);

    setToast("✅ Device added successfully!");
    setTimeout(() => setToast(null), 3000);

    setdevicename("");
    setstatus("");
    settype("");
    setip("");
  };

  return (
    <>
        <div hidden = {!toast} className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-down">
          {toast}
        </div>
      <div className="min-h-screen flex justify-center bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 p-5">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Add Device
          </h2>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Device Name</label>
              <input
                type="text"
                value={devicename}
                onChange={(e) => setdevicename(e.target.value)}
                placeholder="Enter device name"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Device Status</label>
              <input
                type="text"
                value={status}
                onChange={(e) => setstatus(e.target.value)}
                placeholder="Active / Inactive"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Device Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => settype(e.target.value)}
                placeholder="Router / Switch"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Device IP</label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setip(e.target.value)}
                placeholder="192.168.1.1"
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </form>

          {/* Buttons under the form */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => submitDevice()}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg shadow-cyan-500/50"
            >
              Add Device
            </button>

            <button
              onClick={() => setshow(!show)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-lg font-semibold transition duration-300"
            >
              {show ? "Show Devices" : "Hide Devices"}
            </button>
          </div>
        </div>
      </div>
      {devices.length === 0 ? (
        <h1 className="text-center text-white text-xl font-semibold mt-8">
          No devices to display
        </h1>
      ) : (
        <div className="mt-8 grid gap-6 max-w-3xl mx-auto">
          {devices.map((device) => (
            <div key={device.id} hidden={show}>
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition duration-300">
                <DeviceDetail
                  id={device.id}
                  devicename={device.devicename}
                  status={device.status}
                  type={device.type}
                  ip={device.ip}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddDevice;

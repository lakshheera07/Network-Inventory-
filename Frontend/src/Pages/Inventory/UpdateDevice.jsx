// UpdateDevice.jsx
import React, { useState } from "react";
import devicesData from "../../data/dummyData";
import DeviceForm from "../../components/DeviceForm";
import { useNavigate } from "react-router-dom";

export default function UpdateDevice() {
  const [devices, setDevices] = useState(devicesData);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const device = devices.find((d) => d.id === parseInt(id));

    if (device) {
      setForm({
        id: device.id,
        componentName: device.devicename,
        ip: device.ip,
        mac: device.mac,
        type: device.type,
        location: device.location || "",
        status: device.status,
        manufacturer: device.manufacturer || "",
        serialNumber: device.serialNumber || "",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!form.componentName) newErrors.componentName = "Component name is required";
    if (!form.ip) newErrors.ip = "IP is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.status) newErrors.status = "Status is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const updatedDevice = {
      ...form,
      devicename: form.componentName,
    };

    const updatedList = devices.map((d) =>
      d.id === updatedDevice.id ? updatedDevice : d
    );
    setDevices(updatedList);

    setToast("✅ Device updated successfully!");
    setTimeout(() => {
      setToast(null);
      navigate("/inventory");
    }, 2000);
  };

  return (
    <>
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          {toast}
        </div>
      )}
      <div className="p-6 mt-20 max-w-lg mx-auto bg-white rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Device</h1>
        <select
          value={selectedId}
          onChange={handleSelect}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="">-- Select a device --</option>
          {devices.map((device) => (
            <option key={device.id} value={device.id}>
              {device.devicename}
            </option>
          ))}
        </select>
        {form && (
          <DeviceForm
            form={form}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonLabel="Update Device"
            updateMode={true}
          />
        )}
      </div>
    </>
  );
}

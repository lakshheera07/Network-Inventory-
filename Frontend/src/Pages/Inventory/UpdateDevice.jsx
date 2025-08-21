import React, { useEffect, useState } from "react";
import DeviceForm from "../../components/DeviceForm";
import { useNavigate } from "react-router-dom";

export default function UpdateDevice() {
  const [devices, setDevices] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  // Fetch devices
  useEffect(() => {
    fetch("http://localhost:5000/api/devices")
      .then((res) => res.json())
      .then((data) => setDevices(data))
      .catch((err) => console.error("Error fetching devices:", err));
  }, []);

  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const device = devices.find((d) => d._id === id);

    if (device) {
      setForm({
        componentName: device.componentName,
        ip: device.ip,
        mac: device.mac,
        type: device.type,
        location: device.location || "",
        status: device.status,
        manufacturer: device.manufacturer || "",
        serialNumber: device.serialNumber || "",
      });
      setErrors({});
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.componentName.trim())
      newErrors.componentName = "Component name is required";
    if (
      !/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(
        form.ip
      )
    )
      newErrors.ip = "Invalid IP Address";
    if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(form.mac))
      newErrors.mac = "Invalid MAC Address";
    if (!["Physical", "Virtual"].includes(form.type))
      newErrors.type = "Type must be Physical or Virtual";
    if (!form.location.trim())
      newErrors.location = "Location is required";
    if (!["Active", "Inactive"].includes(form.status))
      newErrors.status = "Status must be Active or Inactive";
    if (!form.manufacturer.trim())
      newErrors.manufacturer = "Manufacturer is required";
    if (!form.serialNumber.trim())
      newErrors.serialNumber = "Serial number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/devices/${selectedId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        setToast("✅ Device updated successfully!");
        setTimeout(() => {
          setToast(null);
          navigate("/inventory");
        }, 2000);
      } else {
        if (data.errors) {
          setErrors(data.errors); // backend multiple validation errors
        } else {
          setToast("❌ " + (data.error || "Failed to update device."));
        }
      }
    } catch (error) {
      console.error("Error updating device:", error);
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
      <div className="p-6 mt-20 max-w-lg mx-auto bg-white rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Update Device</h1>
        <select
          value={selectedId}
          onChange={handleSelect}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="">-- Select a device --</option>
          {devices.map((device) => (
            <option key={device._id} value={device._id}>
              {device.componentName}
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

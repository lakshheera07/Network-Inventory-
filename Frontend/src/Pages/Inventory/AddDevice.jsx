import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import DeviceForm from "../../components/DeviceForm";

const AddDevice = ({ devices, setDevices }) => {
  const [form, setForm] = useState({
    componentName: "",
    ip: "",
    mac: "",
    type: "",
    location: "",
    status: "",
    manufacturer: "",
    serialNumber: "",
});
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.componentName.trim()) newErrors.componentName = "Component name is required";
    if (!/^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(form.ip))
      newErrors.ip = "Invalid IP Address";
    if (!/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(form.mac)) newErrors.mac = "Invalid MAC Address";
    if (!["Physical", "Virtual"].includes(form.type)) newErrors.type = "Type must be Physical or Virtual";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!["Active", "Inactive"].includes(form.status)) newErrors.status = "Status must be Active or Inactive";
    if (!form.manufacturer.trim()) newErrors.manufacturer = "Manufacturer is required";
    if (!form.serialNumber.trim()) newErrors.serialNumber = "Serial number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const id = devices.length === 0 ? 0 : devices[devices.length - 1].id + 1;
    setDevices([...devices, { id, ...form }]);
    setToast("✅ Device added successfully!");
    setTimeout(() => {
      setToast(null);
      navigate("/inventory");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex justify-center items-center pb-16">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-6 mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">Add Device</h2>
        <DeviceForm
          form={form}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonLabel="Add Device"
        />
      </div>
      {toast && (
        <div
          className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in"
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default AddDevice;

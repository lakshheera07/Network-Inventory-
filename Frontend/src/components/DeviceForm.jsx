import React from "react";

const DeviceForm = ({
  form,
  errors,
  handleChange,
  handleSubmit,
  buttonLabel,
  updateMode = false,
  disableFields = [],
}) => {
  const isDisabled = (name) => updateMode && disableFields.includes(name);

  return (
    <form className="space-y-6">
      {/* Component Name */}
      <InputField label="Component Name" name="componentName" value={form.componentName} handleChange={handleChange} errors={errors} isDisabled={isDisabled("componentName")} />

      {/* IP Address */}
      <InputField label="IP Address" name="ip" value={form.ip} handleChange={handleChange} errors={errors} isDisabled={isDisabled("ip")} />

      {/* MAC Address */}
      <InputField label="MAC Address" name="mac" value={form.mac} handleChange={handleChange} errors={errors} />

      {/* Serial Number */}
      <InputField label="Serial Number" name="serialNumber" value={form.serialNumber} handleChange={handleChange} errors={errors} />

      {/* Type */}
      <SelectField label="Type" name="type" value={form.type} handleChange={handleChange} errors={errors} options={["Physical", "Virtual", "Unknown"]} />

      {/* Category */}
      <SelectField label="Category" name="category" value={form.category} handleChange={handleChange} errors={errors} options={["ethernetCsmacd", "loopback", "wifi", "tunnel", "l2vlan", "Unknown"]} />

      {/* Status */}
      <SelectField label="Status" name="status" value={form.status} handleChange={handleChange} errors={errors} options={["up", "down", "testing", "unknown", "dormant", "notPresent", "lowerLayerDown"]} />

      {/* Location */}
      <InputField label="Location" name="location" value={form.location} handleChange={handleChange} errors={errors} />

      {/* Latitude */}
      <InputField label="Latitude" name="latitude" value={form.latitude} handleChange={handleChange} errors={errors} />

      {/* Longitude */}
      <InputField label="Longitude" name="longitude" value={form.longitude} handleChange={handleChange} errors={errors} />

      {/* Manufacturer */}
      <InputField label="Manufacturer" name="manufacturer" value={form.manufacturer} handleChange={handleChange} errors={errors} />

      {/* Submit Button */}
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg shadow-cyan-500/50"
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};

const InputField = ({ label, name, value, handleChange, errors, isDisabled = false }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      readOnly={isDisabled}
      className={`w-full p-3 rounded-lg border ${errors?.[name] ? "border-red-500" : "border-gray-300"} ${isDisabled ? "bg-gray-100 text-gray-500" : ""}`}
    />
    {errors?.[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
  </div>
);

const SelectField = ({ label, name, value, handleChange, errors, options }) => (
  <div>
    <label className="block text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className={`w-full p-3 rounded-lg border ${errors?.[name] ? "border-red-500" : "border-gray-300"}`}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {errors?.[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
  </div>
);

export default DeviceForm;

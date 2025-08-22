import React from "react";

const DeviceForm = ({
  form,
  errors,
  handleChange,
  handleSubmit,
  buttonLabel,
  updateMode = false,
}) => {
  return (
    <form className="space-y-6">
      {/* Component Name */}
      <div>
        <label className="block text-gray-700 mb-2">Component Name</label>
        <input
          type="text"
          name="componentName"
          value={form.componentName}
          onChange={handleChange}
          readOnly={updateMode}
          className={`w-full p-3 rounded-lg border ${
            errors.componentName ? "border-red-500" : "border-gray-300"
          } ${updateMode ? "bg-gray-100 text-gray-500" : ""}`}
        />
        {errors.componentName && (
          <p className="text-red-500 text-sm">{errors.componentName}</p>
        )}
      </div>

      {/* IP Address */}
      <div>
        <label className="block text-gray-700 mb-2">IP Address</label>
        <input
          type="text"
          name="ip"
          value={form.ip}
          onChange={handleChange}
          readOnly={updateMode}
          className={`w-full p-3 rounded-lg border ${
            errors.ip ? "border-red-500" : "border-gray-300"
          } ${updateMode ? "bg-gray-100 text-gray-500" : ""}`}
        />
        {errors.ip && <p className="text-red-500 text-sm">{errors.ip}</p>}
      </div>

      {/* MAC Address */}
      <div>
        <label className="block text-gray-700 mb-2">MAC Address</label>
        <input
          type="text"
          name="mac"
          value={form.mac}
          onChange={handleChange}
          readOnly={updateMode}
          className={`w-full p-3 rounded-lg border ${
            errors.mac ? "border-red-500" : "border-gray-300"
          } ${updateMode ? "bg-gray-100 text-gray-500" : ""}`}
        />
        {errors.mac && <p className="text-red-500 text-sm">{errors.mac}</p>}
      </div>

      {/* Type */}
      <div>
        <label className="block text-gray-700 mb-2">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          disabled={updateMode}
          className={`w-full p-3 rounded-lg border ${
            errors.type ? "border-red-500" : "border-gray-300"
          } ${updateMode ? "bg-gray-100 text-gray-500" : ""}`}
        >
          <option value="">Select Type</option>
          <option value="Physical">Physical</option>
          <option value="Virtual">Virtual</option>
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Category</option>
          <option value="Router">Router</option>
          <option value="Firewall">Firewall</option>
          <option value="Server">Server</option>
          <option value="Switch">Switch</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category}</p>
        )}
      </div>

      {/* Location */}
      <div>
        <label className="block text-gray-700 mb-2">Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            errors.location ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location}</p>
        )}
      </div>

      {/* Latitude */}
      <div>
        <label className="block text-gray-700 mb-2">Latitude</label>
        <input
          type="text"
          name="latitude"
          value={form.latitude}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            errors.latitude ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.latitude && (
          <p className="text-red-500 text-sm">{errors.latitude}</p>
        )}
      </div>

      {/* Longitude */}
      <div>
        <label className="block text-gray-700 mb-2">Longitude</label>
        <input
          type="text"
          name="longitude"
          value={form.longitude}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            errors.longitude ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.longitude && (
          <p className="text-red-500 text-sm">{errors.longitude}</p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="block text-gray-700 mb-2">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className={`w-full p-3 rounded-lg border ${
            errors.status ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status}</p>
        )}
      </div>

      {/* Manufacturer */}
      <div>
        <label className="block text-gray-700 mb-2">Manufacturer</label>
        <input
          type="text"
          name="manufacturer"
          value={form.manufacturer}
          onChange={handleChange}
          readOnly={updateMode}
          className={`w-full p-3 rounded-lg border ${
            errors.manufacturer ? "border-red-500" : "border-gray-300"
          } ${updateMode ? "bg-gray-100 text-gray-500" : ""}`}
        />
        {errors.manufacturer && (
          <p className="text-red-500 text-sm">{errors.manufacturer}</p>
        )}
      </div>

      {/* Serial Number */}
      <div>
        <label className="block text-gray-700 mb-2">Serial Number</label>
        <input
          type="text"
          name="serialNumber"
          value={form.serialNumber}
          onChange={handleChange}
          readOnly={updateMode}
          className={`w-full p-3 rounded-lg border ${
            errors.serialNumber ? "border-red-500" : "border-gray-300"
          } ${updateMode ? "bg-gray-100 text-gray-500" : ""}`}
        />
        {errors.serialNumber && (
          <p className="text-red-500 text-sm">{errors.serialNumber}</p>
        )}
      </div>

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

export default DeviceForm;

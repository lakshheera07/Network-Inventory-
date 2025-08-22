import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api/devices"; // adjust backend URL

export default function FindDevice() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await axios.get(API_BASE);
      setDevices(res.data);
    } catch (err) {
      console.error("Error fetching devices:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this device?")) return;
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchDevices();
      setSelectedDevice(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Device row clickable
  const renderDeviceRow = (d) => (
    <span
      className="cursor-pointer font-semibold text-gray-800 hover:underline"
      onClick={() => setSelectedDevice(d)}
    >
      {d.componentName}
    </span>
  );

  // Build hierarchical tree with Category -> Type -> Component
  const buildTreeData = () => {
    const locations = {};

    devices.forEach((d) => {
      if (
        (search && !d.componentName.toLowerCase().includes(search.toLowerCase())) ||
        (filterCategory && d.category !== filterCategory) ||
        (filterType && d.type !== filterType) ||
        (filterStatus && d.status !== filterStatus)
      ) {
        return;
      }

      if (!locations[d.location]) {
        locations[d.location] = { active: [], inactive: [] };
      }
      if (d.status?.toLowerCase() === "active") {
        locations[d.location].active.push(d);
      } else {
        locations[d.location].inactive.push(d);
      }
    });

    return Object.entries(locations).map(([location, statusGroup]) => {
      const children = [];

      ["active", "inactive"].forEach((statusKey) => {
        if (statusGroup[statusKey].length > 0) {
          const categoryMap = {};
          statusGroup[statusKey].forEach((d) => {
            if (!categoryMap[d.category]) categoryMap[d.category] = {};
            if (!categoryMap[d.category][d.type]) categoryMap[d.category][d.type] = [];
            categoryMap[d.category][d.type].push(d);
          });

          const statusChildren = Object.entries(categoryMap).map(
            ([category, typeGroup]) => ({
              key: `loc-${location}-${statusKey}-${category}`,
              title: (
                <span className="text-base text-gray-600">{category}</span>
              ),
              children: Object.entries(typeGroup).map(([type, devs]) => ({
                key: `loc-${location}-${statusKey}-${category}-${type}`,
                title: (
                  <span className="text-sm text-gray-500">{type}</span>
                ),
                children: devs.map((d) => ({
                  key: d._id,
                  title: renderDeviceRow(d),
                })),
              })),
            })
          );

          children.push({
            key: `loc-${location}-${statusKey}`,
            title: (
              <span className="text-base text-gray-700">
                {statusKey === "active" ? "Active Devices" : "Inactive Devices"}
              </span>
            ),
            children: statusChildren,
          });
        }
      });

      return {
        key: `loc-${location}`,
        title: <b className="text-lg">{location}</b>,
        children,
      };
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-4">
      {/* Top Filters/Search */}
      <div className="flex gap-3 items-center bg-white shadow p-4 rounded-lg">
        <input
          className="border px-3 py-2 rounded w-1/3 text-base"
          placeholder="Search devices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border px-3 py-2 rounded text-base"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {[...new Set(devices.map((d) => d.category))].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className="border px-3 py-2 rounded text-base"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          {[...new Set(devices.map((d) => d.type))].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className="border px-3 py-2 rounded text-base"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {[...new Set(devices.map((d) => d.status))].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-6">
        {/* Left Panel: Tree */}
        <div className="w-1/3 bg-white shadow rounded-lg p-4">
          <Tree
            treeData={buildTreeData()}
            defaultExpandAll
            selectable={false}
            showIcon={false}
            showLine={{ showLeafIcon: false }}
            className="text-base"
          />
        </div>

        {/* Right Panel: Details */}
        <div className="w-2/3 bg-white shadow rounded-lg p-6">
          {selectedDevice ? (
            <>
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h2 className="font-bold text-2xl">Device Details</h2>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate("/inventory/update", { state: { device: selectedDevice } })
                    }
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Pencil className="w-5 h-5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(selectedDevice._id)}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Trash2 className="w-5 h-5" /> Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-base">
                {[
                  ["Name", selectedDevice.componentName],
                  ["Type", selectedDevice.type],
                  ["Category", selectedDevice.category],
                  ["IP", selectedDevice.ip],
                  ["MAC", selectedDevice.mac],
                  ["Status", selectedDevice.status],
                  ["Location", selectedDevice.location],
                  ["Latitude", selectedDevice.latitude],
                  ["Longitude", selectedDevice.longitude],
                  ["Manufacturer", selectedDevice.manufacturer],
                  ["Serial No", selectedDevice.serialNumber],
                  ["Created", new Date(selectedDevice.createdAt).toLocaleString()],
                  ["Updated", new Date(selectedDevice.updatedAt).toLocaleString()],
                ].map(([label, value]) => (
                  <div key={label} className="flex">
                    <div className="w-32 text-gray-500 font-medium">{label}:</div>
                    <div className="font-semibold text-gray-800">{value || "-"}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-gray-500 text-lg">
              Select a device from the left to see details here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

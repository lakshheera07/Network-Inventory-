import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "rc-tree";
import "rc-tree/assets/index.css";
import { Pencil, Trash2, History, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:5000/api/devices";

export default function FindDevice() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [auditTrail, setAuditTrail] = useState([]);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const res = await axios.get(API_BASE);
      setDevices(res.data.filter((d) => !d.isDeleted));
    } catch (err) {
      console.error("Error fetching devices:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this device?")) return;
    try {
      await axios.put(`${API_BASE}/${id}/soft-delete`, { isDeleted: true });
      fetchDevices();
      setSelectedDevice(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const fetchAuditTrail = async (id) => {
    setLoadingAudit(true);
    try {
      const res = await axios.get(`${API_BASE}/${id}/audit-trail`);
      setAuditTrail(res.data);
    } catch (err) {
      console.error("Error fetching audit trail:", err);
      setAuditTrail([]);
    }
    setLoadingAudit(false);
    setShowAuditModal(true);
  };

  const renderDeviceRow = (d) => (
    <span
      className="cursor-pointer font-semibold text-gray-800 hover:underline"
      onClick={() => setSelectedDevice(d)}
    >
      {d.componentName}
    </span>
  );

  const buildTreeData = () => {
    const tree = {};

    devices.forEach((d) => {
      if (
        (search && !d.componentName.toLowerCase().includes(search.toLowerCase())) ||
        (filterCategory && d.category !== filterCategory) ||
        (filterType && d.type !== filterType) ||
        (filterStatus && d.status !== filterStatus)
      ) return;

      const statusKey = d.status || "Unknown";
      const categoryKey = d.category || "Unknown";
      const typeKey = d.type || "Unknown";

      if (!tree[statusKey]) tree[statusKey] = {};
      if (!tree[statusKey][categoryKey]) tree[statusKey][categoryKey] = {};
      if (!tree[statusKey][categoryKey][typeKey]) tree[statusKey][categoryKey][typeKey] = [];

      tree[statusKey][categoryKey][typeKey].push(d);
    });

    return Object.entries(tree).map(([status, categoryGroup]) => ({
      key: `status-${status}`, 
      title: (<b className={`text-base ${
            status === "up"
              ? "text-green-600"
              : status === "down"
              ? "text-red-600"
              : "text-blue-700"
          }`}>{status}</b>),
      children: Object.entries(categoryGroup).map(([category, typeGroup]) => ({
        key: `status-${status}-category-${category}`,
        title: <span className="text-base text-gray-700">{category}</span>,
        children: Object.entries(typeGroup).map(([type, devs]) => ({
          key: `status-${status}-category-${category}-type-${type}`,
          title: <span className="text-sm text-gray-600">{type}</span>,
          children: devs.map((d) => ({
            key: d._id,
            title: renderDeviceRow(d),
          })),
        })),
      })),
    }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-4">
      {/* Top Filters/Search */}
      <div className="flex gap-3 items-center bg-white shadow p-4 rounded-lg relative">
        <input
          className="border px-3 py-2 rounded w-1/3 text-base"
          placeholder="Search devices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border px-3 py-2 rounded text-base" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">All Categories</option>
          {[...new Set(devices.map((d) => d.category))].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select className="border px-3 py-2 rounded text-base" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All Types</option>
          {[...new Set(devices.map((d) => d.type))].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select className="border px-3 py-2 rounded text-base" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          {[...new Set(devices.map((d) => d.status))].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Deleted Devices Icon */}
        <button
          onClick={() => navigate("/home/inventory/deleted")}
          className="absolute right-4 top-4 flex items-center gap-2 text-red-600 hover:text-red-800"
        >
          <Trash className="w-5 h-5" /> Deleted Devices
        </button>
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
                    onClick={() => navigate("/home/inventory/update", { state: { device: selectedDevice } })}
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
                  <button
                    onClick={() => fetchAuditTrail(selectedDevice._id)}
                    className="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-700 hover:bg-blue-100 transition"
                  >
                    <History className="w-5 h-5" /> View Audit Trail
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

      {/* Audit Trail Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full shadow-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Audit Trail</h2>

            {loadingAudit ? (
              <p>Loading audit history...</p>
            ) : auditTrail.length === 0 ? (
              <p>No audit history available.</p>
            ) : (
              <ul className="space-y-3">
                {auditTrail.map((entry, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <div><strong>Action:</strong> {entry.action}</div>
                    <div><strong>Changed By:</strong> {entry.userId}</div>
                    <div><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleString()}</div>
                    {entry.notes && <div><strong>Notes:</strong> {entry.notes}</div>}

                    {/* Only show changes for UPDATE actions */}
                    {entry.action === "UPDATED" &&
                      entry.changes &&
                      typeof entry.changes === "object" && (
                        <div className="mt-2">
                          <strong>Changes:</strong>
                          <ul className="ml-4 list-disc">
                            {Object.entries(entry.changes)
                              .filter(([field]) => !["_id", "createdAt", "updatedAt", "auditTrail"].includes(field))
                              .map(([field, change], i) => {
                                if (
                                  !change ||
                                  typeof change !== "object" ||
                                  (!("from" in change) && !("to" in change))
                                )
                                  return null;

                                const fromValue = change.from ?? "Null";
                                const toValue = change.to ?? "—";

                                return (
                                  <li key={i}>
                                    <strong>{field}:</strong>{" "}
                                    <span className="text-red-600">{String(fromValue)}</span> →{" "}
                                    <span className="text-green-600">{String(toValue)}</span>
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={() => setShowAuditModal(false)}
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Pie, Bar, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import Cookies from "js-cookie";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [softDeletedDevices, setSoftDeletedDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const [allRes, deletedRes] = await Promise.all([
          fetch("http://localhost:5000/api/devices", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/devices/deleted", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const allDevices = await allRes.json();
        const deletedDevices = await deletedRes.json();

        setDevices(allDevices);
        setSoftDeletedDevices(deletedDevices);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching devices:", err);
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) return <div className="text-center text-lg mt-10">Loading dashboard...</div>;

  const activeDevices = devices.filter((d) => !d.isDeleted);

  const statusCounts = {};
  const typeCounts = { Physical: 0, Virtual: 0, Unknown: 0 };
  const categoryCounts = {};

  const recentAuditEntries = devices
    .flatMap((device) =>
      (device.auditTrail || []).map((entry) => ({
        ...entry,
        componentName: device.componentName,
      }))
    )
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

  devices.forEach((device) => {
    statusCounts[device.status] = (statusCounts[device.status] || 0) + 1;
    if (device.type) typeCounts[device.type]++;
    if (device.category) categoryCounts[device.category] = (categoryCounts[device.category] || 0) + 1;
  });

  return (
    <div className="p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Active vs Soft-Deleted */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Active vs Soft-Deleted</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: ["Active", "Soft-Deleted"],
                datasets: [
                  {
                    label: "Device Count",
                    data: [activeDevices.length, softDeletedDevices.length],
                    backgroundColor: ["#4caf50", "#f44336"],
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Device Types */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Device Types</h3>
          <div className="h-64">
            <Pie
              data={{
                labels: Object.keys(typeCounts),
                datasets: [
                  {
                    data: Object.values(typeCounts),
                    backgroundColor: ["#2196f3", "#ff9800", "#9e9e9e"],
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Status Distribution</h3>
          <div className="h-64">
            <Doughnut
              data={{
                labels: Object.keys(statusCounts),
                datasets: [
                  {
                    data: Object.values(statusCounts),
                    backgroundColor: [
                      "#4caf50", "#f44336", "#ffeb3b", "#9e9e9e", "#00bcd4", "#795548", "#607d8b"
                    ],
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
          <div className="h-64">
            <Pie
              data={{
                labels: Object.keys(categoryCounts),
                datasets: [
                  {
                    data: Object.values(categoryCounts),
                    backgroundColor: [
                      "#3f51b5", "#009688", "#e91e63", "#ff5722", "#cddc39", "#9c27b0"
                    ],
                  },
                ],
              }}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="mt-10 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">🕵️ Recent Audit Actions</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Device Name</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">Timestamp</th>
                <th className="px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {recentAuditEntries.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 font-medium">{entry.componentName}</td>
                  <td className="px-4 py-2">{entry.action}</td>
                  <td className="px-4 py-2">{new Date(entry.timestamp).toLocaleString()}</td>
                  <td className="px-4 py-2">{entry.notes || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

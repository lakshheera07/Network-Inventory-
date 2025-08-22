import React, { useState } from 'react';
import { Link } from 'react-router-dom';
 
const actions = [
  {
    title: "Add Device",
    description: "Register a new network device to your inventory.",
    color: "bg-gradient-to-r from-green-400 to-blue-500",
    key: "add",
    path: "/home/inventory/add",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    title: "Update Device",
    description: "Modify details of an existing device.",
    color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    key: "update",
    path: "/home/inventory/update",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2M12 7v2m0 4v6m-7-7h14" />
      </svg>
    ),
  },
  {
    title: "Delete Device",
    description: "Remove a device from your inventory.",
    color: "bg-gradient-to-r from-red-400 to-pink-500",
    key: "delete",
    path: "/home/inventory/delete",
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5h2M12 7v2m0 4v6m-7-7h14" />
      </svg>
    ),
  },
];
 
const Inventory = () => {
  const [activeView, setActiveView] = useState(null);
  const [devices, setDevices] = useState([]);
 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Device Actions</h1>
 
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        {actions.map((action) => (
          <div
            key={action.key}
            className={`rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:scale-105 ${action.color}`}
          >
            <div className="mb-4">{action.icon}</div>
            <h2 className="text-2xl font-semibold text-white mb-2">{action.title}</h2>
            <p className="text-white text-center mb-6">{action.description}</p>
            <Link
              to={action.path}
              className="px-6 py-2 bg-white text-gray-900 font-bold rounded-lg shadow hover:bg-gray-200 transition"
            >
              {action.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Inventory;
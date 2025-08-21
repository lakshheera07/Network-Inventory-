import React from "react";
import { FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = ({
  username ,
  role,
  onClose
}) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
    } catch (err) {
      console.error("Logout error:", err);
    }
    Cookies.remove("accessToken");
    if (onClose) onClose();
    navigate("/");
  };

  return (
    <aside className="fixed top-0 right-0 h-full w-[320px] bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-400 shadow-2xl flex flex-col items-center py-10 z-[100] transition-transform duration-500">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-white text-2xl hover:text-red-400 transition"
        onClick={onClose}
        aria-label="Close"
        style={{ zIndex: 110 }}
      >
        <FaTimes />
      </button>
      <div className="flex flex-col items-center mb-10 mt-6">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-4 border-4 border-cyan-400">
          <span className="text-5xl font-bold text-cyan-500">
            {username ? username.charAt(0).toUpperCase() : "?"}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-white mb-2">{username}</h2>
        <span className="px-4 py-2 bg-white text-cyan-600 rounded-full text-base font-semibold shadow mb-2">
          {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
        </span>
      </div>
      <div className="w-full flex flex-col items-center mt-auto mb-10">
        <button
          type="button"
          onClick={handleLogout}
          className="px-8 py-3 bg-red-500 hover:bg-red-700 text-white rounded-lg font-semibold shadow transition duration-200 text-lg cursor-pointer"
          style={{ cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default UserProfile;
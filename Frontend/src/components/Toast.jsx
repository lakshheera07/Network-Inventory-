import React, { useEffect } from "react";
import PropTypes from "prop-types";
 
const Toast = ({ message, color = "green", duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
 
  const bgColor = color === "red" ? "bg-red-600" : "bg-green-600";
 
  return (
    <div
      className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg text-white ${bgColor} animate-slide-in-top`}
      style={{ minWidth: "220px", fontSize: "1rem" }}
    >
      {message}
      <style>{`
        @keyframes slide-in-top {
          from { transform: translateX(100%) translateY(-100%); opacity: 0; }
          to { transform: translateX(0) translateY(0); opacity: 1; }
        }
        .animate-slide-in-top {
          animation: slide-in-top 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
};
 
Toast.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["red", "green"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};
 
export default Toast;

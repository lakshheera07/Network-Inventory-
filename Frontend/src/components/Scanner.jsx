import React, { useState, useEffect } from "react";

export default function NetworkScanner() {
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let timeout;
    if (scanning) {
      timeout = setTimeout(() => {
        setScanning(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [scanning]);

  return (
    <div className="flex items-center justify-center bg-transparent">
      <div
        className={`relative w-[400px] h-[400px] network-container ${scanning ? "scanning" : ""}`}
      >
  {/* Router */}
  <div className="router absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-to-tr from-cyan-500 to-cyan-200 rounded-lg shadow-md -translate-x-1/2 -translate-y-1/2 before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-3 before:h-6 before:bg-white before:rounded-sm before:-translate-x-1/2 before:-translate-y-1/2"></div>

        {/* Waves */}
        {[60, 120, 160, 190].map((size, i) => (
          <div
            key={i}
            className={`absolute top-1/2 left-1/2 rounded-full border-2 border-transparent bg-gradient-to-tr from-transparent to-cyan-500 opacity-0 animate-pulseWave`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              animationDelay: `${i * 0.3}s`,
            }}
          ></div>
        ))}

        {/* Devices */}
        <div
          className={`device laptop absolute top-[20%] left-[20%] w-[36px] h-[20px] bg-gradient-to-tr from-purple-800 to-pink-500 rounded shadow-md before:content-[''] before:absolute before:bottom-[-8px] before:left-[4px] before:w-[28px] before:h-[4px] before:bg-white before:rounded-sm ${
            scanning ? "animate-connect" : "opacity-0"
          }`}
          style={{ animationDelay: "0.5s" }}
        ></div>

        <div
          className={`device phone absolute top-[80%] left-[80%] w-[20px] h-[40px] bg-gradient-to-tr from-orange-400 to-yellow-400 rounded shadow-md before:content-[''] before:absolute before:top-[4px] before:left-1/2 before:w-[4px] before:h-[4px] before:bg-white before:rounded-full before:-translate-x-1/2 ${
            scanning ? "animate-connect" : "opacity-0"
          }`}
          style={{ animationDelay: "0.7s" }}
        ></div>

        <div
          className={`device tablet absolute top-[20%] left-[80%] w-[28px] h-[40px] bg-gradient-to-tr from-green-700 to-green-500 rounded shadow-md before:content-[''] before:absolute before:top-[4px] before:left-1/2 before:w-[4px] before:h-[4px] before:bg-white before:rounded-full before:-translate-x-1/2 ${
            scanning ? "animate-connect" : "opacity-0"
          }`}
          style={{ animationDelay: "0.9s" }}
        ></div>

        <div
          className={`device smartwatch absolute top-[80%] left-[20%] w-[20px] h-[20px] bg-gradient-to-tr from-red-700 to-red-400 rounded-full shadow-md before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-[8px] before:h-[8px] before:bg-white before:rounded-full before:-translate-x-1/2 before:-translate-y-1/2 ${
            scanning ? "animate-connect" : "opacity-0"
          }`}
          style={{ animationDelay: "1.1s" }}
        ></div>

        <div
          className={`device tv absolute top-[50%] left-[20%] w-[44px] h-[28px] bg-gradient-to-tr from-indigo-900 to-purple-800 rounded shadow-md before:content-[''] before:absolute before:bottom-[-8px] before:left-1/2 before:w-[16px] before:h-[4px] before:bg-white before:rounded-sm before:-translate-x-1/2 ${
            scanning ? "animate-connect" : "opacity-0"
          }`}
          style={{ animationDelay: "1.3s" }}
        ></div>
      </div>

  {/* No button rendered */}
    </div>
  );
}

import React, { useState } from 'react';
import Toast from "../../components/toast";
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // Save token and user info as needed
        Cookies.set("accessToken", data.accessToken, { expires: 1 }); // expires in 1 day
        Cookies.set("username", data.user.username, { expires: 1 });
        Cookies.set("role", data.user.role, { expires: 1 });
        navigate("/home");
      } else {
        setToast({ message: data.error || "Login failed", color: "red" });
      }
    } catch (err) {
      setToast({ message: "Server error", color: "red" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      {toast && (
        <Toast
          message={toast.message}
          color={toast.color}
          duration={2500}
          onClose={() => setToast(null)}
        />
      )}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-400 p-10 text-center max-w-sm w-full animate-fadeIn">
        <h2 className="text-blue-700 text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="border border-blue-400 rounded-md px-4 py-2 text-indigo-900 bg-[#f4f8fb] focus:outline-none focus:border-blue-700 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border border-blue-400 rounded-md px-4 py-2 text-indigo-900 bg-[#f4f8fb] focus:outline-none focus:border-blue-700 transition"
          />
          <button
            type="submit"
            className="bg-cyan-500 text-white rounded-md px-6 py-2 text-base font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
          >
            Login
          </button>
        </form>
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-blue-400 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 transition transform hover:scale-105"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => navigate('/request-access')}
            className="bg-blue-400 text-white rounded-md px-4 py-2 font-medium hover:bg-blue-700 transition transform hover:scale-105"
          >
            Request Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

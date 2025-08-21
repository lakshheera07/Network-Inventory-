import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ fullname: "", username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    // At least one uppercase, one lowercase, one special character, and min 8 chars
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;
    return regex.test(password);
  };

  const validateUsername = (username) => {
    // At least 4 chars, only letters, numbers, underscores, no spaces
    const regex = /^[a-zA-Z0-9_]{4,}$/;
    return regex.test(username);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!form.fullname) newErrors.fullname = "Full name is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, and a special character";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setToast("✅ Registration successful!");
    setTimeout(() => {
      setToast(null);
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400">
      {toast && (
        <div className="fixed bottom-6 left-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
          {toast}
        </div>
      )}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Register</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full p-3 rounded-lg border ${
                errors.fullname ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className={`w-full p-3 rounded-lg border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className={`w-full p-3 rounded-lg border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-lg font-semibold transition duration-300 shadow-lg shadow-cyan-500/50"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <Link to="/login" className="text-cyan-600 font-bold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register
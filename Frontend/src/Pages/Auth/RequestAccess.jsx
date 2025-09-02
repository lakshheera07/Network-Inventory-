import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RequestAccess = () => {
  const [username, setUsername] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, requestMessage, password, role, status: 'pending' }),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        alert(data.error || "Request failed");
      }
    } catch (err) {
      alert("Access error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl shadow-lg border border-blue-400 p-10 text-center max-w-md w-full animate-fadeIn">
        <h2 className="text-blue-700 text-2xl font-semibold mb-2">Request Network Access</h2>
        {submitted ? (
          <p className="text-blue-700 text-lg mt-6">
            Your request has been sent to the Network Admin.<br />Redirecting to home...
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <input
              type="text"
              placeholder="Your Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="border border-blue-400 rounded-md px-4 py-2 text-indigo-900 bg-[#f4f8fb] focus:outline-none focus:border-blue-700 transition"
            />
            <input
              type="password"
              placeholder="Your Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="border border-blue-400 rounded-md px-4 py-2 text-indigo-900 bg-[#f4f8fb] focus:outline-none focus:border-blue-700 transition"
            />
            <textarea
              placeholder="Why do you need access?"
              value={requestMessage}
              onChange={e => setRequestMessage(e.target.value)}
              required
              className="border border-blue-400 rounded-md px-4 py-2 text-indigo-900 bg-[#f4f8fb] min-h-[100px] resize-y focus:outline-none focus:border-blue-700 transition"
            />

            <select name="role" id="role" value={role} onChange={e => setRole(e.target.value)} required className="border border-blue-400 rounded-md px-4 py-2 text-indigo-900 bg-[#f4f8fb] focus:outline-none focus:border-blue-700 transition">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            
            <button
              type="submit"
              className="bg-cyan-500 text-white rounded-md px-6 py-2 text-base font-medium shadow-md hover:bg-blue-700 hover:scale-105 transition"
            >
              Request Access
            </button>
          </form>
        )}
        <div className="flex gap-4 justify-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 text-blue-700 rounded-md px-4 py-2 font-medium hover:bg-blue-100 transition"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="bg-gray-200 text-blue-700 rounded-md px-4 py-2 font-medium hover:bg-blue-100 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestAccess;

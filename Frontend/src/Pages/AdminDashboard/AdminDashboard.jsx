import React, { useEffect, useState } from "react";
// import dummyUsers from "../../data/dummyUsers";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // Now fetch from backend
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", username: "" });
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/request-users")
      .then((res) => res.json())
      .then((data) => setRequests(data.filter(req => req.status === "pending")))
      .catch(() => setRequests([]));
  }, []);

  // Fetch users from users collection
  useEffect(() => {
    fetch("http://localhost:5000/api/auth/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const reloadData = () => {
    fetch("http://localhost:5000/api/auth/request-users")
      .then((res) => res.json())
      .then((data) => setRequests(data.filter(req => req.status === "pending")))
      .catch(() => setRequests([]));
    fetch("http://localhost:5000/api/auth/get-users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));
  };

  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole;
    setUsers(updatedUsers);
  };
  const handleEdit = (index) => {
    setEditIdx(index);
    setEditForm({ name: users[index].name, username: users[index].username });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };


  const handleRemove = (index) => {
    const user = users[index];
    fetch("http://localhost:5000/api/network-admin/deleteUser", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || `User ${user.username} removed`);
        reloadData();
        setEditIdx(null);
      });
  }
  const handleUpdate = (index) => {
    const user = users[index];
    fetch("http://localhost:5000/api/network-admin/updateRole", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        role: editForm.role
      })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || `Role updated for ${user.username}`);
        reloadData();
        setEditIdx(null);
      });
  };

  const handleApprove = (req) => {
    fetch(`http://localhost:5000/api/network-admin/registerUser/${req._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: req.username,
        password: req.password,
        role: req.requestedRole
      })
    })
      .then(res => res.json())
      .then(data => {
        alert(`User ${data.user.username} registered successfully`);
        reloadData();
      });
  };

  const handleReject = (id) => {
    fetch(`http://localhost:5000/api/network-admin/rejectRequest/${id}`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(data => {
        alert(`Rejected request ${id}`);
        reloadData();
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Active Users</h1>
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Username</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user._id || user.username} className="border-b">
                  <td className="p-3">{user.username}</td>
                  <td className="p-3">
                    {editIdx === idx ? (
                      <select
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="border rounded px-2 py-1 bg-gray-100"
                        disabled={user.role === "networkAdmin"}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span>{user.role}</span>
                    )}
                  </td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    {user.role === "networkAdmin" ? (
                      <span className="text-gray-400">No changes allowed</span>
                    ) : editIdx === idx ? (
                      <button
                        onClick={() => handleUpdate(idx)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditIdx(idx);
                          setEditForm({ role: user.role });
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                      >
                        Edit
                      </button>
                    )}
                    {user.role !== "networkAdmin" && (
                      <button
                        onClick={() => handleRemove(idx)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full max-w-5xl mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Access Requests
        </h2>
        <div className="bg-white rounded-xl shadow-2xl p-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3">Sno</th>
                <th className="py-2 px-3">Username</th>
                <th className="py-2 px-3">Password</th>
                <th className="py-2 px-3">Request Message</th>
                <th className="py-2 px-3">Requested Role</th>
                <th className="py-2 px-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-4 text-center text-gray-500">
                    No requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req, idx) => (
                  <tr key={req._id} className="border-b">
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3">{req.username}</td>
                    <td className="py-2 px-3">
                      <input
                        type="password"
                        value={req.password}
                        readOnly
                        className="bg-gray-100 px-2 py-1 rounded w-32"
                      />
                    </td>
                    <td className="py-2 px-3">{req.requestMessage}</td>
                    <td className="py-2 px-3">{req.requestedRole}</td>
                    <td className="py-2 px-3 flex gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                        onClick={() => handleApprove(req)}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        onClick={() => handleReject(req._id)}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
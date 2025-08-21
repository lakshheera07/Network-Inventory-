import React, { useState } from "react";
import dummyUsers from "../../data/dummyUsers";

const AdminDashboard = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "" });

  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].role = newRole;
    setUsers(updatedUsers);
  };

  const handleRemove = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    if (editIdx === index) setEditIdx(null);
  };

  const handleEdit = (index) => {
    setEditIdx(index);
    setEditForm({ name: users[index].name, email: users[index].email });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = (index) => {
    const updatedUsers = [...users];
    updatedUsers[index].name = editForm.name;
    updatedUsers[index].email = editForm.email;
    setUsers(updatedUsers);
    setEditIdx(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={user.email} className="border-b">
                  <td className="p-3">
                    {editIdx === idx ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="p-3">
                    {editIdx === idx ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleEditChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.email
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(idx, e.target.value)}
                      className="border rounded px-2 py-1 bg-gray-100"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 text-center flex gap-2 justify-center">
                    {editIdx === idx ? (
                      <button
                        onClick={() => handleUpdate(idx)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(idx)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleRemove(idx)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard
import User from "../models/Users.models.js";
import Request from "../models/Request.model.js";
import bcrypt from 'bcrypt'

const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
    );
    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const registerUser = async (req, res) => {
  try {
    const requestId = req.params.id;
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const user = new User({ username, password, role });
    await user.save();
    // Update only the approved request by id
    await Request.findByIdAndUpdate(requestId, { status: "approved" });
    res.status(201).json({ message: "User registered and request approved", user });
  } catch (error) {
    res.status(500).json({ error: "Register User error" });
  }
};

const updateRole = async (req, res) => {
  try {
    const { username, role } = req.body;
    const user = await User.findOneAndUpdate({ username }, { role });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Role updated", user });
  } catch (error) {
    res.status(500).json({ error: "Update role error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOneAndDelete({ username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", user });
  } catch (error) {
    res.status(500).json({ error: "Delete user error" });
  }
};

export { rejectRequest, registerUser, updateRole, deleteUser };
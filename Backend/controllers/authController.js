import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/Users.models.js";
import Request from "../models/Request.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate access token (short-lived)
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token (long-lived)
    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: { fullname: user.fullname, username: user.username, role: user.role },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};

const logout = async (req, res) => {
  try {
    const { username } = req.body;
    // Optionally, you can clear the refreshToken in the database
    await User.findOneAndUpdate({ username }, { refreshToken: "" });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};

const requestAccess = async (req, res) => {
  try {
    const { username, password, requestMessage, role } = req.body;

    // Create a new access request
    const request = new Request({
      username,
      password,
      requestMessage,
      requestedRole: role,
    });

    await request.save();
    res.status(201).json({ message: "Access request submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    console.error(error);
  }
};

const requestedUsers = async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  }
  catch(error){
    res.status(500).json({ error: "can't fetch requests" });
    console.error(error);
  }
};

const getUsers = async(req,res) =>{
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "can't fetch users" });
    console.error(error);
  }
}

export { login, logout, requestedUsers , requestAccess , getUsers };
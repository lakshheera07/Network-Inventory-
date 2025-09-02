import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/Users.models.js";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const createDefaultNetworkAdmin = async () => {
  await mongoose.connect("mongodb://localhost:27017/network-inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existingAdmin = await User.findOne({ username: "lakshheera18" });
  if (existingAdmin) {
    console.log("Default networkAdmin already exists.");
    return;
  }

  const admin = new User({
    username: "lakshheera18",
    password: "Laksh@25.09",
    role: "networkAdmin",
  });

  await admin.save();
  console.log("Default networkAdmin created.");
  mongoose.disconnect();
};

createDefaultNetworkAdmin();
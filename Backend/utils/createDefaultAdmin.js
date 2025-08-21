import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/Users.models.js";

dotenv.config();

const createDefaultNetworkAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const existingAdmin = await User.findOne({ username: process.env.ADMIN_USERNAME });
  if (existingAdmin) {
    console.log("Default networkAdmin already exists.");
    return;
  }

  const admin = new User({
    fullname: process.env.ADMIN_FULLNAME,
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    role: "networkAdmin",
  });

  await admin.save();
  console.log("Default networkAdmin created.");
  mongoose.disconnect();
};

createDefaultNetworkAdmin();
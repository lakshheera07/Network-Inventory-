import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  componentName: String,
  ip: String,
  mac: String,
  type: String,
  location: String,
  status: String,
  manufacturer: String,
  serialNumber: String,
});

const Device = mongoose.model("Device", deviceSchema);
export default Device;

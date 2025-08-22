import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  componentName: {
    type: String,
    required: [true, "Component name is required"],
    trim: true,
    minlength: [2, "Component name must be at least 2 characters"],
    maxlength: [100, "Component name cannot exceed 100 characters"],
  },
  ip: {
    type: String,
    required: [true, "IP address is required"],
    unique: true,
    match: [
      /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
      "Please provide a valid IPv4 address",
    ],
  },
  mac: {
    type: String,
    required: [true, "MAC address is required"],
    unique: true,
    match: [
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      "Please provide a valid MAC address",
    ],
  },
  type: {
    type: String,
    required: [true, "Device type is required"],
    enum: {
      values: ["Physical", "Virtual"],
      message: "{VALUE} is not a valid device type",
    },
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: {
      values: ["Router", "Firewall", "Server", "Switch"],
      message: "{VALUE} is not a valid category",
    },
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    trim: true,
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  latitude: {
    type: String,
    required: [true, "Latitude is required"],
    match: [
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
      "Please provide a valid latitude",
    ],
  },
  longitude: {
    type: String,
    required: [true, "Longitude is required"],
    match: [
      /^[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?$/,
      "Please provide a valid longitude",
    ],
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    enum: {
      values: ["Active", "Inactive"],
      message: "{VALUE} is not a valid status",
    },
    default: "Active",
  },
  manufacturer: {
    type: String,
    required: [true, "Manufacturer is required"],
    trim: true
  },
  serialNumber: {
    type: String,
    required: [true, "Serial number is required"],
    unique: true,
    trim: true
  },
}, { timestamps: true });

const Device = mongoose.model("Device", deviceSchema);
export default Device;

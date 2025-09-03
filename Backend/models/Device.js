import mongoose from "mongoose";
const auditEntrySchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ["CREATED", "UPDATED", "SOFT_DELETED", "RESTORED"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true,
  },
  notes: String,
  changes: {
    type: Object,
  },
});
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
    match: [
      /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
      "Please provide a valid MAC address",
    ],
  },
  type: {
    type: String,
    enum: ["Physical", "Virtual", "Unknown"],
  },
  category: {
    type: String,
    enum: [
      "ethernetCsmacd", "loopback", "wifi", "tunnel", "l2vlan", "Unknown"
    ],
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  latitude: {
    type: String,
    match: [
      /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
      "Please provide a valid latitude",
    ],
  },
  longitude: {
    type: String,
    match: [
      /^[-+]?((1[0-7]\d)|(\d{1,2}))(\.\d+)?|180(\.0+)?$/,
      "Please provide a valid longitude",
    ],
  },
  status: {
    type: String,
    enum: [
      "up", "down", "testing", "unknown", "dormant", "notPresent", "lowerLayerDown"
    ],
    default: "up",
  },
  manufacturer: {
    type: String,
    trim: true,
  },
  serialNumber: {
    type: String,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  auditTrail: [auditEntrySchema],
}, { timestamps: true });

const Device = mongoose.model("Device", deviceSchema);
export default Device;

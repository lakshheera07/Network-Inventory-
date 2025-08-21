import Device from "../models/Device.js";
 
export const getDevices = async (req, res)  => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch devices" });
  }
};
 
export const addDevice  = async (req, res) => {
  try {
    const newDevice = new Device(req.body);
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ error: "Failed to add device" });
  }
};
 
export const updateDevice  = async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ error: "Failed to update device" });
  }
};
 
export const deleteDevice  = async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: "Device deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete device" });
  }
};
 
export const searchDevices  = async (req, res) => {
  const { status, type, location } = req.query;
  const query = {};
  if (status) query.status = status;
  if (type) query.type = type;
  if (location) query.location = location;
 
  try {
    const devices = await Device.find(query);
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Search failed" });
  }
};
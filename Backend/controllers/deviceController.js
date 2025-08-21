import Device from "../models/Device.js";

// Get all devices
export const getDevices = async (req, res)  => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch devices" });
  }
};

// Add new device
export const addDevice  = async (req, res) => {
  try {
    const { ip, mac, serialNumber } = req.body;

    const errors = {};

    // Schema validation happens in Mongoose
    const device = new Device(req.body);
    try {
      await device.validate();
    } catch (validationError) {
      Object.keys(validationError.errors).forEach((key) => {
        errors[key] = validationError.errors[key].message;
      });
    }

    // Uniqueness check manually
    if (await Device.findOne({ ip })) {
      errors.ip = `IP "${ip}" already exists`;
    }
    if (await Device.findOne({ mac })) {
      errors.mac = `MAC "${mac}" already exists`;
    }
    if (serialNumber && await Device.findOne({ serialNumber })) {
      errors.serialNumber = `Serial number "${serialNumber}" already exists`;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    await device.save();
    res.status(201).json(device);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Server error while adding device." });
  }
};

// Update device
export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { ip, mac, serialNumber } = req.body;
    const errors = {};

    const device = await Device.findById(id);
    if (!device) {
      return res.status(404).json({ error: "Device not found" });
    }

    // Update only provided fields
    Object.assign(device, req.body);

    // Validate schema rules
    try {
      await device.validate();
    } catch (validationError) {
      Object.keys(validationError.errors).forEach((key) => {
        errors[key] = validationError.errors[key].message;
      });
    }

    // Uniqueness checks (excluding current device)
    if (ip && await Device.findOne({ ip, _id: { $ne: id } })) {
      errors.ip = `IP "${ip}" already exists`;
    }
    if (mac && await Device.findOne({ mac, _id: { $ne: id } })) {
      errors.mac = `MAC "${mac}" already exists`;
    }
    if (serialNumber && await Device.findOne({ serialNumber, _id: { $ne: id } })) {
      errors.serialNumber = `Serial number "${serialNumber}" already exists`;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    await device.save();
    res.json(device);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Server error while updating device." });
  }
};


// Delete device
export const deleteDevice = async (req, res) => {
  try {
    const deleted = await Device.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Device not found" });
    }
    res.json({ message: "Device deleted successfully", device: deleted });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error while deleting device." });
  }
};


// Search devices
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

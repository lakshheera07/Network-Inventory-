import Device from "../models/Device.js";

// Get all non-deleted devices
export const getDevices = async (req, res) => {
  try {
    const devices = await Device.find({ isDeleted: false });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch devices" });
  }
};

// Get deleted devices
export const getDeletedDevices = async (req, res) => {
  try {
    const devices = await Device.find({ isDeleted: true });
    res.json(devices);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch deleted devices" });
  }
};


// Add new device
export const addDevice = async (req, res) => {
  try {
    const { ip, mac, serialNumber } = req.body;
    const errors = {};
    const device = new Device(req.body);

    // Validate schema constraints
    try {
      await device.validate();
    } catch (validationError) {
      Object.keys(validationError.errors).forEach((key) => {
        errors[key] = validationError.errors[key].message;
      });
    }

    // Check for duplicates only among non-deleted devices
    if (await Device.findOne({ ip, isDeleted: false })) {
      errors.ip = `IP "${ip}" already exists`;
    }
    if (typeof mac === "string" && mac.trim() !== "") {
      const existingMac = await Device.findOne({ mac, isDeleted: false });
      if (existingMac) {
        errors.mac = `MAC "${mac}" already exists`;
      }
    }
    if (serialNumber && await Device.findOne({ serialNumber, isDeleted: false })) {
      errors.serialNumber = `Serial number "${serialNumber}" already exists`;
    }

    // If any errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // Add audit trail entry
    device.auditTrail.push({
      action: "CREATED",
      userId: "admin123", // Replace with actual user ID if available
      timestamp: new Date(),
      notes: "Device created",
    });

    // Save device
    await device.save();
    res.status(201).json(device);

  } catch (err) {
    // Handle MongoDB duplicate key error (e.g., from unique index)
    if (err.code === 11000) {
      const duplicateField = Object.keys(err.keyPattern)[0];
      return res.status(400).json({
        errors: {
          [duplicateField]: `${duplicateField} "${req.body[duplicateField]}" already exists`,
        },
      });
    }

    // Fallback error
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
    if (!device) return res.status(404).json({ error: "Device not found" });

    const changes = {};
    Object.keys(req.body).forEach((key) => {
      if (device[key] !== req.body[key]) {
        changes[key] = { from: device[key], to: req.body[key] };
      }
    });

    Object.assign(device, req.body);

    // Validate schema
    try {
      await device.validate();
    } catch (validationError) {
      Object.keys(validationError.errors).forEach((key) => {
        errors[key] = validationError.errors[key].message;
      });
    }

    // Check for uniqueness among non-deleted devices (excluding current device)
    if (ip && await Device.findOne({ ip, _id: { $ne: id }, isDeleted: false })) {
      errors.ip = `IP "${ip}" already exists`;
    }
    if (typeof mac === "string" && mac.trim() !== "") {
      const existingMac = await Device.findOne({ mac, _id: { $ne: id }, isDeleted: false });
      if (existingMac) {
        errors.mac = `MAC "${mac}" already exists`;
      }
    }
    if (serialNumber && await Device.findOne({ serialNumber, _id: { $ne: id }, isDeleted: false })) {
      errors.serialNumber = `Serial number "${serialNumber}" already exists`;
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    if (Object.keys(changes).length > 0) {
      device.auditTrail.push({
        action: "UPDATED",
        userId: "admin123",
        timestamp: new Date(),
        notes: "Device updated",
        changes,
      });
    }

    await device.save();
    res.json(device);
  } catch (err) {
    res.status(500).json({ error: "Server error while updating device." });
  }
};

// Soft delete device
export const softDeleteDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });

    device.isDeleted = true;
    device.auditTrail.push({
      action: "SOFT_DELETED",
      userId: "admin123",
      timestamp: new Date(),
      notes: "Device soft-deleted",
    });

    await device.save();
    res.json({ message: "Device soft-deleted", device });
  } catch (err) {
    res.status(500).json({ error: "Soft delete failed" });
  }
};

// Restore device
export const restoreDevice = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });

    device.isDeleted = false;
    device.auditTrail.push({
      action: "RESTORED",
      userId: "admin123",
      timestamp: new Date(),
      notes: "Device restored",
    });

    await device.save();
    res.json({ message: "Device restored", device });
  } catch (err) {
    res.status(500).json({ error: "Restore failed" });
  }
};

// Delete device permanently
export const deleteDevice = async (req, res) => {
  try {
    const deleted = await Device.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Device not found" });
    res.json({ message: "Device deleted permanently", device: deleted });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// Search devices
export const searchDevices = async (req, res) => {
  const { status, type, location } = req.query;
  const query = { isDeleted: false };
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

// Log audit trail entry
export const logAuditTrail = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });

    device.auditTrail.push(req.body);
    await device.save();
    res.json({ message: "Audit entry added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to log audit trail" });
  }
};

// Get audit trail
export const getAuditTrail = async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ error: "Device not found" });

    res.json(device.auditTrail || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch audit trail" });
  }
};
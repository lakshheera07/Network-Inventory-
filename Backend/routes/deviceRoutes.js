import express from "express";
import {
  getDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  searchDevices,
  softDeleteDevice,
  restoreDevice,
  getDeletedDevices,
  logAuditTrail,
  getAuditTrail,
} from "../controllers/deviceController.js";
import { scanNetwork } from "../scanner.mjs";

const router = express.Router();

router.get("/", getDevices);
router.post("/", addDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);
router.get("/search", searchDevices);
router.get("/scan", async (req, res) => {
  try {
    const result = await scanNetwork();
    res.json(result.responders);
  } catch (err) {
    res.status(500).json({ error: "Scan failed", details: err.message });
  }
});

// New routes
router.get("/deleted", getDeletedDevices);
router.put("/:id/soft-delete", softDeleteDevice);
router.put("/restore/:id", restoreDevice);
router.post("/:id/audit-trail", logAuditTrail);
router.get("/:id/audit-trail", getAuditTrail);

export default router;
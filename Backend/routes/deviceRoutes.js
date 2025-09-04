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
import { authenticateToken } from "../middleware/authMiddleware.js";
import roleCheckMiddleware from "../middleware/roleCheckMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, roleCheckMiddleware(["user", "admin", "networkAdmin"]), getDevices);
router.post("/", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), addDevice);
router.put("/:id", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), updateDevice);
router.delete("/:id", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), deleteDevice);
router.get("/search", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), searchDevices);
router.get("/scan", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), async (req, res) => {
  try {
    const result = await scanNetwork();
    res.json(result.responders);
  } catch (err) {
    res.status(500).json({ error: "Scan failed", details: err.message });
  }
});

// New routes
router.get("/deleted", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), getDeletedDevices);
router.put("/:id/soft-delete", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), softDeleteDevice);
router.put("/restore/:id", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), restoreDevice);
router.post("/:id/audit-trail", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), logAuditTrail);
router.get("/:id/audit-trail", authenticateToken, roleCheckMiddleware(["admin", "networkAdmin"]), getAuditTrail);

export default router;
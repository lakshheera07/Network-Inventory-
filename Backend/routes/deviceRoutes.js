import express from "express";
import {
  getDevices,
  addDevice,
  updateDevice,
  deleteDevice,
  searchDevices,
} from "../controllers/deviceController.js";
 
const router = express.Router();
 
router.get("/", getDevices);
router.post("/", addDevice);
router.put("/:id", updateDevice);
router.delete("/:id", deleteDevice);
router.get("/search", searchDevices);
 
export default router;
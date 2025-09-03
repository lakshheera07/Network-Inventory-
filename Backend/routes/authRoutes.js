import express from 'express'
import { login, logout , requestAccess , requestedUsers , getUsers } from '../controllers/authController.js'
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();
router.post('/login', login);
router.post('/request-access', requestAccess);
router.post('/logout', logout);
router.get('/request-users', requestedUsers)
router.get('/get-users', getUsers)
router.get("/me", authenticateToken, async (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
});


export default router;

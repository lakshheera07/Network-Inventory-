import express from 'express'
import { login, register, logout } from '../controllers/authController.js'
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get("/me", authenticateToken, async (req, res) => {
  res.json({ username: req.user.username, role: req.user.role });
});


export default router;

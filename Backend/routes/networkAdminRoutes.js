import express from 'express'
import { registerUser, rejectRequest, updateRole, deleteUser } from '../controllers/networkAdminController.js';

const router = express.Router();

router.patch('/rejectRequest/:id', rejectRequest);
router.post('/registerUser/:id', registerUser);
router.patch('/updateRole', updateRole);
router.delete('/deleteUser', deleteUser);

export default router;
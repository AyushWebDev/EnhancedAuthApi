import express from 'express';
import * as authController from '../controller/user.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile/:userId', authenticateToken, authController.getProfile);
router.put('/profile/:userId', authenticateToken, authController.editProfile);

export default router;
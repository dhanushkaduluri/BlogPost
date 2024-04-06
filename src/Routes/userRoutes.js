// routes/userRoutes.js

import express from 'express';
import { register, getUserProfile, login } from '../Controllers/userController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateUser, getUserProfile);

export default router;

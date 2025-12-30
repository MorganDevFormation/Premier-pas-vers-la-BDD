import express from 'express';
import userController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes protégées (nécessitent une authentification)
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

export default router; // Ensure the router is exported as default
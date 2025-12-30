import { Router } from "express";

import authController from '../controllers/auth.controller.js';

import { validateUser, validateToken } from '../middlewares/auth.middleware.js';

const authRouter = Router()

authRouter.post("/auth/register", validateId, validateCardTagId, authController.registerUser);

authRouter.post('/auth/login', validateUser, authController.login)

authRouter.get('/auth/me', validateToken, authController.getMe)

export default authRouter;

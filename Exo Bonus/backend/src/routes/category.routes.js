import express from 'express';
import categoryController from '../controllers/category.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validate from '../middlewares/validator.middleware.js';
import { categorySchema } from '../validators/category.validator.js';

const router = express.Router();

// Routes publiques
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);

// Routes protégées (admin uniquement)
router.post('/', authMiddleware, validate(categorySchema), categoryController.create);
router.put('/:id', authMiddleware, validate(categorySchema), categoryController.update);
router.delete('/:id', authMiddleware, categoryController.delete);

export default router; // Ensure the router is exported as default
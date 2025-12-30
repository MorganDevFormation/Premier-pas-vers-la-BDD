import express from 'express';
import postController from '../controllers/post.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes for posts
router.post('/', authMiddleware, postController.create);
router.get('/', postController.getAll);
router.get('/:id', postController.getOne);
router.put('/:id', authMiddleware, postController.update);
router.delete('/:id', authMiddleware, postController.delete);

export default router; // Ensure the router is exported as default
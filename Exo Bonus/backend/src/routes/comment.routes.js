import express from 'express';
import commentController from '../controllers/comment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes for comments
router.post('/', authMiddleware, commentController.create);
router.put('/:id', authMiddleware, commentController.update);
router.delete('/:id', authMiddleware, commentController.delete);
router.get('/:id/replies', commentController.getReplies);

export default router; // Ensure the router is exported as default
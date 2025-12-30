import { Comment, User } from '../models/index.js';

const commentController = {
  // Ajout d'un commentaire
  async create(req, res) {
    try {
      const { content, postId, parentId } = req.body;

      const comment = await Comment.create({
        content,
        postId,
        parentId,
        userId: req.user.id
      });

      const commentWithAuthor = await Comment.findByPk(comment.id, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] }
        ]
      });

      res.status(201).json(commentWithAuthor);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Modification d'un commentaire
  async update(req, res) {
    try {
      const { content } = req.body;
      const comment = await Comment.findByPk(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: 'Commentaire non trouvé' });
      }

      // Vérifier si l'utilisateur est l'auteur ou un admin
      if (comment.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await comment.update({ content });

      const updatedComment = await Comment.findByPk(comment.id, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] }
        ]
      });

      res.json(updatedComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Suppression d'un commentaire
  async delete(req, res) {
    try {
      const comment = await Comment.findByPk(req.params.id);

      if (!comment) {
        return res.status(404).json({ message: 'Commentaire non trouvé' });
      }

      // Vérifier si l'utilisateur est l'auteur ou un admin
      if (comment.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await comment.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Récupération des réponses à un commentaire
  async getReplies(req, res) {
    try {
      const replies = await Comment.findAll({
        where: { parentId: req.params.id },
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] }
        ],
        order: [['createdAt', 'ASC']]
      });

      res.json(replies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default commentController;
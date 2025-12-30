import { Post, User, Category, Comment } from '../models/index.js';

const postController = {
  // Création de post
  async create(req, res) {
    try {
      const { title, content, categoryId } = req.body;

      const post = await Post.create({
        title,
        content,
        categoryId,
        userId: req.user.id
      });

      const postWithRelations = await Post.findByPk(post.id, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] },
          { model: Category, as: 'category' }
        ]
      });

      res.status(201).json(postWithRelations);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Liste des posts avec pagination
  async getAll(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows: posts } = await Post.findAndCountAll({
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] },
          { model: Category, as: 'category' }
        ],
        order: [['createdAt', 'DESC']],
        limit,
        offset
      });

      res.json({
        posts,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Récupération d'un post
  async getOne(req, res) {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] },
          { model: Category, as: 'category' },
          { 
            model: Comment, 
            as: 'comments',
            include: [
              { model: User, as: 'author', attributes: ['id', 'username'] }
            ]
          }
        ]
      });

      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }

      res.json(post);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Modification d'un post
  async update(req, res) {
    try {
      const { title, content, categoryId } = req.body;
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }

      // Vérifier si l'utilisateur est l'auteur ou un admin
      if (post.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await post.update({
        title: title || post.title,
        content: content || post.content,
        categoryId: categoryId || post.categoryId
      });

      const updatedPost = await Post.findByPk(post.id, {
        include: [
          { model: User, as: 'author', attributes: ['id', 'username'] },
          { model: Category, as: 'category' }
        ]
      });

      res.json(updatedPost);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Suppression d'un post
  async delete(req, res) {
    try {
      const post = await Post.findByPk(req.params.id);

      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }

      // Vérifier si l'utilisateur est l'auteur ou un admin
      if (post.userId !== req.user.id && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await post.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default postController;
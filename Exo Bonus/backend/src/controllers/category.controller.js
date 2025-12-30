import { Category } from '../models/index.js';

const categoryController = {
  // Création de catégorie
  async create(req, res) {
    try {
      const { name, description } = req.body;

      const category = await Category.create({
        name,
        description
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Liste des catégories
  async getAll(req, res) {
    try {
      const categories = await Category.findAll({
        order: [['name', 'ASC']]
      });
      res.json(categories);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Récupération d'une catégorie
  async getOne(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Modification d'une catégorie
  async update(req, res) {
    try {
      const { name, description } = req.body;
      const category = await Category.findByPk(req.params.id);

      if (!category) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }

      await category.update({
        name: name || category.name,
        description: description || category.description
      });

      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Suppression d'une catégorie
  async delete(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Catégorie non trouvée' });
      }

      await category.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default categoryController;
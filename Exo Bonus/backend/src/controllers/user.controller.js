import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';

const userController = {
  // Création de compte
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      const user = await User.create({
        username,
        email,
        password
      });

      // On ne renvoie pas le mot de passe
      const userWithoutPassword = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        bio: user.bio
      };

      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Authentification
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const isValidPassword = await user.checkPassword(password);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Profil utilisateur
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Mise à jour du profil
  async updateProfile(req, res) {
    try {
      const { username, email, bio } = req.body;
      
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      await user.update({
        username: username || user.username,
        email: email || user.email,
        bio: bio || user.bio
      });

      const updatedUser = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

export default userController;
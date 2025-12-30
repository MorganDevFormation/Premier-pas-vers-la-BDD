// filepath: /home/student/projects/SB06-Oddit-revisions/src/database/migrations/XXXXXX-create-categories.js
import { Sequelize } from 'sequelize';

export default {
  up: async (queryInterface) => {
    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Categories');
    await queryInterface.sequelize.query('ALTER SEQUENCE "Categories_id_seq" RESTART WITH 1;');
  }
};
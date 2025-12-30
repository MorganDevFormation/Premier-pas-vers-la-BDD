'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch existing users
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 3) {
      throw new Error('Not enough users in the database to seed posts.');
    }

    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Bienvenue sur O-ddit !',
        content: 'Bienvenue sur notre nouveau forum. N\'hésitez pas à participer aux discussions !',
        userId: users[0].id, // Reference the first user
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Les dernières tendances tech',
        content: 'Voici un aperçu des dernières tendances technologiques...',
        userId: users[1].id, // Reference the second user
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Match de la semaine',
        content: 'Quel match avez-vous préféré cette semaine ?',
        userId: users[2].id, // Reference the third user
        categoryId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
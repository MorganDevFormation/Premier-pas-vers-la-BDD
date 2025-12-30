'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch existing users
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM "Users";',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (users.length < 3) {
      throw new Error('Not enough users in the database to seed comments.');
    }

    await queryInterface.bulkInsert('Comments', [
      {
        content: 'Merci pour l\'accueil !',
        userId: users[0].id, // Reference the first user
        postId: 1,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'Je suis d\'accord avec toi !',
        userId: users[1].id, // Reference the second user
        postId: 1,
        parentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        content: 'L\'IA est vraiment impressionnante ces temps-ci.',
        userId: users[2].id, // Reference the third user
        postId: 2,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
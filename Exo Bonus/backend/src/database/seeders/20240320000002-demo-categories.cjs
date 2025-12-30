module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Général',
        description: 'Discussions générales',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Technologie',
        description: 'Discussions sur la technologie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Divertissement',
        description: 'Discussions sur le divertissement',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
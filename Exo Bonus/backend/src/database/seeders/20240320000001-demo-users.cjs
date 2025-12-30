

module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Clear the Users table to avoid duplicate entries
      await queryInterface.bulkDelete('Users', null, {});
  
      await queryInterface.bulkInsert('Users', [
        {
          id: 'bcfe7001-d4b6-49db-9174-4c6a024c150f',
          username: 'admin',
          email: 'admin@example.com',
          password: 'password123',
          role: 'admin',
          bio: 'Administrateur du forum',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '391f7f37-c18b-45d5-a48c-ae8c9715b2cf',
          username: 'user1',
          email: 'user1@example.com',
          password: 'password123',
          role: 'user',
          bio: 'Utilisateur test 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '48805277-c851-4ba0-a7e3-ae44e16598e0',
          username: 'user2',
          email: 'user2@example.com',
          password: 'password123',
          role: 'user',
          bio: 'Utilisateur test 2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { ignoreDuplicates: true }); // Skip duplicates
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    }
  };
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Clear the Users table to avoid duplicate entries
      await queryInterface.bulkDelete('Users', null, {});
  
      await queryInterface.bulkInsert('Users', [
        {
          id: 'bcfe7001-d4b6-49db-9174-4c6a024c150f',
          username: 'admin',
          email: 'admin@example.com',
          password: 'password123',
          role: 'admin',
          bio: 'Administrateur du forum',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '391f7f37-c18b-45d5-a48c-ae8c9715b2cf',
          username: 'user1',
          email: 'user1@example.com',
          password: 'password123',
          role: 'user',
          bio: 'Utilisateur test 1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '48805277-c851-4ba0-a7e3-ae44e16598e0',
          username: 'user2',
          email: 'user2@example.com',
          password: 'password123',
          role: 'user',
          bio: 'Utilisateur test 2',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { ignoreDuplicates: true }); // Skip duplicates
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Users', null, {});
    }
  }
  
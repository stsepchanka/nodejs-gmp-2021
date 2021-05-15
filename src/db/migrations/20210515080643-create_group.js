'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', { 
      id: "UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
      name: "text",
      permissions: "text"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groups');
  }
};

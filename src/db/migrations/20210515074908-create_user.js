'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('users', { 
       id: "UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
       login: "text",
       password: "text",
       age: "integer",
       isdeleted: "boolean"
    });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('users');
  }
};

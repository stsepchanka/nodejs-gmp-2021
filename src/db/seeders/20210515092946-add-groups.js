'use strict';

const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('groups', [
      {
       name: 'admin',
       permissions: 'READ, WRITE, DELETE, SHARE, UPLOAD_FILES'
      },
      {
       name: 'user',
       permissions: 'READ, WRITE'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groups', {
      name: { [Op.in]: ['admin', 'user']}
    }, {});  }
};

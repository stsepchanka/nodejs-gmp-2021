'use strict';
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        login: 'vasil_vasiliev',
        password: 'vasiliev1',
        age: 40,
        isdeleted: false
      },
      {
        login: 'semen_semenov',
        password: 'semenov1',
        age: 35,
        isdeleted: false
      },
      {
        login: 'petr_petrov',
        password: 'petrov1',
        age: 30,
        isdeleted: false
      },
      {
        login: 'ivan_ivanov',
        password: 'ivanov1',
        age: 25,
        isdeleted: false
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', {
      login: { [Op.in]: ['vasil_vasiliev', 'semen_semenov', 'petr_petrov', 'ivan_ivanov']}
    }, {});
  }
};

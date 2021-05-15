'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('usergroup', { 
      id: "UUID PRIMARY KEY DEFAULT uuid_generate_v4()",
      userid: "UUID",
      groupid: "UUID"
    }).then(() => queryInterface.addConstraint('usergroup', {
      fields: ['userid'],
      type: 'foreign key',
      name: 'FK_usergroup_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })).then(() => queryInterface.addConstraint('usergroup', {
      fields: ['groupid'],
      type: 'foreign key',
      name: 'FK_usergroup_group',
      references: {
        table: 'groups',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usergroup');
  }
};

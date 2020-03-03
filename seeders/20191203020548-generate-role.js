'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tblRoles', [{
      role: 'superadmin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'pt',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      role: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tblRoles', null, {});
  }
};

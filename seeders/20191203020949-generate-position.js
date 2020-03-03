'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('tblPositions', [{
    position: 'superadmin',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    position: 'staff',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    position: 'pt',
    createdAt: new Date(),
    updatedAt: new Date()
  }], {});
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('tblPositions', null, {});
  }
};

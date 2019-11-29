'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblClasses', {
      classId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      class: {
        type: Sequelize.STRING(150)
      },
      classDate: {
        type: Sequelize.STRING(30)
      },
      classDay: {
        type: Sequelize.STRING(30)
      },
      classTime: {
        type: Sequelize.TIME
      },
      flagActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tblClasses');
  }
};
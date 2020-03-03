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
        type: Sequelize.STRING(150),
        unique: true
      },
      classDate: {
        type: Sequelize.STRING(30)
      },
      classDay: {
        type: Sequelize.STRING(30)
      },
      classTimeIn: {
        type: Sequelize.TIME
      },
      classTimeOut: {
        type: Sequelize.TIME
      },
      flagActive: {
        type: Sequelize.BOOLEAN
      },
      color: {
        type: Sequelize.STRING(30)
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
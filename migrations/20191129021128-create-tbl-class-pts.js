'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblClassPts', {
      classPtId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      ptId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblUsers',
          key: 'ptId'
        },
        onDelete: 'SET NULL',
      },
      time: {
        type: Sequelize.TIME
      },
      date: {
        type: Sequelize.INTEGER(3)
      },
      week: {
        type: Sequelize.INTEGER(5)
      },
      month: {
        type: Sequelize.INTEGER(3)
      },
      year: {
        type: Sequelize.INTEGER(5)
      },
      linkZoom: {
        type: Sequelize.STRING(255)
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
    return queryInterface.dropTable('tblClassPts');
  }
};
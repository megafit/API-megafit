'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblStaffs', {
      staffId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      userId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblUsers',
          key: 'userId'
        },
        onDelete: 'CASCADE',
      },
      isPermanent: {
        type: Sequelize.BOOLEAN
      },
      available: {
        type: Sequelize.BOOLEAN
      },
      cardImage: {
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
    return queryInterface.dropTable('tblStaffs');
  }
};
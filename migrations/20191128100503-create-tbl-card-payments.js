'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblCardPayments', {
      cardPaymentId: {
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      noCard: {
        type: Sequelize.STRING(30)
      },
      bankId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblBanks',
          key: 'bankId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      typeCard: {
        type: Sequelize.STRING(10)
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
    return queryInterface.dropTable('tblCardPayments');
  }
};
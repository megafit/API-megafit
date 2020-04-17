'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblOrderLists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      transactionId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblTransactions',
          key: 'transactionId'
        }
      },
      salesInvoice: {
        type: Sequelize.STRING(50)
      },
      packageMembershipId: {
        type: Sequelize.STRING(11),
        references: {
          model: 'tblPackageMemberships',
          key: 'packageMembershipId'
        }
      },
      quantity: {
        type: Sequelize.INTEGER(10)
      },
      totalPrice: {
        type: Sequelize.INTEGER(100)
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
    return queryInterface.dropTable('tblOrderLists');
  }
};
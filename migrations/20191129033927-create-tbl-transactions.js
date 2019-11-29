'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblTransactions', {
      transactionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      salesInvoice: {
        type: Sequelize.STRING(100)
      },
      amount: {
        type: Sequelize.INTEGER(10)
      },
      methodPayment: {
        type: Sequelize.STRING(100)
      },
      fromBank: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblBanks',
          key: 'bankId'
        }
      },
      toBank: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblBanks',
          key: 'bankId'
        }
      },
      accountName: {
        type: Sequelize.STRING(100)
      },
      accountNumber: {
        type: Sequelize.STRING(20)
      },
      typeTransaction: {
        type: Sequelize.STRING(50)
      },
      userId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblUsers',
          key: 'userId'
        }
      },
      adminId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblUsers',
          key: 'userId'
        }
      },
      status: {
        type: Sequelize.STRING(80)
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
    return queryInterface.dropTable('tblTransactions');
  }
};
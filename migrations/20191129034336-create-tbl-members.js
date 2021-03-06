'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblMembers', {
      memberId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER(4).ZEROFILL.UNSIGNED
      },
      userId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblUsers',
          key: 'userId'
        },
        onDelete: 'CASCADE',
      },
      activeExpired: {
        type: Sequelize.DATE
      },
      ptSession: {
        type: Sequelize.INTEGER(5)
      },
      cardImage: {
        type: Sequelize.STRING(255)
      },
      activeDate: {
        type: Sequelize.DATE
      },
      lastCheckin: {
        type: Sequelize.DATE
      },
      packageMembershipId: {
        type: Sequelize.STRING(11),
        references: {
          model: 'tblPackageMemberships',
          key: 'packageMembershipId'
        },
        onDelete: 'SET NULL',
      },
      hasConfirmTermAndCondition: {
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
    return queryInterface.dropTable('tblMembers');
  }
};
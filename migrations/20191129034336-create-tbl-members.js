'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblMembers', {
      memberId: {
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
      packageMembershipId: {
        type: Sequelize.STRING(11),
        references: {
          model: 'tblPackageMemberships',
          key: 'packageMembershipId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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
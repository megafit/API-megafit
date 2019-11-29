'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblMemberships', {
      membershipId: {
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
      packageMembershipId: {
        type: Sequelize.STRING(11),
        references: {
          model: 'tblPackageMemberships',
          key: 'packageMembershipId'
        }
      },
      ptId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblUsers',
          key: 'userId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      dateExpired: {
        type: Sequelize.DATE
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
    return queryInterface.dropTable('tblMemberships');
  }
};
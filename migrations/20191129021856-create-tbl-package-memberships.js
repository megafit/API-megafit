'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblPackageMemberships', {
      packageMembershipId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING(11)
      },
      package: {
        type: Sequelize.STRING(150)
      },
      subCategoryMembershipId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblSubCategoryMemberships',
          key: 'subCategoryMembershipId'
        },
        onDelete: 'SET NULL',
      },
      times: {
        type: Sequelize.INTEGER(11)
      },
      price: {
        type: Sequelize.INTEGER(10)
      },
      activeMember: {
        type: Sequelize.INTEGER(4)
      },
      sessionPtHours: {
        type: Sequelize.INTEGER(3)
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
    return queryInterface.dropTable('tblPackageMemberships');
  }
};
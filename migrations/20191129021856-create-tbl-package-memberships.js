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
      categoryMembershipId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblCategoryMemberships',
          key: 'categoryMembershipId'
        },
        onDelete: 'SET NULL',
      },
      times: {
        type: Sequelize.INTEGER(11)
      },
      price: {
        type: Sequelize.INTEGER(10)
      },
      startPromo: {
        type: Sequelize.DATE
      },
      endPromo: {
        type: Sequelize.DATE
      },
      access: {
        type: Sequelize.STRING(100)
      },
      adminFee: {
        type: Sequelize.INTEGER(11)
      },
      activeMember: {
        type: Sequelize.INTEGER(4)
      },
      flagActive: {
        type: Sequelize.BOOLEAN
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
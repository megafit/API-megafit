'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblSubCategoryMemberships', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subCategoryMembership: {
        type: Sequelize.STRING
      },
      categoryMembershipId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tblCategoryMemberships',
          key: 'categoryMembershipId'
        },
        onDelete: 'SET NULL',
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
      activeFlag: {
        type: Sequelize.BOOLEAN
      },
      isMainPackage: {
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
    return queryInterface.dropTable('tblSubCategoryMemberships');
  }
};
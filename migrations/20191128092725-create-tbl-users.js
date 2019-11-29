'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblUsers', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      username: {
        type: Sequelize.STRING(50)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      fullname: {
        type: Sequelize.STRING(200)
      },
      nickname: {
        type: Sequelize.STRING(100)
      },
      noKtp: {
        type: Sequelize.STRING(16)
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING(100)
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      igAccount: {
        type: Sequelize.STRING(150)
      },
      roleId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblRoles',
          key: 'roleId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      haveWhatsapp: {
        type: Sequelize.BOOLEAN
      },
      flagActive: {
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
    return queryInterface.dropTable('tblUsers');
  }
};
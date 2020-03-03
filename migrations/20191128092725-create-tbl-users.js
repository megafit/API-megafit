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
        type: Sequelize.STRING(50),
        unique: true
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
      avatar: {
        type: Sequelize.STRING(255)
      },
      noKtp: {
        type: Sequelize.STRING(20)
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true
      },
      phone: {
        type: Sequelize.STRING(20)
      },
      gender: {
        type: Sequelize.STRING(15)
      },
      igAccount: {
        type: Sequelize.STRING(150)
      },
      roleId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblRoles',
          key: 'roleId'
        }
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
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblDataSizeMembers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      umur: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.INTEGER
      },
      weight: {
        type: Sequelize.INTEGER
      },
      triceps: {
        type: Sequelize.INTEGER
      },
      dada: {
        type: Sequelize.INTEGER
      },
      perut: {
        type: Sequelize.INTEGER
      },
      pinggul: {
        type: Sequelize.INTEGER
      },
      pinggang: {
        type: Sequelize.INTEGER
      },
      paha: {
        type: Sequelize.INTEGER
      },
      memberId: {
        type: Sequelize.INTEGER(4).ZEROFILL.UNSIGNED,
        references: {
          model: 'tblMembers',
          key: 'memberId'
        },
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('tblDataSizeMembers');
  }
};
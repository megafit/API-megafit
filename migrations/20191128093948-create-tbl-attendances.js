'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblAttendances', {
      attendanceId: {
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
        onDelete: 'CASCADE',
      },
      absent: {
        type: Sequelize.INTEGER(2)
      },
      late: {
        type: Sequelize.INTEGER(2)
      },
      month: {
        type: Sequelize.STRING(2)
      },
      years: {
        type: Sequelize.STRING(4)
      },
      lastAttend: {
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
    return queryInterface.dropTable('tblAttendances');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tblClassPts', {
      classPtId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(11)
      },
      classId: {
        type: Sequelize.INTEGER(11),
        references: {
          model: 'tblClasses',
          key: 'classId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      classDate: {
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
    return queryInterface.dropTable('tblClassPts');
  }
};
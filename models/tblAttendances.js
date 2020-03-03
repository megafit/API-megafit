'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblAttendances = sequelize.define('tblAttendances', {
    attendanceId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    absent: DataTypes.INTEGER,
    late: DataTypes.INTEGER,
    month: DataTypes.STRING,
    years: DataTypes.STRING,
    lastAttend: DataTypes.DATE
  }, {});

  tblAttendances.removeAttribute('id');

  tblAttendances.associate = function (models) {
    // associations can be defined here
    tblAttendances.belongsTo(models.tblUsers, { foreignKey: "userId" })
  };
  return tblAttendances;
};
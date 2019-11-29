'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblAttendances = sequelize.define('tblAttendances', {
    attendanceId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    absent: DataTypes.INTEGER,
    late: DataTypes.INTEGER,
    month: DataTypes.STRING,
    years: DataTypes.STRING,
    lastAttend: DataTypes.DATE
  }, {});
  tblAttendances.associate = function(models) {
    // associations can be defined here
    tblAttendances.belongsTo(models.tblUsers, { foreignKey: "userId" })
  };
  return tblAttendances;
};
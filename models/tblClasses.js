'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblClasses = sequelize.define('tblClasses', {
    classId: DataTypes.INTEGER,
    class: DataTypes.STRING,
    classDate: DataTypes.STRING,
    classDay: DataTypes.STRING,
    classTime: DataTypes.TIME,
    flagActive: DataTypes.BOOLEAN
  }, {});
  tblClasses.associate = function (models) {
    // associations can be defined here
    tblClasses.hasMany(models.tblClassPts, { foreignKey: "classId" })
  };
  return tblClasses;
};
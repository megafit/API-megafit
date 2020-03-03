'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblClasses = sequelize.define('tblClasses', {
    classId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    class: DataTypes.STRING,
    classDate: DataTypes.STRING,
    classDay: DataTypes.STRING,
    classTimeIn: DataTypes.TIME,
    classTimeOut: DataTypes.TIME,
    flagActive: DataTypes.BOOLEAN,
    color: DataTypes.STRING
  }, {});
  tblClasses.associate = function (models) {
    // associations can be defined here
    tblClasses.hasMany(models.tblClassPts, { foreignKey: "classId" })
  };
  return tblClasses;
};
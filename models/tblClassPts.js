'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblClassPts = sequelize.define('tblClassPts', {
    classPtId: DataTypes.INTEGER,
    classId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    classDate: DataTypes.DATE
  }, {});
  tblClassPts.associate = function(models) {
    // associations can be defined here
    tblClassPts.belongsTo(models.tblClasses, { foreignKey: "classId" })
    tblClassPts.belongsTo(models.tblUsers, { foreignKey: "userId" })

  };
  return tblClassPts;
};
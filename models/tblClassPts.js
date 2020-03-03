'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblClassPts = sequelize.define('tblClassPts', {
    classPtId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    classId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    classDate: DataTypes.DATE
  }, {});
  tblClassPts.associate = function (models) {
    // associations can be defined here
    // tblClassPts.belongsTo(models.tblClasses, { foreignKey: "classId" })
    // tblClassPts.belongsTo(models.tblUsers, { foreignKey: "userId" })
    models.tblUsers.belongsToMany(models.tblClasses, { through: tblClassPts, foreignKey: 'userId' })
    models.tblClasses.belongsToMany(models.tblUsers, { through: tblClassPts, foreignKey: 'classId' })
  };
  return tblClassPts;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblHistoryPTs = sequelize.define('tblHistoryPTs', {
    userId: DataTypes.INTEGER,
    classPtId: DataTypes.INTEGER,
    catatan: DataTypes.STRING,
    hasJoined: DataTypes.BOOLEAN
  }, {});
  tblHistoryPTs.associate = function (models) {
    // associations can be defined here
    tblHistoryPTs.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblHistoryPTs.belongsTo(models.tblClassPts, { foreignKey: "classPtId" })
  };
  return tblHistoryPTs;
};
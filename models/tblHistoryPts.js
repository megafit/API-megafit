'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblHistoryPTs = sequelize.define('tblHistoryPTs', {
    userId: DataTypes.INTEGER,
    classPtId: DataTypes.INTEGER,
    catatan: DataTypes.STRING
  }, {});
  tblHistoryPTs.associate = function (models) {
    // associations can be defined here
    tblHistoryPTs.belongsTo(models.tblClassPts, { foreignKey: "classPtId" })
  };
  return tblHistoryPTs;
};
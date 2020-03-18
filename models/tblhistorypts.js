'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblHistoryPTs = sequelize.define('tblHistoryPTs', {
    userId: DataTypes.INTEGER,
    ptId: DataTypes.INTEGER
  }, {});
  tblHistoryPTs.associate = function (models) {
    // associations can be defined here
    tblHistoryPTs.belongsTo(models.tblUsers, { foreignKey: "userId", as: "user" })
    tblHistoryPTs.belongsTo(models.tblUsers, { foreignKey: "ptId", as: "pt" })
  };
  return tblHistoryPTs;
};
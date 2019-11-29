'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblStaffs = sequelize.define('tblStaffs', {
    staffId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    positionId: DataTypes.INTEGER,
    isPermanent: DataTypes.BOOLEAN,
    available: DataTypes.BOOLEAN
  }, {});
  tblStaffs.associate = function(models) {
    // associations can be defined here
    tblStaffs.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblStaffs.belongsTo(models.tblPositions, { foreignKey: "positionId" })
  };
  return tblStaffs;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblCheckinCheckouts = sequelize.define('tblCheckinCheckouts', {
    checkId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    checkinTime: DataTypes.TIME,
    checkoutTime: DataTypes.TIME,
    lockerKey: DataTypes.BOOLEAN
  }, {});
  tblCheckinCheckouts.associate = function(models) {
    // associations can be defined here
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "adminId" })
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "adminId" })

  };
  return tblCheckinCheckouts;
};
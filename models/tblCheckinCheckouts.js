'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblCheckinCheckouts = sequelize.define('tblCheckinCheckouts', {
    checkId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    adminIdCheckin: DataTypes.INTEGER,
    adminIdCheckout: DataTypes.INTEGER,
    checkinTime: DataTypes.TIME,
    checkoutTime: DataTypes.TIME,
    lockerKey: DataTypes.STRING
  }, {});
  tblCheckinCheckouts.associate = function (models) {
    // associations can be defined here
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "userId", as: "member" })
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "adminIdCheckin", as: "admin_checkin" })
    tblCheckinCheckouts.belongsTo(models.tblUsers, { foreignKey: "adminIdCheckout", as: "admin_checkout" })
  };
  return tblCheckinCheckouts;
};
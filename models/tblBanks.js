'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblBanks = sequelize.define('tblBanks', {
    bankId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role: DataTypes.STRING
  }, {});
  tblBanks.associate = function (models) {
    // associations can be defined here
    tblBanks.hasMany(models.tblCardPayments, { foreignKey: "bankId" })
    tblBanks.hasMany(models.tblTransactions, { foreignKey: "fromBank" })
    tblBanks.hasMany(models.tblTransactions, { foreignKey: "toBank" })
  };
  return tblBanks;
};
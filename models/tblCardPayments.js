'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblCardPayments = sequelize.define('tblCardPayments', {
    cardPaymentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    noCard: DataTypes.STRING,
    bankId: DataTypes.INTEGER,
    typeCard: DataTypes.STRING
  }, {});
  tblCardPayments.associate = function (models) {
    // associations can be defined here
    tblCardPayments.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblCardPayments.belongsTo(models.tblBanks, { foreignKey: "bankId" })
  };
  return tblCardPayments;
};
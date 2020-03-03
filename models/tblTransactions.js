'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblTransactions = sequelize.define('tblTransactions', {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    salesInvoice: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    methodPayment: DataTypes.STRING,
    fromBank: DataTypes.INTEGER,
    toBank: DataTypes.INTEGER,
    accountName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    typeTransaction: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    adminId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  tblTransactions.associate = function (models) {
    // associations can be defined here
    tblTransactions.belongsTo(models.tblBanks, { foreignKey: "fromBank" })
    tblTransactions.belongsTo(models.tblBanks, { foreignKey: "toBank" })
    tblTransactions.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblTransactions.belongsTo(models.tblUsers, { foreignKey: "adminId" })
  };
  return tblTransactions;
};
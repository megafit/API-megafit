'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblTransactions = sequelize.define('tblTransactions', {
    transactionId: DataTypes.INTEGER,
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
  tblTransactions.associate = function(models) {
    // associations can be defined here
  };
  return tblTransactions;
};
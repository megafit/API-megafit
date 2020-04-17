'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblOrderLists = sequelize.define('tblOrderLists', {
    transactionId: DataTypes.INTEGER,
    salesInvoice: DataTypes.STRING,
    packageMembershipId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER
  }, {});
  tblOrderLists.associate = function(models) {
    // associations can be defined here
  };
  return tblOrderLists;
};
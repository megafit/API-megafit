'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblTransactions = sequelize.define('tblTransactions', {
    transactionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    methodPayment: DataTypes.STRING, //payment by (ovo, edc BCA, Transfer BCA, etc)
    // fromBank: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
    staffId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    admPrice: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  tblTransactions.associate = function (models) {
    // associations can be defined here
    // tblTransactions.belongsTo(models.tblBanks, { foreignKey: "fromBank" })
    tblTransactions.belongsTo(models.tblUsers, { foreignKey: "memberId", as: "member" })
    tblTransactions.belongsTo(models.tblUsers, { foreignKey: "staffId", as: "staff" })
  };
  return tblTransactions;
};
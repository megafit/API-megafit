'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblMemberships = sequelize.define('tblMemberships', {
    membershipId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    packageMembershipId: DataTypes.STRING,
    ptId: DataTypes.INTEGER,
    dateExpired: DataTypes.DATE
  }, {});
  tblMemberships.associate = function (models) {
    // associations can be defined here
    tblMemberships.belongsTo(models.tblCategoryMemberships, { foreignKey: "categoryMembershipId" })
    tblMemberships.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblMemberships.belongsTo(models.tblUsers, { foreignKey: "ptId" })
  };
  return tblMemberships;
};
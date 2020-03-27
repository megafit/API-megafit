'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblMemberships = sequelize.define('tblMemberships', {
    membershipId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    packageMembershipId: DataTypes.STRING,
    ptId: DataTypes.INTEGER,
    dateExpired: DataTypes.DATE
  }, {});
  tblMemberships.associate = function (models) {
    // associations can be defined here
    tblMemberships.belongsTo(models.tblPackageMemberships, { foreignKey: "packageMembershipId" })
    tblMemberships.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblMemberships.belongsTo(models.tblUsers, { foreignKey: "ptId" })
  };
  return tblMemberships;
};
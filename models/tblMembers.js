'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblMembers = sequelize.define('tblMembers', {
    memberId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    activeExpired: DataTypes.DATE,
    ptSession: DataTypes.INTEGER,
    cardImage: DataTypes.STRING,
    activeDate: DataTypes.DATE,
    lastCheckin: DataTypes.DATE,
    packageMembershipId: DataTypes.STRING,
    hasConfirmTermAndCondition: DataTypes.BOOLEAN
  }, {});
  tblMembers.removeAttribute('id');

  tblMembers.associate = function (models) {
    // associations can be defined here
    tblMembers.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblMembers.belongsTo(models.tblPackageMemberships, { foreignKey: "packageMembershipId" })
    tblMembers.hasMany(models.tblDataSizeMembers, { foreignKey: "memberId" })
  };
  return tblMembers;
};
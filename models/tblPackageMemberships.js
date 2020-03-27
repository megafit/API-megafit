'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblPackageMemberships = sequelize.define('tblPackageMemberships', {
    packageMembershipId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    package: DataTypes.STRING,
    subCategoryMembershipId: DataTypes.INTEGER,
    times: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    activeMember: DataTypes.INTEGER,
    sessionPtHours: DataTypes.INTEGER
  }, {});

  tblPackageMemberships.removeAttribute('id');

  tblPackageMemberships.associate = function (models) {
    // associations can be defined here
    tblPackageMemberships.belongsTo(models.tblSubCategoryMemberships, { foreignKey: "subCategoryMembershipId" })
    tblPackageMemberships.hasMany(models.tblMemberships, { foreignKey: "packageMembershipId" })
    tblPackageMemberships.hasMany(models.tblMembers, { foreignKey: "packageMembershipId" })
    tblPackageMemberships.hasOne(models.tblSubCategoryMemberships, { foreignKey: "mainPackageId" })
  };
  return tblPackageMemberships;
};
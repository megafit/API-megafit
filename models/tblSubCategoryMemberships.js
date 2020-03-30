'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblSubCategoryMemberships = sequelize.define('tblSubCategoryMemberships', {
    subCategoryMembership: DataTypes.STRING,
    categoryMembershipId: DataTypes.INTEGER,
    startPromo: DataTypes.DATE,
    endPromo: DataTypes.DATE,
    access: DataTypes.STRING,
    adminFee: DataTypes.INTEGER,
    activeFlag: DataTypes.BOOLEAN,
    isMainPackage: DataTypes.BOOLEAN,
  }, {});
  tblSubCategoryMemberships.associate = function (models) {
    // associations can be defined here
    tblSubCategoryMemberships.belongsTo(models.tblCategoryMemberships, { foreignKey: 'categoryMembershipId' })
    tblSubCategoryMemberships.hasMany(models.tblPackageMemberships, { foreignKey: 'subCategoryMembershipId' })
    tblSubCategoryMemberships.hasOne(models.tblCategoryMemberships, { foreignKey: 'mainPackageId' })
  };
  return tblSubCategoryMemberships;
};
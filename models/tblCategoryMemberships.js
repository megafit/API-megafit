'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblCategoryMemberships = sequelize.define('tblCategoryMemberships', {
    categoryMembershipId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryMembership: DataTypes.STRING,
    mainPackageId: DataTypes.INTEGER
  }, {});
  tblCategoryMemberships.associate = function (models) {
    // associations can be defined here
    tblCategoryMemberships.hasMany(models.tblSubCategoryMemberships, { foreignKey: "categoryMembershipId" })
    tblCategoryMemberships.belongsTo(models.tblSubCategoryMemberships, { foreignKey: "mainPackageId" })
  };
  return tblCategoryMemberships;
};
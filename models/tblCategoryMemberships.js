'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblCategoryMemberships = sequelize.define('tblCategoryMemberships', {
    categoryMembershipId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    categoryMembership: DataTypes.STRING
  }, {});
  tblCategoryMemberships.associate = function (models) {
    // associations can be defined here
    tblCategoryMemberships.hasMany(models.tblCategoryMemberships, { foreignKey: "categoryMembershipId" })
  };
  return tblCategoryMemberships;
};
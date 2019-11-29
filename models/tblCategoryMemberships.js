'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblCategoryMemberships = sequelize.define('tblCategoryMemberships', {
    categoryMembershipId: DataTypes.INTEGER,
    categoryMembership: DataTypes.STRING
  }, {});
  tblCategoryMemberships.associate = function(models) {
    // associations can be defined here
  };
  return tblCategoryMemberships;
};
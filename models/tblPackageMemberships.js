'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblPackageMemberships = sequelize.define('tblPackageMemberships', {
    packageMembershipId: DataTypes.INTEGER,
    package: DataTypes.STRING,
    categoryMembershipId: DataTypes.INTEGER,
    times: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    startPromo: DataTypes.DATE,
    endPromo: DataTypes.DATE,
    access: DataTypes.STRING,
    adminFee: DataTypes.INTEGER,
    activeMember: DataTypes.INTEGER,
    flagActive: DataTypes.BOOLEAN,
    sessionPtHours: DataTypes.INTEGER
  }, {});
  tblPackageMemberships.associate = function (models) {
    // associations can be defined here
    tblPackageMemberships.belongsTo(models.tblCategoryMemberships, { foreignKey: "categoryMembershipId" })
    tblPackageMemberships.hasMany(models.tblMemberships, { foreignKey: "packageMembershipId" })
  };
  return tblPackageMemberships;
};
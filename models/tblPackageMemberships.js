'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblPackageMemberships = sequelize.define('tblPackageMemberships', {
    packageMembershipId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
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

  tblPackageMemberships.removeAttribute('id');

  tblPackageMemberships.associate = function (models) {
    // associations can be defined here
    tblPackageMemberships.belongsTo(models.tblCategoryMemberships, { foreignKey: "categoryMembershipId" })
    tblPackageMemberships.hasMany(models.tblMemberships, { foreignKey: "packageMembershipId" })
    tblPackageMemberships.hasMany(models.tblMembers, { foreignKey: "packageMembershipId" })
  };
  return tblPackageMemberships;
};
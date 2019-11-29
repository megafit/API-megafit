'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblMembers = sequelize.define('tblMembers', {
    memberId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    activeExpired: DataTypes.DATE,
    ptSession: DataTypes.INTEGER,
    cardImage: DataTypes.STRING,
    activeDate: DataTypes.DATE,
    packageMembershipId: DataTypes.STRING
  }, {});
  tblMembers.associate = function(models) {
    // associations can be defined here
    tblMembers.belongsTo(models.tblUsers, { foreignKey: "userId" })
  };
  return tblMembers;
};
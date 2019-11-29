'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblRoles = sequelize.define('tblRoles', {
    roleId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {});
  tblRoles.associate = function (models) {
    // associations can be defined here
    tblRoles.hasMany(models.tblUsers, { foreignKey: "roleId" })
  };
  return tblRoles;
};
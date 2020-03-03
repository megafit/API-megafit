'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblRoles = sequelize.define('tblRoles', {
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    role: DataTypes.STRING
  }, {});
  tblRoles.associate = function (models) {
    // associations can be defined here
    tblRoles.hasMany(models.tblUsers, { foreignKey: "roleId" })
  };
  return tblRoles;
};
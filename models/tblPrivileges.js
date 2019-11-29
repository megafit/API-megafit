'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblPrivileges = sequelize.define('tblPrivileges', {
    privilegeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    menuId: DataTypes.INTEGER,
    create: DataTypes.BOOLEAN,
    read: DataTypes.BOOLEAN,
    update: DataTypes.BOOLEAN,
    delete: DataTypes.BOOLEAN
  }, {});
  tblPrivileges.associate = function(models) {
    // associations can be defined here
    tblPrivileges.belongsTo(models.tblUsers, { foreignKey: "userId" })
    tblPrivileges.belongsTo(models.tblMenus, { foreignKey: "menuId" })
  };
  return tblPrivileges;
};
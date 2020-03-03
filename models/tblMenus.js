'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblMenus = sequelize.define('tblMenus', {
    menuId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    menu: DataTypes.STRING
  }, {});
  tblMenus.associate = function (models) {
    // associations can be defined here
    tblMenus.hasMany(models.tblPrivileges, { foreignKey: "menuId" })
  };
  return tblMenus;
};
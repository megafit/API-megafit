'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblDataSizeMembers = sequelize.define('tblDataSizeMembers', {
    umur: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    triceps: DataTypes.INTEGER,
    dada: DataTypes.INTEGER,
    perut: DataTypes.INTEGER,
    pinggul: DataTypes.INTEGER,
    pinggang: DataTypes.INTEGER,
    paha: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER,
  }, {});
  tblDataSizeMembers.associate = function(models) {
    // associations can be defined here
    tblDataSizeMembers.belongsTo(models.tblMembers, { foreignKey: "memberId" })
  };
  return tblDataSizeMembers;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblPositions = sequelize.define('tblPositions', {
    positionId: DataTypes.INTEGER,
    position: DataTypes.STRING
  }, {});
  tblPositions.associate = function(models) {
    // associations can be defined here
    tblPositions.hasMany(models.tblStaffs, { foreignKey: "positionId" })

  };
  return tblPositions;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblPositions = sequelize.define('tblPositions', {
    positionId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    position: DataTypes.STRING
  }, {});
  tblPositions.associate = function (models) {
    // associations can be defined here
    tblPositions.hasMany(models.tblStaffs, { foreignKey: "positionId" })
  };
  return tblPositions;
};
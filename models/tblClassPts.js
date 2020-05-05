'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblClassPts = sequelize.define('tblClassPts', {
    classPtId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    ptId: DataTypes.INTEGER,
    time: DataTypes.TIME,
    date: DataTypes.INTEGER,
    week: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    linkZoom: DataTypes.STRING,
  }, {});
  tblClassPts.associate = function (models) {
    // associations can be defined here
    tblClassPts.belongsTo(models.tblUsers, { foreignKey: 'ptId' })
    tblClassPts.hasMany(models.tblHistoryPTs, { foreignKey: 'classPtId'})
  };
  return tblClassPts;
};
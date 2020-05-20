'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblStaffs = sequelize.define('tblStaffs', {
    staffId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    isPermanent: DataTypes.BOOLEAN,
    available: DataTypes.BOOLEAN,
    cardImage: DataTypes.STRING
  }, {});

  tblStaffs.removeAttribute('id');

  tblStaffs.associate = function (models) {
    // associations can be defined here
    tblStaffs.belongsTo(models.tblUsers, { foreignKey: "userId" })
  };
  return tblStaffs;
};
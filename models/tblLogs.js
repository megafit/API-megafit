'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblLogs = sequelize.define('tblLogs', {
    user: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {});
  tblLogs.associate = function (models) {
    // associations can be defined here
  };
  return tblLogs;
};
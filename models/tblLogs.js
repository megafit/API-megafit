'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblLogs = sequelize.define('tblLogs', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    method: DataTypes.STRING,
    status: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  tblLogs.associate = function (models) {
    // associations can be defined here
    tblLogs.belongsTo(models.tblUsers, { foreignKey: "userId" })
  };
  return tblLogs;
};
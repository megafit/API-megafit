'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblUsers = sequelize.define('tblUsers', {
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    noKtp: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    igAccount: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    haveWhatsapp: DataTypes.BOOLEAN,
    flagActive: DataTypes.BOOLEAN
  }, {});
  tblUsers.associate = function (models) {
    // associations can be defined here
    tblUsers.belongsTo(models.tblRoles, { foreignKey: "roleId" })

    tblUsers.hasOne(models.tblStaffs, { foreignKey: "userId" })
    tblUsers.hasOne(models.tblMembers, { foreignKey: "userId" })

    tblUsers.hasMany(models.tblAttendances, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblClassPts, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblCardPayments, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblPrivileges, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblCheckinCheckouts, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblCheckinCheckouts, { foreignKey: "adminId" })
    tblUsers.hasMany(models.tblTransactions, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblTransactions, { foreignKey: "adminId" })
    tblUsers.hasMany(models.tblMemberships, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblMemberships, { foreignKey: "ptId" })
  };
  return tblUsers;
};
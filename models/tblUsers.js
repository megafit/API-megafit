'use strict';
module.exports = (sequelize, DataTypes) => {
  const tblUsers = sequelize.define('tblUsers', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    nickname: DataTypes.STRING,
    avatar: DataTypes.STRING,
    noKtp: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.STRING,
    igAccount: DataTypes.STRING,
    roleId: DataTypes.INTEGER,
    haveWhatsapp: DataTypes.BOOLEAN,
    flagActive: DataTypes.BOOLEAN
  }, {});

  tblUsers.removeAttribute('id');

  tblUsers.associate = function (models) {
    // associations can be defined here
    tblUsers.belongsTo(models.tblRoles, { foreignKey: "roleId" })

    tblUsers.hasOne(models.tblStaffs, { foreignKey: "userId" })
    tblUsers.hasOne(models.tblMembers, { foreignKey: "userId" })

    tblUsers.hasMany(models.tblAttendances, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblClassPts, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblCardPayments, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblPrivileges, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblCheckinCheckouts, { foreignKey: "userId", as: "member" })
    tblUsers.hasMany(models.tblCheckinCheckouts, { foreignKey: "adminIdCheckin", as: "admin_checkin" })
    tblUsers.hasMany(models.tblCheckinCheckouts, { foreignKey: "adminIdCheckout", as: "admin_checkout" })
    tblUsers.hasMany(models.tblTransactions, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblTransactions, { foreignKey: "adminId" })
    tblUsers.hasMany(models.tblMemberships, { foreignKey: "userId" })
    tblUsers.hasMany(models.tblMemberships, { foreignKey: "ptId" })
    tblUsers.hasMany(models.tblHistoryPTs, { foreignKey: "userId", as: "user" })
    tblUsers.hasMany(models.tblHistoryPTs, { foreignKey: "ptId", as: "pt" })
  };
  return tblUsers;
};
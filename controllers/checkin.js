const { tblCheckinCheckouts, tblUsers, tblStaffs, tblMembers, tblAttendances } = require("../models")
// const Op = require('sequelize').Op
const { log } = require('../helpers/log')

class checkin {

  static async create(req, res) {
    try {
      let dataMembers = await tblMembers.findOne({ where: { userId: req.body.userId } })
      if (dataMembers) {
        if (!dataMembers.activeDate) {
          await tblMembers.update({ activeDate: new Date() }, { where: { userId: dataMembers.userId } })
        }
      }

      let newUserCheckin = {
        userId: req.body.userId,
        adminIdCheckin: req.user.userId,
        lockerKey: req.body.lockerKey,
        checkinTime: new Date()
      }

      let userCheckin = await tblCheckinCheckouts.create(newUserCheckin)
      await tblMembers.update({ lastCheckin: new Date() }, { where: { userId: req.body.userId } })
      res.status(201).json({ message: "Success", data: userCheckin })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/checkin-checkout`,
        method: 'post',
        status: 201,
        message: "",
      }
      log(newData)

    } catch (Error) {
      res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/checkin-checkout`,
        method: 'post',
        status: 500,
        message: JSON.stringify(Error),
      }
      log(newData)

    }
  }


  static async findAll(req, res) {
    let query = ""
    try {
      if (req.query.checkin === "true") {
        query = query + "?checkin=true"

        let onlyCheckin = await tblCheckinCheckouts.findAll({
          where: { checkoutTime: null },
          include: [
            { model: tblUsers, as: "member" },
            { model: tblUsers, as: "admin_checkin" },
            { model: tblUsers, as: "admin_checkout" }
          ]
        })

        res.status(200).json({ message: "Success", totalRecord: onlyCheckin.length, data: onlyCheckin })
      } else {
        let allCheckin = await tblCheckinCheckouts.findAll({ include: [{ model: tblUsers, as: "member" }, { model: tblUsers, as: "admin_checkin" }, { model: tblUsers, as: "admin_checkout" }] })

        res.status(200).json({ message: "Success", totalRecord: allCheckin.length, data: allCheckin })
      }

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/checkin-checkout${query}`,
        method: 'get',
        status: 200,
        message: "",
      }
      log(newData)

    } catch (Error) {
      res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/checkin-checkout${query}`,
        method: 'get',
        status: 500,
        message: JSON.stringify(Error),
      }
      log(newData)

    }
  }


  static async update(req, res) {
    let query = ""
    try {
      if (req.query.lockerKey === 'true') {
        query = query + "?lockerKey=true"

        let userCheckinUpdate = await tblCheckinCheckouts.update({ lockerKey: 0 }, { where: { checkId: req.params.id } })
        let dataReturn = await tblCheckinCheckouts.findByPk(req.params.id, { include: [{ model: tblUsers, as: "member", include: [{ model: tblStaffs }, { model: tblMembers }] }] })

        if (userCheckinUpdate) res.status(200).json({ message: "Success", data: dataReturn })
        else throw "Data not found"
      } else {
        let newUserCheckinUpdate = {
          adminIdCheckout: req.user.userId,
          checkoutTime: new Date()
        }

        if (req.body.lockerKey) newUserCheckinUpdate.lockerKey = 0

        let userCheckinUpdate = await tblCheckinCheckouts.update(newUserCheckinUpdate, { where: { checkId: req.params.id } })
        let dataReturn = await tblCheckinCheckouts.findByPk(req.params.id, { include: [{ model: tblUsers, as: "member", include: [{ model: tblStaffs }, { model: tblMembers }] }] })

        if (userCheckinUpdate) res.status(200).json({ message: "Success", data: dataReturn })
        else throw "Data not found"
      }

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/checkin-checkout/${req.params.id}${query}`,
        method: 'put',
        status: 200,
        message: "",
      }
      log(newData)

    } catch (Error) {
      if (Error === "Data not found") {
        res.status(400).json({ Error })

        let newData = {
          userId: req.user.userId,
          url: `http://megafit.co.id/checkin-checkout/${req.params.id}${query}`,
          method: 'put',
          status: 400,
          message: JSON.stringify(Error)
        }
        log(newData)

      }
      else {
        res.status(500).json({ Error })

        let newData = {
          userId: req.user.userId,
          url: `http://megafit.co.id/checkin-checkout/${req.params.id}${query}`,
          method: 'put',
          status: 500,
          message: JSON.stringify(Error)
        }
        log(newData)

      }
    }
  }
}

module.exports = checkin
const { tblCheckinCheckouts, tblUsers, tblStaffs, tblMembers, tblAttendances } = require("../models")
// const Op = require('sequelize').Op

class checkin {

  static async create(req, res) {
    try {
      let dataMembers = await tblMembers.findOne({ where: { userId: req.body.userId } })
      if (dataMembers) {
        if (!dataMembers.activeDate) {
          await tblMembers.update({ activeDate: new Date() }, { where: { userId: dataMembers.userId } })
        }
      }
      // let checkinLockerkey = await tblCheckinCheckouts.findOne({ where: { userId: req.body.userId, lockerKey: { [Op.ne]: 0 } } })

      // if (checkinLockerkey) {
      //   throw "lockerkey true"
      // } else {
      let newUserCheckin = {
        userId: req.body.userId,
        adminIdCheckin: req.user.userId,
        lockerKey: req.body.lockerKey,
        checkinTime: new Date()
      }

      let userCheckin = await tblCheckinCheckouts.create(newUserCheckin)

      res.status(201).json({ message: "Success", data: userCheckin })
      // }

    } catch (Error) {
      console.log(Error)
      // if (Error === "lockerkey true") res.status(409).json({ message: "Error", info: "The locker key hasn't been returned" })
      // else res.status(500).json({ Error })
      res.status(500).json({ Error })
    }
  }


  static async findAll(req, res) {
    try {
      if (req.query.checkin === "true") {
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
        let allCheckin = await tblCheckinCheckouts.findAll({ include: [{ model: tblUsers, as: "member" }, { model: tblUsers, as: "adminCheckin" }, { model: tblUsers, as: "adminCheckout" }] })

        res.status(200).json({ message: "Success", totalRecord: allCheckin.length, data: allCheckin })
      }
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async update(req, res) {
    try {
      if (req.query.lockerKey === 'true') {
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
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }
}

module.exports = checkin
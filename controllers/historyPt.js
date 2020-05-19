const { tblClassPts, tblUsers, tblHistoryPTs, tblMembers } = require("../models")
const Op = require("sequelize").Op
const { getWeek } = require('../helpers/getNumberOfWeek')

class classPts {

  static async findAll(req, res) {
    let data
    try {
      if (req.query.hasPassed === "true") {
        let hour = Number(req.query.hour)

        if (hour < 10) hour = `0${hour}:00:00`
        else hour = `${hour}:00:00`

        data = await tblHistoryPTs.findAll({
          where: { userId: req.query.userId ? req.query.userId : req.user.userId },
          include: [{
            model: tblClassPts,
            where: {
              [Op.or]: [
                {
                  [Op.and]: [
                    { time: { [Op.lte]: hour } },
                    { date: { [Op.lte]: new Date(req.query.date).getDate() } },
                    { month: { [Op.lte]: new Date(req.query.date).getMonth() + 1 } },
                    { week: getWeek(req.query.date) },
                    { year: { [Op.lte]: new Date(req.query.date).getFullYear() } }
                  ]
                },
                {
                  [Op.and]: [
                    { date: { [Op.lt]: new Date(req.query.date).getDate() } },
                    { month: { [Op.lte]: new Date(req.query.date).getMonth() + 1 } },
                    { week: { [Op.lte]: getWeek(req.query.date) } },
                    { year: { [Op.lte]: new Date(req.query.date).getFullYear() } }
                  ]
                },
                {
                  [Op.and]: [
                    { month: { [Op.lt]: new Date(req.query.date).getMonth() + 1 } },
                    { week: { [Op.lt]: getWeek(req.query.date) } },
                    { year: { [Op.lte]: new Date(req.query.date).getFullYear() } }
                  ]
                },
                { year: { [Op.lt]: new Date(req.query.date).getFullYear() } }
              ]
            },
            include: [{ model: tblUsers }],
          }],
        })

        await data.sort(compareTime)
        await data.sort(compareDate)
        await data.sort(compareWeek)
        await data.sort(compareMonth)
        await data.sort(compareYear)

      } else if (req.query.date) { // History PT for member start/cancel
        let hour = Number(req.query.hour)
        console.log("MASUK")
        if (hour < 10) hour = `0${hour}:00:00`
        else hour = `${hour}:00:00`

        data = await tblHistoryPTs.findAll({
          where: { userId: req.user.userId },
          include: [{
            model: tblClassPts,
            where: {
              [Op.or]: [
                {
                  [Op.and]: [
                    { time: { [Op.gte]: hour } },
                    { date: { [Op.gte]: new Date(req.query.date).getDate() } },
                    { month: { [Op.gte]: new Date(req.query.date).getMonth() + 1 } },
                    { week: getWeek(req.query.date) },
                    { year: { [Op.gte]: new Date(req.query.date).getFullYear() } }
                  ]
                },
                {
                  [Op.and]: [
                    { date: { [Op.gt]: new Date(req.query.date).getDate() } },
                    { month: { [Op.gte]: new Date(req.query.date).getMonth() + 1 } },
                    { week: { [Op.gte]: getWeek(req.query.date) } },
                    { year: { [Op.gte]: new Date(req.query.date).getFullYear() } }
                  ]
                },
                {
                  [Op.and]: [
                    { week: { [Op.gt]: getWeek(req.query.date) } },
                    { month: { [Op.gte]: new Date(req.query.date).getMonth() + 1 } },
                    { year: { [Op.gte]: new Date(req.query.date).getFullYear() } }
                  ]
                },
                { year: { [Op.gt]: new Date(req.query.date).getFullYear() } }
              ]
            },
            include: [{ model: tblUsers }],
          }],
        })
        await data.sort(compareTime)
        await data.sort(compareDate)
        await data.sort(compareWeek)
        await data.sort(compareMonth)
        await data.sort(compareYear)

      } else {
        data = await tblHistoryPTs.findAll({
          where: { userId: req.query.userId ? req.query.userId : req.user.userId },
          include: [{
            model: tblClassPts,
            include: [{ model: tblUsers }],
          }],
        })

        await data.sort(compareTime)
        await data.sort(compareDate)
        await data.sort(compareWeek)
        await data.sort(compareMonth)
        await data.sort(compareYear)
      }



      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findOne(req, res) {
    try {
      let data = await tblHistoryPTs.findByPk(req.params.id, {
        include: [{
          model: tblClassPts,
          include: [{ model: tblUsers }],
        }],
      })

      if (data) res.status(200).json({ message: "Success", data })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async update(req, res) {
    try {
      let newData = {
        catatan: req.body.catatan,
        hasJoined: req.body.hasJoined
      }

      await tblHistoryPTs.update(newData, { where: { id: req.params.id } })

      let dataReturn = await tblHistoryPTs.findByPk(req.params.id, { include: [{ model: tblUsers }] })

      if (dataReturn) res.status(200).json({ message: "Success", data: dataReturn })
      else throw "Data not found"

    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async delete(req, res) {
    try {
      let cancelClass
      cancelClass = await tblHistoryPTs.destroy({ where: { id: req.params.id } })

      if (cancelClass) res.status(200).json({ message: "Success", idDeleted: req.params.id })
      else throw "Data not found"

      let member = await tblMembers.findOne({ where: { userId: req.user.userId } })
      await tblMembers.update({ ptSession: member.ptSession + 1 }, { where: { userId: req.user.userId } })

    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

}

function compareYear(a, b) {
  if (Number(a.tblClassPt.year) < Number(b.tblClassPt.year)) {
    return -1;
  }
  if (Number(a.tblClassPt.year) > Number(b.tblClassPt.year)) {
    return 1;
  }
  return 0;
}

function compareMonth(a, b) {
  if (Number(a.tblClassPt.month) < Number(b.tblClassPt.month)) {
    return -1;
  }
  if (Number(a.tblClassPt.month) > Number(b.tblClassPt.month)) {
    return 1;
  }
  return 0;
}

function compareWeek(a, b) {
  if (Number(a.tblClassPt.week) < Number(b.tblClassPt.week)) {
    return -1;
  }
  if (Number(a.tblClassPt.week) > Number(b.tblClassPt.week)) {
    return 1;
  }
  return 0;
}

function compareDate(a, b) {
  if (Number(a.tblClassPt.date) < Number(b.tblClassPt.date)) {
    return -1;
  }
  if (Number(a.tblClassPt.date) > Number(b.tblClassPt.date)) {
    return 1;
  }
  return 0;
}

function compareTime(a, b) {
  if (a.tblClassPt.time < b.tblClassPt.time) {
    return -1;
  }
  if (a.tblClassPt.time > b.tblClassPt.time) {
    return 1;
  }
  return 0;
}

module.exports = classPts
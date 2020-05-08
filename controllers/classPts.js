const { tblClassPts, tblUsers, tblHistoryPTs } = require("../models")
const Op = require("sequelize").Op
const { getWeek } = require('../helpers/getNumberOfWeek')

class classPts {

  static async create(req, res) {
    try {
      let dataReturn
      let newClass = {
        ptId: req.user.userId,
        time: req.body.time,
        date: req.body.date,
        week: req.body.week,
        month: req.body.month,
        year: req.body.year,
      }

      let createClass = await tblClassPts.create(newClass)

      dataReturn = await tblClassPts.findByPk(createClass.classPtId, { include: [{ model: tblClassPts }] })


      res.status(201).json({ message: "Success", data: dataReturn })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findAll(req, res) {
    let data
    try {
      if (req.query.all === "true") { //for option in home member //DONE
        let hour = Number(req.query.hour)

        if (hour < 10) hour = `0${hour}:00:00`
        else hour = `${hour}:00:00`

        let dataClassPt = await tblClassPts.findAll({
          where: {
            [Op.or]: [
              {
                [Op.and]: [
                  { time: { [Op.gt]: hour } },
                  { date: { [Op.gte]: Number(req.query.date.slice(8, 10)) } },
                  { week: getWeek(req.query.date) },
                  { year: { [Op.gte]: req.query.date.slice(0, 4) } }
                ]
              },
              {
                [Op.and]: [
                  { date: { [Op.gt]: Number(req.query.date.slice(8, 10)) } },
                  { week: { [Op.gte]: getWeek(req.query.date) } },
                  { year: { [Op.gte]: req.query.date.slice(0, 4) } }
                ]
              }
            ]
          },
          include: [{ model: tblUsers }],
          order: [
            ["year", "ASC"],
            ["month", "ASC"],
            ["week", "ASC"],
            ["date", "ASC"],
            ["time", "ASC"],
          ]
        })

        let dataHistoryPt = await tblHistoryPTs.findAll({
          include: [{
            model: tblClassPts,
            where: {
              [Op.or]: [
                { date: { [Op.gte]: req.query.date.slice(8, 10) }, week: getWeek(req.query.date), year: req.query.date.slice(0, 4) },
                { week: { [Op.gte]: getWeek(req.query.date) + 1 }, year: { [Op.gte]: req.query.date.slice(0, 4) } }
              ]
            },
            include: [{ model: tblUsers }],
            order: [
              ["year", "ASC"],
              ["month", "ASC"],
              ["week", "ASC"],
              ["date", "ASC"],
              ["time", "ASC"],
            ]
          }],

        })

        data = []
        await dataClassPt.forEach(async element => {
          let available = await dataHistoryPt.find(el => element.classPtId === el.classPtId)
          if (!available) data.push(element)
        });

      } else if (req.query.date) {
        let hour = Number(req.query.hour)

        if (hour < 10) hour = `0${hour}:00:00`
        else hour = `${hour}:00:00`

        data = await tblHistoryPTs.findAll({
          include: [{
            model: tblClassPts,
            where: {
              [Op.or]: [
                {
                  [Op.and]: [
                    { time: { [Op.gt]: hour } },
                    { date: { [Op.gte]: Number(req.query.date.slice(8, 10)) } },
                    { week: getWeek(req.query.date) },
                    { year: { [Op.gte]: req.query.date.slice(0, 4) } }
                  ]
                },
                {
                  [Op.and]: [
                    { date: { [Op.gt]: Number(req.query.date.slice(8, 10)) } },
                    { week: { [Op.gte]: getWeek(req.query.date) } },
                    { year: { [Op.gte]: req.query.date.slice(0, 4) } }
                  ]
                }
              ]
            },
            include: [{ model: tblUsers }],
          }],
          // order: [["id", "ASC"]]
        })
        console.log("MASUK")
        await data.sort(compareTime)
        await data.sort(compareDate)
        await data.sort(compareWeek)
        await data.sort(compareMonth)
        await data.sort(compareYear)
      } else {
        data = await tblClassPts.findAll({
          where: { week: req.query.week, year: req.query.year },
          include: [{ model: tblUsers }],
          order: [
            ["year", "ASC"],
            ["month", "ASC"],
            ["week", "ASC"],
            ["time", "ASC"],
          ]
        })
      }

      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findOne(req, res) {
    try {
      let data = await tblClassPts.findByPk(req.params.id, { include: [{ model: tblUsers }] })

      if (data) res.status(200).json({ message: "Success", data })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async update(req, res) {
    let createNewClassPt
    try {
      let newData = {
        linkZoom: req.body.linkZoom
      }

      await tblClassPts.update(newData, { where: { classPtId: req.params.id } })

      let dataReturn = await tblClassPts.findByPk(req.params.id, { include: [{ model: tblUsers }] })

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
      let deleteClass
      deleteClass = await tblClassPts.destroy({ where: { classPtId: req.params.id } })

      if (deleteClass) res.status(200).json({ message: "Success", idDeleted: req.params.id })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async joinClass(req, res) {
    try {
      let newData = {
        userId: req.user.userId,
        classPtId: req.params.id,
      }

      let joinPtClass = await tblHistoryPTs.create(newData)

      let dataReturn = await tblHistoryPTs.findByPk(joinPtClass.null)

      res.status(200).json({ message: "Success", data: dataReturn })
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async cancelJoinClass(req, res) {
    try {
      await tblHistoryPTs.destroy({ where: { id: req.params.id } })

      res.status(200).json({ message: "Success", idDeleted: req.params.id })
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
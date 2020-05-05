const { tblClasses, tblClassPts, tblUsers, tblHistoryPts } = require("../models")

class classes {

  static async create(req, res) {
    try {
      let dataReturn
      if (req.query.classPT === 'true') {
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

      } else {
        let newClass = {
          class: req.body.class,
          classDate: req.body.classDate,
          classDay: req.body.classDay,
          classTimeIn: req.body.classTimeIn,
          classTimeOut: req.body.classTimeOut,
          color: req.body.color,
          flagActive: 1
        }

        let createClass = await tblClasses.create(newClass)

        dataReturn = await tblClasses.findByPk(createClass.classId, { include: [{ model: tblClassPts }] })
      }

      res.status(201).json({ message: "Success", data: dataReturn })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findAll(req, res) {
    let data
    try {
      if (req.query.classPT === "true") { //only class PT
        // data = await tblClassPts.findAll({ where: { week: req.query.week, year: req.query.year }, include: [{ model: tblHistoryPts }] })
        data = await tblClassPts.findAll({ where: { week: req.query.week, year: req.query.year }, include: [{ model: tblUsers }] })

        console.log("data", data)
      } else {
        if (req.query.active === "true") {    //only class active
          data = await tblClasses.findAll({ where: { flagActive: 1 }, include: [{ model: tblUsers }] })
        } else {                              //all class
          data = await tblClasses.findAll({ include: [{ model: tblUsers }] })
        }
      }
      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findOne(req, res) {
    try {
      let data = await tblClasses.findByPk(req.params.id, { include: [{ model: tblUsers }] })

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
      if (req.query.classPT === "true") { //update class pt
        let newData = {
          linkZoom: req.body.linkZoom
        }

        await tblClassPts.update(newData, { where: { classPtId: req.params.id } })

        let dataReturn = await tblClassPts.findByPk(req.params.id, { include: [{ model: tblUsers }] })

        if (dataReturn) res.status(200).json({ message: "Success", data: dataReturn })
        else throw "Data not found"

      } else {
        if (req.query.edit === "class") {       //update class
          let newClass = {
            class: req.body.class,
            classDate: req.body.classDate || null,
            classDay: req.body.classDay,
            classTimeIn: req.body.classTimeIn,
            classTimeOut: req.body.classTimeOut
          }
          let updateClass = await tblClasses.update(newClass, { where: { classId: req.params.id } })

          if (updateClass) res.status(200).json({ message: 'Success', data: updateClass })
        } else if (req.query.edit === "pt") {   //update pt
          if (req.body.permanent === 'true') {  //update pt permanent
            await tblClassPts.destroy({ where: { classId: req.params.id, classDate: null } })

            let newClassPt = {
              classId: req.params.id,
              userId: req.body.userId,
            }

            createNewClassPt = await tblClassPts.create(newClassPt)

          } else {                                //update pt temporary
            let newClassPt = {
              classId: req.params.id,
              userId: req.body.userId,
              classDate: req.body.classDate
            }

            createNewClassPt = await tblClassPts.create(newClassPt)
          }

          let dataReturn = tblClasses.findByPk(req.params.id, { include: [{ model: tblUsers }] })

          if (createNewClassPt && dataReturn) res.status(200).json({ message: "Success", data: dataReturn })
          else throw "Data not found"
        }
      }

    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async delete(req, res) {
    try {
      let deleteClass
      if (req.query.classPT === 'true') {
        deleteClass = await tblClassPts.destroy({ where: { classPtId: req.params.id } })
      } else {
        deleteClass = await tblClasses.destroy({ where: { classId: req.params.id } })
      }

      if (deleteClass) res.status(200).json({ message: "Success", idDeleted: req.params.id })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

}

module.exports = classes
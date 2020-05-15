const { tblClasses, tblClassPts, tblUsers, tblHistoryPts } = require("../models")
const { log } = require('../helpers/log')

class classes {

  static async create(req, res) {
    try {
      let dataReturn
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

      res.status(201).json({ message: "Success", data: dataReturn })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes`,
        method: 'post',
        status: 201,
        message: ""
      }
      log(newData)

    } catch (Error) {
      res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes`,
        method: 'post',
        status: 500,
        message: JSON.stringify(Error)
      }
      log(newData)

    }
  }

  static async findAll(req, res) {
    let data, query = ""
    try {
      if (req.query.active === "true") {    //only class active
        query = "?active=true"
        data = await tblClasses.findAll({ where: { flagActive: 1 } })
      } else {                              //all class
        data = await tblClasses.findAll()
      }
      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes${query}`,
        method: 'get',
        status: 200,
        message: ""
      }
      log(newData)

    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes${query}`,
        method: 'get',
        status: 500,
        message: JSON.stringify(Error)
      }
      log(newData)

    }
  }

  static async findOne(req, res) {
    try {
      let data = await tblClasses.findByPk(req.params.id)

      if (data) {
        res.status(200).json({ message: "Success", data })

        let newData = {
          userId: req.user.userId,
          url: `http://megafit.co.id/classes/${req.params.id}`,
          method: 'get',
          status: 200,
          message: ""
        }
        log(newData)
      }
      else throw "Data not found"

    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") {
        res.status(400).json({ Error })

        let newData = {
          userId: req.user.userId,
          url: `http://megafit.co.id/classes/${req.params.id}`,
          method: 'get',
          status: 400,
          message: JSON.stringify(Error)
        }
        log(newData)

      }
      else {
        res.status(500).json({ Error })

        let newData = {
          userId: req.user.userId,
          url: `http://megafit.co.id/classes/${req.params.id}`,
          method: 'get',
          status: 500,
          message: JSON.stringify(Error)
        }
        log(newData)

      }
    }
  }

  static async update(req, res) {
    let createNewClassPt, query = ""
    try {
      if (req.query.edit === "class") {       //update class
        query = "?edit=class"

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
        query = "?edit=pt"
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

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes/${req.params.id}${query}`,
        method: 'put',
        status: 200,
        message: ""
      }
      log(newData)
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes/${req.params.id}${query}`,
        method: 'put',
        status: 500,
        message: JSON.stringify(Error)
      }
      log(newData)

    }
  }

  static async delete(req, res) {
    try {
      let deleteClass
      deleteClass = await tblClasses.destroy({ where: { classId: req.params.id } })

      if (deleteClass) {
        res.status(200).json({ message: "Success", idDeleted: req.params.id })

        let newData = {
          userId: req.user.userId,
          url: `http://megafit.co.id/classes/${req.params.id}`,
          method: 'delete',
          status: 200,
          message: ""
        }
        log(newData)

      }
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/classes/${req.params.id}`,
        method: 'delete',
        status: 500,
        message: JSON.stringify(Error)
      }
      log(newData)
    }
  }

}

module.exports = classes
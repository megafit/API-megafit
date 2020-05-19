const { tblPackageMemberships, tblSubCategoryMemberships } = require("../models")

class packageMembership {

  static async create(req, res) {
    try {
      let newPackageMembership = {
        packageMembershipId: req.body.packageMembershipId,
        package: req.body.package,
        subCategoryMembershipId: req.body.subCategoryMembershipId,
        price: req.body.price,
        activeMember: 0,
      }
      if (Number(req.body.categoryMembershipId) === 2) newPackageMembership.sessionPtHours = req.body.sessionPtHours
      else newPackageMembership.times = req.body.times

      let createPackageMember = await tblPackageMemberships.create(newPackageMembership)

      res.status(201).json({ message: "Success", data: createPackageMember })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findAll(req, res) {
    try {
      let data
      if (req.query.onlyActive === "true") {
        data = await tblPackageMemberships.findAll({
          include: [{
            model: tblSubCategoryMemberships,
            where: { activeFlag: 1 }
          }],
          order: [
            ["times", "ASC"],
            ["packageMembershipId", "ASC"],
            ["package", "DESC"]
          ]
        })
      } else {
        data = await tblPackageMemberships.findAll({
          include: [{
            model: tblSubCategoryMemberships,
            where: { activeFlag: 1 }
          }],
          order: [
            ["times", "ASC"],
            ["packageMembershipId", "ASC"],
            ["package", "DESC"]
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
      let data = await tblPackageMemberships.findAll({
        include: [{
          model: tblSubCategoryMemberships,
        }],
        order: [
          ["times", "ASC"],
          ["packageMembershipId", "ASC"],
          ["package", "DESC"]
        ]
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
      let newPackageMembership = {
        package: req.body.package,
        subCategoryMembershipId: req.body.subCategoryMembershipId,
        price: req.body.price
      }
      if (Number(req.body.categoryMembershipId) === 2) newPackageMembership.sessionPtHours = req.body.sessionPtHours
      else newPackageMembership.times = req.body.times

      await tblPackageMemberships.update(newPackageMembership, { where: { packageMembershipId: req.params.id } })

      let dataReturn = await tblPackageMemberships.findByPk(req.params.id, { include: [{ model: tblSubCategoryMemberships }] })

      if (updatePackageMembership) res.status(200).json({ message: "Success", data: dataReturn })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async delete(req, res) {
    try {
      let deletePackageMembership = await tblPackageMemberships.destroy({ where: { packageMembershipId: req.params.id } })

      if (deletePackageMembership) res.status(200).json({ message: "Success", idDeleted: req.params.id })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

}

module.exports = packageMembership
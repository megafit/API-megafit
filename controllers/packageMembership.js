const { tblPackageMemberships, tblCategoryMemberships } = require("../models")

class packageMembership {

  static async create(req, res) {
    try {
      let newPackageMembership = {
        packageMembershipId: req.body.packageMembershipId,
        package: req.body.package,
        categoryMembershipId: req.body.categoryMembershipId,
        times: req.body.times,
        price: req.body.price,
        startPromo: req.body.startPromo,
        endPromo: req.body.endPromo,
        access: req.body.access,
        adminFee: req.body.adminFee,
        activeMember: 0,
        flagActive: 1,
      }

      if (req.body.packageMembershipId === "2") newPackageMembership.sessionPtHours = req.body.sessionPtHours

      let createPackageMember = await tblPackageMemberships.create(newPackageMembership)

      res.status(201).json({ message: "Success", data: createPackageMember })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findAll(req, res) {
    try {
      let data = await tblPackageMemberships.findAll({
        include: [{ model: tblCategoryMemberships }],
        order: [
          ["times", "ASC"],
          ["packageMembershipId", "ASC"],
          ["package", "DESC"]
        ]
      })

      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findOne(req, res) {
    try {
      let data = await tblPackageMemberships.findByPk(req.params.id, { include: [{ model: tblCategoryMemberships }] })

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
        packageMembershipId: req.body.packageMembershipId,
        package: req.body.package,
        categoryMembershipId: req.body.categoryMembershipId,
        times: req.body.times,
        price: req.body.price,
        startPromo: req.body.startPromo,
        endPromo: req.body.endPromo,
        access: req.body.access,
        adminFee: req.body.adminFee,
      }
      
      let updatePackageMembership = await tblPackageMemberships.update(newPackageMembership, { where: { packageMembershipId: req.params.id } })
      let dataReturn = await tblPackageMemberships.findByPk(req.params.id, { include: [{ model: tblCategoryMemberships }] })

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
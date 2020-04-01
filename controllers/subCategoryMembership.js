const { tblPackageMemberships, tblSubCategoryMemberships, tblCategoryMemberships } = require("../models")

class subCategoryMembership {

  static async create(req, res) {
    try {
      if (Number(req.body.isMainPackage) === 1) {
        await tblSubCategoryMemberships.update({ isMainPackage: 0 }, { where: { categoryMembershipId: req.body.categoryMembershipId } })
      }

      let subCategoryMemberships = await tblSubCategoryMemberships.create({
        subCategoryMembership: req.body.package,
        categoryMembershipId: req.body.categoryMembershipId,
        startPromo: req.body.startPromo,
        endPromo: req.body.endPromo,
        access: req.body.access,
        adminFee: req.body.adminFee,
        activeFlag: 1,
        isMainPackage: req.body.isMainPackage
      })

      if (Number(req.body.isMainPackage) === 1) {
        await tblCategoryMemberships.update({ mainPackage: subCategoryMemberships.id }, { where: { id: req.body.categoryMembershipId } })
      }


      let newPackageMembership = {
        packageMembershipId: req.body.packageMembershipId,
        package: req.body.package,
        subCategoryMembershipId: subCategoryMemberships.id,
        price: req.body.price,
        activeMember: 0,
      }
      if (Number(req.body.categoryMembershipId) === 2) newPackageMembership.sessionPtHours = req.body.sessionPtHours
      else newPackageMembership.times = req.body.times

      await tblPackageMemberships.create(newPackageMembership)

      let grosirPrice

      if (typeof (req.body.grosirPrice) === 'object') {
        grosirPrice = req.body.grosirPrice
      } else {
        grosirPrice = JSON.parse(req.body.grosirPrice)
      }

      grosirPrice.forEach(async element => {
        let newPackageMembership = {
          packageMembershipId: element.id,
          package: req.body.package,
          subCategoryMembershipId: subCategoryMemberships.id,
          price: element.price,
          activeMember: 0,
        }
        if (Number(req.body.packageMembershipId) === 2) newPackageMembership.sessionPtHours = element.sessionPtHours
        else newPackageMembership.times = element.times

        await tblPackageMemberships.create(newPackageMembership)
      });

      res.status(201).json({ message: "Success", data: subCategoryMemberships })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findAll(req, res) {
    try {
      let data = await tblSubCategoryMemberships.findAll({
        include: [{
          model: tblPackageMemberships, order: [
            ["times", "ASC"],
            ["packageMembershipId", "ASC"],
            ["package", "DESC"]
          ]
        }]
      })

      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

  static async findOne(req, res) {
    try {
      let data = await tblSubCategoryMemberships.findByPk(req.params.id, {
        include: [{
          model: tblPackageMemberships, order: [
            ["times", "ASC"],
            ["packageMembershipId", "ASC"],
            ["package", "DESC"]
          ]
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
      if (Number(req.body.isMainPackage) === 1) {
        await tblSubCategoryMemberships.update({ isMainPackage: 0 }, { where: { categoryMembershipId: req.body.categoryMembershipId } })
      }

      //Update Sub category
      let subCategoryMemberships = await tblSubCategoryMemberships.update({
        subCategoryMembership: req.body.package,
        categoryMembershipId: req.body.categoryMembershipId,
        startPromo: req.body.startPromo,
        endPromo: req.body.endPromo,
        access: req.body.access,
        adminFee: req.body.adminFee,
        activeFlag: req.body.activeFlag,
        isMainPackage: req.body.isMainPackage,
      }, { where: { id: req.params.id } })

      if (Number(req.body.isMainPackage) === 1) {
        await tblCategoryMemberships.update({ mainPackage: subCategoryMemberships.id }, { where: { id: req.body.categoryMembershipId } })
      }

      if (req.body.packageMembershipId) {
        //Update Package 
        let newPackageMembership = {
          package: req.body.package,
          subCategoryMembershipId: req.params.id,
          price: req.body.price,
        }
        if (Number(req.body.categoryMembershipId) === 2) newPackageMembership.sessionPtHours = req.body.sessionPtHours
        else newPackageMembership.times = req.body.times

        let updatePackageMembership = await tblPackageMemberships.update(newPackageMembership, { where: { packageMembershipId: req.body.packageMembershipId } })

        let grosirPrice

        if (typeof (req.body.grosirPrice) === 'object') {
          grosirPrice = req.body.grosirPrice
        } else {
          grosirPrice = JSON.parse(req.body.grosirPrice)
        }

        //Update change Package Grosir
        grosirPrice.forEach(async element => {
          let newPackageMembership = {
            packageMembershipId: element.id,
            package: req.body.package,
            subCategoryMembershipId: req.params.id,
            price: element.price,
            activeMember: 0,
          }
          if (Number(req.body.packageMembershipId) === 2) newPackageMembership.sessionPtHours = element.sessionPtHours
          else newPackageMembership.times = element.times

          await tblPackageMemberships.upsert(newPackageMembership)
        });

        //Delete package when not available in grosirPrice
        let packageMemberships = await tblPackageMemberships.findAll({ where: { subCategoryMembershipId: req.params.id } })

        packageMemberships.forEach(async (element, index) => {
          if (index !== 0) {
            let isAvailable = grosirPrice.find(el => el.id === element.packageMembershipId)

            // console.log(element.packageMembershipId, isAvailable)
            if (!isAvailable) {
              await tblPackageMemberships.destroy({ where: { packageMembershipId: element.packageMembershipId } })
            }
          }
        })
      }

      let dataReturn = await tblSubCategoryMemberships.findByPk(req.params.id)

      if (subCategoryMemberships) res.status(200).json({ message: "Success", data: dataReturn })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

  static async delete(req, res) {
    try {
      let deletePackageMembership = await tblSubCategoryMemberships.destroy({ where: { id: req.params.id } })

      if (deletePackageMembership) res.status(200).json({ message: "Success", idDeleted: req.params.id })
      else throw "Data not found"
    } catch (Error) {
      console.log(Error)
      if (Error === "Data not found") res.status(400).json({ Error })
      else res.status(500).json({ Error })
    }
  }

}

module.exports = subCategoryMembership
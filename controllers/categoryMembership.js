const { tblCategoryMemberships, tblSubCategoryMemberships } = require("../models")

class packageMembership {

  static async findAll(req, res) {
    try {
      let data = await tblCategoryMemberships.findAll({
        include: [{
          model: tblSubCategoryMemberships,
        }]
      })

      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

}

module.exports = packageMembership
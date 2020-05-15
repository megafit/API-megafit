const { tblCategoryMemberships, tblSubCategoryMemberships } = require("../models")
const { log } = require('../helpers/log')

class packageMembership {

  static async findAll(req, res) {
    try {
      let data = await tblCategoryMemberships.findAll({
        include: [{
          model: tblSubCategoryMemberships,
        }]
      })

      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/category-memberships`,
        method: 'get',
        status: 200,
        message: "",
      }
      log(newData)

    } catch (Error) {
      res.status(500).json({ Error })

      let newData = {
        userId: req.user.userId,
        url: `http://megafit.co.id/category-memberships`,
        method: 'get',
        status: 500,
        message: JSON.stringify(Error),
      }
      log(newData)

    }
  }

}

module.exports = packageMembership
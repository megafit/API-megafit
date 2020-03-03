const { tblPositions } = require("../models")

class classes {

  static async findAll(req, res) {
    let data
    try {                              //all class
        data = await tblPositions.findAll()
      if (data) res.status(200).json({ message: "Success", totalRecord: data.length, data })
    } catch (Error) {
      console.log(Error)
      res.status(500).json({ Error })
    }
  }

}

module.exports = classes
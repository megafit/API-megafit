const { tblLogs, tblUsers } = require("../models")

module.exports = {
  async log(args) {
    try {
      let user = await tblUsers.findByPk(args.userId)

      let newData = {
        userId: args.userId,
        name: user.fullname,
        url: args.url,
        method: args.method,
        status: args.status,
        message: args.message
      }
      await tblLogs.create(newData)
    } catch (err) {
      console.log(err)
    }
  }
}
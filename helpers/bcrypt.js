const bcrypt = require('bcryptjs')

module.exports = {
  hash(password) {
    return bcrypt.hashSync(password, +process.env.SALT)
  },
  compare(password, hash) {
    return data = bcrypt.compareSync(password, hash)
  }
}
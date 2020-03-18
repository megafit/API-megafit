const { tblUsers } = require('../models')
const { verify } = require('../helpers/jwt')

function authentication(req, res, next) {

  let decoded = verify(req.headers.token);

  tblUsers.findByPk(Number(decoded.userId))
    .then(userFound => {
      if (userFound) {
        req.user = userFound
        next()
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Unauthorized' })
    })

}



module.exports = {
  authentication
}

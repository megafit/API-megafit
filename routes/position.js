const router = require("express").Router()
const positionController = require("../controllers/position")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.get('/', positionController.findAll)

module.exports = router
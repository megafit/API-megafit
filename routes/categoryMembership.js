const router = require("express").Router()
const categoryMembershipController = require("../controllers/categoryMembership")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.get('/', categoryMembershipController.findAll)

module.exports = router
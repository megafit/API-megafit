const router = require("express").Router()
const packageMembershipController = require("../controllers/packageMembership")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.post('/', packageMembershipController.create)
router.get('/', packageMembershipController.findAll)
router.get('/:id', packageMembershipController.findOne)
router.put('/:id', packageMembershipController.update)
router.delete('/:id', packageMembershipController.delete)

module.exports = router
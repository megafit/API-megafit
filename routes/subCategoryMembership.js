const router = require("express").Router()
const subCategoryMembershipController = require("../controllers/subCategoryMembership")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.post('/', subCategoryMembershipController.create)
router.get('/', subCategoryMembershipController.findAll)
router.get('/:id', subCategoryMembershipController.findOne)
router.put('/:id', subCategoryMembershipController.update)
router.delete('/:id', subCategoryMembershipController.delete)

module.exports = router
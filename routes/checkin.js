const router = require("express").Router()
const checkinController = require("../controllers/checkin")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.post('/', checkinController.create)
router.get('/', checkinController.findAll)
router.put('/:id', checkinController.update)

module.exports = router
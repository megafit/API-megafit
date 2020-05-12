const router = require("express").Router()
const historyPtController = require("../controllers/historyPt")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.get('/', historyPtController.findAll)
router.get('/:id', historyPtController.findOne)
router.put('/:id', historyPtController.update)
router.delete('/:id', historyPtController.delete)

module.exports = router
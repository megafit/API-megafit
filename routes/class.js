const router = require("express").Router()
const classController = require("../controllers/classes")
const { authentication } = require("../middleware/auth")

router.use(authentication)

router.post('/', classController.create)
router.get('/', classController.findAll)
router.get('/:id', classController.findOne)
router.put('/:id', classController.update)
router.delete('/:id', classController.delete)

module.exports = router
const router = require("express").Router()
const userController = require("../controllers/users")
const { uploadSingle } = require('../middleware/multer')
const { authentication } = require('../middleware/auth')

// router.use(authentication)

router.post('/import', authentication, uploadSingle.single('file'), userController.importExcel)
router.post('/signup', uploadSingle.single('avatar'), userController.signup)
router.post('/signin', userController.signin)
router.post('/data-member/:id', authentication, userController.updateDataMember)
router.get('/check-token', authentication, userController.checkToken)
router.get('/:id', authentication, userController.findOne)
router.put('/:id', authentication, uploadSingle.single('file'), userController.update)
router.get('/', userController.findAll)

module.exports = router
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname )
  }
})

const uploadAny = multer({
  storage: storage
})

const uploadSingle = multer({
  storage: storage
})

module.exports = { uploadAny, uploadSingle }

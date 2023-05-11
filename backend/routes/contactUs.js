const express = require('express')
const router = express.Router()
const contactUs = require('../controller/contactUsController')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    },
  })
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2048 * 2048 * 5,
    },
    fileFilter: fileFilter,
  })





router.post('/',upload.single('document'),contactUs.contactUs);
module.exports=router;
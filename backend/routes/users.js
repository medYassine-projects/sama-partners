const User = require('../models/user')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
require('dotenv').config()
//const auth= require("../middleware/auth")
const userController = require('../controller/userController')
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
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2048 * 2048 * 2,
  },
  fileFilter: fileFilter,
})



// Register
router.post('/register', upload.single('userImage'), userController.register)

// Login
router.post('/login', userController.login)

router.get(
  '/getUsers',
  userController.allowIfLoggedin,
  userController.grantAccess('updateAny', 'profile'),
  userController.getUsers
  
)

router.get(
  '/getUser/:id',
  //userController.allowIfLoggedin,
  //userController.grantAccess('updateAny', 'profile'),
  userController.getUser
)
router.patch(
  '/updateUser/:id',upload.single('userImage'),
  //userController.allowIfLoggedin,
  //userController.grantAccess('updateAny', 'profile'),
  userController.updateUser
)

router.delete(
  '/deleteUser/:id',
  //userController.allowIfLoggedin,
  //userController.grantAccess('deleteAny', 'profile'),
  userController.deleteUser
)
router.post('/forgetPassword', userController.frogotPassword)
router.post('/resetPassword/:token', userController.resetPassword)

router.patch('/addFavori/:id',userController.addFavori)
router.patch('/supprimerFavori/:id', userController.deleteFavori)
router.get('/getTotaleUsersNumber',userController.numberOfUsers)
router.get('/:id/verify/:token',userController.verifyEmail)
module.exports = router

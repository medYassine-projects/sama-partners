const express = require('express')
const router = express.Router()
const multer = require('multer')
const eventController = require('../controller/eventController')
const userController = require('../controller/userController')
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
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
    const err = new Error('Only .jpg .jpeg .png images are supported!');
      err.name = 'ExtensionError';
      return cb(err);
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2048 * 2048 * 2,
  },
  fileFilter: fileFilter,
})

router.get('/', eventController.getAll)

router.post('/createEvent',
upload.single('eventImage'),
//upload.array('galerie'),
//userController.allowIfLoggedin,
//userController.grantAccess("readAny", "profile"),
eventController.createEvent)

router.patch('/:id', 
//userController.allowIfLoggedin,
//userController.grantAccess("deleteAny", "profile"),
upload.array('galerie'),
eventController.updateEvent)
router.put('/:id', 
//userController.allowIfLoggedin,
//userController.grantAccess("deleteAny", "profile"),
upload.single('eventImage'),
eventController.updateEventWithOutGalerie)

router.get('/:id', eventController.getById)

router.delete('/:id',
//userController.allowIfLoggedin,
//userController.grantAccess("deleteAny", "profile"),
eventController.deleteById)

router.get("/byDate/byDate",eventController.getLastEvents)

router.get("/byCategory/:category",
//userController.allowIfLoggedin,
//userController.grantAccess("deleteAny", "profile"),
eventController.getByCategory, )

router.get('/byOrganizer/:organizerId', eventController.getByOrganizer)
router.get("/numberOfComingEvents/get",eventController.getLastEventsNumber)
router.get("/getAllEventsNumber/get",eventController.getAllEventsNumber)
router.put("/cancelEvent/:id",eventController.cancelEvent)
router.put("/activateEvent/:id",eventController.activateEvent)
module.exports = router

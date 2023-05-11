const express = require('express');
const router = express.Router();
const reserController = require('../controller/reservationController');
const userController = require('../controller/userController')

router.post('/createReservation/:userId',
// userController.allowIfLoggedin,
//userController.grantAccess("readOwn", "profile"),
reserController.createReservation);

router.get('/getReservations',
userController.allowIfLoggedin,
userController.grantAccess("readAny", "profile"),
reserController.getReservations);
  
router.get("/getReservation/:id",
//userController.allowIfLoggedin,
//userController.grantAccess("deleteAny", "profile"),
reserController.getReservation)
// router.put("/updateReservation/:id",reserController.updateReservation );
router.get("/get", reserController.getConnectedUserReservations)
  
router.delete("/deleteReservation/:id",
//userController.allowIfLoggedin,
//userController.grantAccess("readAny", "profile"),
reserController.deleteReservation );

router.get("/getParticipants/:eventId",userController.allowIfLoggedin,
userController.grantAccess("readAny", "profile"), reserController.getReservationParticipants)

router.get("/getReservation/byUser/:userId",reserController.getByUser)
router.get("/checkEventReservations/:eventId", reserController.checkEventReservations)
router.get("/numberOfReservationsChart",reserController.numberOfReservationsChart)


module.exports = router;
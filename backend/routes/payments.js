const paymentController = require("../controller/paymentController")
const express = require('express')
const router = express.Router()
const userController = require("../controller/userController")

router.post("/pay",paymentController.pay)

module.exports = router;
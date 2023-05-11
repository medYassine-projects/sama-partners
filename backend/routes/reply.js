const router = require("express").Router();
const {
  sendReply,
} = require("../controller/replyController");

// Route to send the message to the recipient
router.route("/:userId").post(sendReply);


module.exports = router;
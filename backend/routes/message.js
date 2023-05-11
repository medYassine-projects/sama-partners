const router = require("express").Router();
const {
  sendMessage,
  fetchMessage,
  deleteMessage,
} = require("../controller/messageController");
const userController = require('../controller/userController')

// Route to send the message to the recipient
router.route("/:userId").post(sendMessage);
// Route to retrieve all the message
router.route("/:chatId").get(fetchMessage);

router.route('/delete/:msgId').delete(deleteMessage)

module.exports = router;
const router = require("express").Router();
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
} = require("../controller/chatController");

router.route("/:userId").post(accessChat);

router.route("/group/:userId").post(createGroupChat);

router.route("/grouprename").put(renameGroup);

router.route("/groupremove").put(removeFromGroup);

router.route("/groupadd").put(addToGroup);

router.route("/:userId").get(fetchChats);
module.exports = router;
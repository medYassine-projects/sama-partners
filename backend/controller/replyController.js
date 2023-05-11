const Reply = require("../models/reply");
const User = require("../models/user");
const Message = require("../models/message");
const Chat = require("../models/chat");

// @desc		Send message
// @route		POST /message/${userId}
const sendReply = async (req, res) => {
  const { content, messageId } = req.body;
  // check for error
  if (!content || !messageId) {
    return res.status(400).json({
      error: "Bad request",
      message: "Server could not process Invalid request",
    });
  }
  console.log(messageId)
  // message object
  var newReply = {
    sender: req.params.userId,
    content: content,
    messageId: messageId,
  };
  // query DB
  try {
    var reply = await Reply.create(newReply);
    reply = await reply.populate("sender", "firs_name");
    reply = await reply.populate("messageId");
    /*reply = await Chat.populate(reply, {
      path: "messageId.chat",
      //select: "name image email",
    });*/
    /*await Message.findByIdAndUpdate(messageId, {
     replies: reply,
    });*/
    res.json(reply);
  } catch (err) {
    res.status(400);
    console.log(err)
    //throw new Error("Server could not process request");
  }
};



module.exports = { sendReply };
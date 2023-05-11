const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chat");
const Reply = require("../models/reply")
// @desc		Send message
// @route		POST /message/${userId}
const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  // check for error
  if (!content || !chatId) {
    return res.status(400).json({
      error: "Bad request",
      message: "Server could not process Invalid request",
    });
  }
  // message object
  var newMessage = {
    sender: req.params.userId,
    content: content,
    chatId: chatId,
  };
  // query DB
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name image");
    message = await message.populate("chatId");
    message = await User.populate(message, {
      path: "chatId.users",
      select: "name image email",
    });
    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (err) {
    res.status(400);
    throw new Error("Server could not process request");
  }
};

// @desc		Fetch all the messages
// @route		GET /message:chatId
const fetchMessage = async (req, res) => {
  const { chatId } = req.params;
  try {
    const allMessages = await Message.find({ chatId })
      .populate("sender", "name userImage email first_name last_name")
      .populate("chatId")

    
    for (let i = 0; i < allMessages.length; i++) {
      const msg = allMessages[i];
      const rep = await Reply.find({messageId :msg.id}).populate("sender","first_name last_name userImage")
      
     // reps.push(rep)
    //  console.log(reps)
     allMessages[i]["reps"]=rep
    }
    
   // console.log(allMessages)
    
    res.json({data:allMessages});
  } catch (err) {
    res.status(400);
    console.log(err)
    //throw new Error("Server could not process request");
  }
};

const deleteMessage = async(req,res) => {
  try {
    const messageId = req.params.msgId;
    const del = await Message.findByIdAndDelete(messageId)
    res.status(200).json({del})
  } catch (error) {
    res.status(400);
    console.log(error)
  }
  
}
module.exports = { sendMessage, fetchMessage, deleteMessage };
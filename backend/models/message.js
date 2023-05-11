const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      trim: true,
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
    reps:[{type: mongoose.Schema.Types.ObjectId,
      ref: "reply",}]
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("message", messageSchema);
module.exports = Message;
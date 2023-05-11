const mongoose = require("mongoose");

const replySchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    content: {
      type: String,
      trim: true,
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model("reply", replySchema);
module.exports = Reply;
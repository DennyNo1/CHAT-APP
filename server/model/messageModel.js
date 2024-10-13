//model负责与数据库交互，定义数据结构
const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    user: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Messages", messageSchema);

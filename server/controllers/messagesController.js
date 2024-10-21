const messageModel = require("../model/messageModel");
const addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModel.create({
      message: { text: message },
      user: [from, to],
      sender: from,
    });
    if (data) return res.json({ msg: "Message added successfully" });
    else return res.json({ msg: "Message added unsuccessfully" });
  } catch (ex) {
    next(ex);
  }
};
//获取登录用户与它的某个聊天对象的所有聊天记录
const getAllMessage = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await messageModel
      .find({
        user: { $all: [from, to] },
        //要求该数组同时包含 from 和 to
      })
      .sort({ updateAt: 1 });
    //返回对象messages是一个数组

    //遍历时，对每个元素msg进行处理，并返回一个新的对象
    //这些新对象组成新数组projectMessages
    const projectMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectMessages);
  } catch (ex) {
    next(ex);
  }
};
module.exports = {
  addMessage: addMessage,
  getAllMessage: getAllMessage,
};

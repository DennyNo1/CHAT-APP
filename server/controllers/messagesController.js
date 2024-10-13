const messageModel=require("../model/messageModel");
const addMessage = async (req, res, next) => {
    try {
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            user:[from,to],
            sender:from,
        })
        if(data) return res.json({msg:"Message added successfully"})
        else return res.json({msg:"Message added unsuccessfully"})
    }
    catch(ex){
        next(ex)
    }
};
const getAllMessage = async (req, res, next) => {};
module.exports = {
  addMessage: addMessage,
  getAllMessage: getAllMessage,
};

const {addMessage,getAllMessage}=require("../controllers/messagesController")


const router=require("express").Router();
router.post("/addmsg",addMessage)//这意味着任何访问 POST /register 的请求都会由下面的处理函数 register 处理。
router.post("/getmsg/",getAllMessage)

module.exports=router;//它将 router 对象导出，供其他文件使用。
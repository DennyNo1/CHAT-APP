const { getAllMessage } = require("../controllers/messagesController");
const {
  register,
  setAvatar,
  getAllUsers,
} = require("../controllers/userController");
const { login } = require("../controllers/userController");

const router = require("express").Router();
router.post("/register", register); //这意味着任何访问 POST /register 的请求都会由下面的处理函数 register 处理。
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getAllUsers/:id", getAllUsers);
router.get("getmsg", getAllMessage);
module.exports = router; //它将 router 对象导出，供其他文件使用。

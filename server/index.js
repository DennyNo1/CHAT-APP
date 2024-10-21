const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/userRoutes");
const app = express();
const userRoutes = require("./routes/userRoutes");
const messagesRoute = require("./routes/messagesRoute");
const socket = require("socket.io");
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoute);
mongoose
  .connect(process.env.MONGO_URL, {
    //这个对象用来配置连接 MongoDB 时的一些选项
    //useNewUrlParse:true, 已被新版本弃用
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connect successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });
const server = app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
// 创建一个 Socket.IO 实例，并将其附加到 HTTP 服务器上。
// 设置 CORS 选项，允许来自 "http://localhost:3000" 的请求，并启用凭证传递。
const io = socket(server, {
  cors: { origin: "http://localhost:3000", credentials: true }, // 注意拼写：应为 credentials 而不是 crendentials
});

// 创建一个全局的 Map 数据结构，用于存储在线用户的 userId 和 socket.id 的映射关系。
global.onlineUsers = new Map();

// 当客户端与服务器建立连接时触发的事件
io.on("connection", (socket) => {
  // 将当前连接的 socket 对象存储到全局变量中，以便其他地方可能需要访问它
  global.chatSocket = socket;

  //每次有一个用户登录，都会往这里添加相应信息
  // 监听客户端发送的 "add-user" 事件，该事件携带用户的 userId
  // 将用户的 userId 和对应的 socket.id 保存在 onlineUsers Map 中
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id); // userId: 当前用户的唯一标识符，socket.id: 此用户的 socket 连接ID
  });

  // 监听客户端发送的 "send-msg" 事件，该事件携带消息数据
  socket.on("send-msg", (data) => {
    // 从 onlineUsers Map 中获取目标用户的 socket.id
    const sendUserSocket = onlineUsers.get(data.to);

    // 如果目标用户在线，向该用户发送 "msg-recieve" 事件及其消息内容
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});

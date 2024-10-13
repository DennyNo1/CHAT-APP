const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/userRoutes")
const app = express();
const userRoutes = require("./routes/userRoutes")
const messagesRoute=require("./routes/messagesRoute")
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/messages",messagesRoute)
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

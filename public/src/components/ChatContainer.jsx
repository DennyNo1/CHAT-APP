import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute } from "../utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";

//使用useEffect和useState，来实现历史聊天记录

// 聊天内容的展示,这其实是chatinput的父组件
function ChatContainer({ currentChat, currentUser, socket }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    // 定义一个异步函数来处理数据请求
    const fetchData = async () => {
      try {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        console.log(response);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    // 调用异步函数
    fetchData();
  }, [currentUser, currentChat]);
  //发送消息
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    //把消息双方及消息本身发给后端监听的事件
    socket.current.emit("send-msg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    //更新到最新的消息列表
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  //监听发送过来的消息
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      }); //msg就是发送过来的消息
    }
  }, []);
  //再把发送过来的消息更新到消息列表
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  //setMessages((prev) => [...prev, arrivalMessage])：将当前消息列表 prev 展开（即获取原先的所有消息），并将 arrivalMessage 追加到消息列表的末尾。这样可以保持之前的消息，同时将新消息添加进来。

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);
  //在 messages（消息列表）发生变化时，自动滚动到最新的消息
  return (
    <Continer>
      <div className="chat-header">
        {" "}
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt="avatar"
            ></img>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
        </div>
        <Logout></Logout>
      </div>

      <div className="chat-message" ref={scrollRef} key={uuidv4()}>
        {/* 正常来说这个滚动是应用在最新消息的元素上，可是我现在用的子组件，所以没有效果 */}
        {messages !== undefined ? (
          <Messages
            messages={messages}
            currentChat={currentChat}
            currentUser={currentUser}
          />
        ) : (
          <p>Loading messages...</p>
        )}
      </div>
      <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
    </Continer>
  );
}
const Continer = styled.div`
  padding-top: 1rem; /* 顶部内边距为1rem */
  display: flex;
  flex-direction: column;
  .chat-message {
    height: 65vh;
  }
  justify-content: space-between; /* 确保输入框在底部 */
  background-color: #080420;

  /* 聊天头部样式 */
  .chat-header {
    display: flex; /* 使用弹性布局 */
    justify-content: space-between; /* 左右元素在容器中两端对齐 */
    align-items: center; /* 元素在垂直方向居中对齐 */
    padding: 0 2rem; /* 左右内边距为2rem */

    /* 用户详细信息区域 */
    .user-details {
      display: flex; /* 使用弹性布局 */
      align-items: center; /* 元素在垂直方向居中对齐 */
      gap: 1rem; /* 子元素之间的间距为1rem */

      /* 头像区域 */
      .avatar {
        img {
          height: 3rem; /* 头像图片高度为3rem */
        }
      }

      /* 用户名区域 */
      .username {
        h3 {
          color: white; /* 用户名的文字颜色为白色 */
        }
      }
    }
  }
`;
export default ChatContainer;

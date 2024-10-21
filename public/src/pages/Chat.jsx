import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(undefined);
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined); //我不认为把currentChat放在父组件是个好设计。我会把currentchat和currentuser都放在一起。
  //这里的currentChat本质上是contact，contact是来自子组件Contacts，也就是子传父传值。然后它又被用于ChatContainer，又是父传子。

  //为了让渲染后在进行某些操作
  const [isLoading, setIsLoading] = useState(true);
  //一般，useEffect都配置空数组，当mounted用
  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
    setIsLoading(false);
  }, []); //判断登录，未登录去重定向。登录则取用当前对象。

  useEffect(() => {
    if (currentUser) {
      // 如果 currentUser 存在，初始化 socket 连接
      socket.current = io(host); // 使用 `io(host)` 创建一个 socket 连接，并将其赋值给 socket.current
      socket.current.emit("add-user", currentUser._id); // 向服务器发送 "add-user" 事件，并传递当前用户的 ID
    }
  }, [currentUser]); // 当 currentUser 发生变化时，重新执行该副作用

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          try {
            const { data } = await axios.get(
              `${allUserRoute}/${currentUser._id}`
            );
            setContacts(data); // 设置联系人
          } catch (error) {
            console.error("Failed to fetch contacts", error);
          }
        } else {
          navigate("/setAvatar");
        }
      }
    };

    fetchContacts(); // 调用异步函数
  }, [currentUser]); // 当 currentUser 改变时，重新执行此效果

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <Container>
      <div className="container">
        {isLoading ? (
          // 渲染加载中的提示
          <div>Loading...</div>
        ) : (
          <>
            {/* 加载完成后，渲染下面的内容 */}
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />
            {currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #000000;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720 px) and(max-width:1080 px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;

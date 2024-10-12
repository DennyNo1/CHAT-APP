import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUserRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

function Chat() {
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
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        >
          {" "}
        </Contacts>
        {!isLoading && currentChat === undefined ? (
          <Welcome currentUser={currentUser}></Welcome>
        ) : (
          <ChatContainer currentChat={currentChat}></ChatContainer>
        )}

        {/* 子父组件传递 */}
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

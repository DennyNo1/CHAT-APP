import React from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({ currentChat }) {
  const handleSendMsg=(msg)=>{}
  console.log(currentChat);
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
      <div className="chat-message"><Messages></Messages></div>
      <ChatInput handleSendMsg={handleSendMsg}></ChatInput>
    </Continer>
  );
}
const Continer = styled.div`
  padding-top: 1rem; /* 顶部内边距为1rem */

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

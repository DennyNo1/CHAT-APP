import React from "react";
import styled from "styled-components";

function ChatContainer({ currentChat }) {
  console.log(currentChat);
  return (
    <Continer>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${ currentChat.avatarImage}`}
              alt="avatar"
            ></img>
            <div className="username">
              <h3>{currentChat.username}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="chat-message"></div>
      <div className="chat-input"></div>
    </Continer>
  );
}
const Continer = styled.div``;
export default ChatContainer;

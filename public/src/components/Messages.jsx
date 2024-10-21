import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 从我个人角度来看，尽可能不要用组件之间的传值，这个嵌套问题，非常的复杂。用状态管理进行替换
function Messages({ messages, currentUser, currentChat }) {
  function printMessages() {
    console.log(messages);
  }
  return (
    <Container>
      <div className="chat" onClick={printMessages}>
        {" "}
        {messages.length > 0
          ? messages.map((msg) => {
              const isSelf = msg.fromSelf; // 根据消息的来源判断
              return (
                <div className={`chatbox ${isSelf ? "right" : "left"}`}>
                  {!isSelf && (
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                        alt="avatar"
                      ></img>
                    </div>
                  )}

                  <div className="chat-content">
                    <div> {msg.message}</div>
                  </div>
                  {isSelf && (
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
                        alt="avatar"
                      ></img>
                    </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
    </Container>
  );
}
const Container = styled.div`
  .chat {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 0 2rem; /* 左右内边距为2rem */
    max-height: 65vh; /* 设置最大高度 */
    overflow-y: auto; /* 当内容超出时显示滚动条 */
    .chatbox {
      display: flex;
      flex-direction: row;
      align-items: flex-start; /* 确保内容靠上对齐 */
      gap: 1rem;
      &.left {
        justify-content: flex-start; /* 靠左对齐 */
      }
      .avatar {
        img {
          height: 3rem; /* 图片高度 */
        }
      }
      /* 动态调整右对齐 */
      &.right {
        justify-content: flex-end; /* 靠右对齐 */
      }
      .chat-content {
        display: flex;

        padding: 10px;
        box-sizing: border-box;
        overflow-y: auto;
        border-radius: 0.2rem;
        background-color: #2c2c2c;
        border: 2px solid #666666;
        color: #f0f0f0;
        width: auto;
      }
    }
  }
`;

export default Messages;

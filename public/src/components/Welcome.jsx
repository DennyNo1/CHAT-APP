import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={Robot} alt="Robot"></img>
      <h1>
        Welcome,<span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.</h3>
    </Container>
  );
}
const Container = styled.div`
/* 设置容器为flex布局，使得其子元素可以根据需要灵活排列 */
display: flex;

/* 水平居中对齐容器内的所有子元素 */
justify-content: center;

/* 垂直居中对齐容器内的所有子元素 */
align-items: center;

/* 将主轴方向设置为从上到下，即让子元素垂直堆叠 */
flex-direction: column;

/* 设置文字颜色为白色 */
color: white;

/* 图片样式 */
img {
    /* 统一图片的高度为20rem */
    height: 20rem;
}

/* 文本片段样式 */
span {
    /* 设置文本片段的颜色为特定的紫色(#4e00ff) */
    color: #4e00ff;
}`
;

export default Welcome;

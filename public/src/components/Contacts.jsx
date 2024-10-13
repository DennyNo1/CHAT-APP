import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import styled from "styled-components";
  //左侧联系人列表
export default function Contacts({ contacts, currentUser ,changeChat}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  //现在登录的用户
  const [currentSelected, setCurrentSelected] = useState(); //当前被选中的聊天对象
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);
const changeCurrentChat=(index,contact)=>{
  setCurrentSelected(index)
  changeChat(contact)
}
  return (
    <>
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo"></img>
          <h3>snappy</h3>
        </div>
        <div className="contacts">
          {/* 循环出来的聊天对象列表 */}
          {contacts.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  changeCurrentChat(index,contact);
                }}
              >
                <div className="avatar">
                  {" "}
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
        
                  ></img>
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="currentuser">
          {" "}
          <div className="avatar">
            {" "}
            <img
              src={`data:image/svg+xml;base64,${currentUserImage}`}
              alt="avatar"
            ></img>
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15%; /* 设置网格布局的行比例，分别是 10%, 75%, 15% */
overflow: hidden; /* 隐藏超出内容 */
background-color: #080420; /* 设置背景颜色为深蓝色 */

/* 品牌部分样式 */
.brand {
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  gap: 1rem; /* 子元素之间的间距 */
  justify-content: center; /* 水平居中 */
  img {
    height: 2rem; /* 图片高度 */
  }
  h3 {
    color: white; /* 设置字体颜色为白色 */
    text-transform: uppercase; /* 字母大写 */
  }
}

/* 联系人部分样式 */
.contacts {
  display: flex; /* 使用 flex 布局 */
  flex-direction: column; /* 子元素垂直排列 */
  align-items: center; /* 子元素水平居中 */
  overflow: auto; /* 允许滚动 */
  gap: 0.8rem; /* 子元素之间的间距 */
  &::-webkit-scrollbar {
    width: 0.2rem; /* 滚动条宽度 */
    &-thumb {
      background-color: #ffffff39; /* 滚动条的颜色 */
      width: 0.1rem; /* 滚动条拇指部分的宽度 */
      border-radius: 1rem; /* 滚动条的圆角 */
    }
  }

  /* 单个联系人样式 */
  .contact {
    background-color: #ffffff34; /* 背景颜色 */
    min-height: 5rem; /* 最小高度 */
    cursor: pointer; /* 鼠标悬停时变成指针样式 */
    width: 90%; /* 宽度为容器的 90% */
    border-radius: 0.2rem; /* 边框圆角 */
    padding: 0.4rem; /* 内边距 */
    display: flex; /* 使用 flex 布局 */
    gap: 1rem; /* 子元素之间的间距 */
    align-items: center; /* 垂直居中 */
    transition: 0.5s ease-in-out; /* 过渡效果 */
    
    /* 头像样式 */
    .avatar {
      img {
        height: 3rem; /* 图片高度 */
      }
    }

    /* 用户名样式 */
    .username {
      h3 {
        color: white; /* 用户名颜色 */
      }
    }
  }

  /* 选中的联系人样式 */
  .selected {
    background-color: #9a86f3; /* 选中的背景颜色 */
  }
}

/* 当前用户部分样式 */
.currentuser {
  background-color: #0d0d30; /* 背景颜色 */
  display: flex; /* 使用 flex 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  gap: 2rem; /* 子元素之间的间距 */

  /* 头像样式 */
  .avatar {
    img {
      height: 4rem; /* 图片高度 */
      max-inline-size: 100%; /* 图片最大宽度 */
    }
  }

  /* 用户名样式 */
  .username {
    h2 {
      color: white; /* 用户名颜色 */
    }
  }

  /* 响应式设计，适配 720px 到 1080px 的屏幕宽度 */
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem; /* 减小子元素之间的间距 */
    .username {
      h2 {
        font-size: 1rem; /* 调整用户名字体大小 */
      }
    }
  }
}
`;

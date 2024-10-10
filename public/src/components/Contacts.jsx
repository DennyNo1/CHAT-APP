import React, { useState, useEffect } from "react";
import Logo from "../assets/logo.svg";
import styled from "styled-components";
export default function Contacts({ contacts, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState();
  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  return (
    <>
      {currentUserImage && currentUserName} &&(
      <Container>
        <div className="brand">
          <img src={Logo} alt="logo"></img>
          <h3>snappy</h3>
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              ></div>
            );
          })}
        </div>
      </Container>
      )
    </>
  );
}
const Container = styled.div``;

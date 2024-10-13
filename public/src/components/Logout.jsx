import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {BiPowerOff} from "react-icons/bi"
//一个登出注销的按钮
export default function Logout(){
    const navigate=useNavigate()
    function onClick(){
        localStorage.clear();
        navigate("/login")
        
    }
    return <Button onClick={onClick}><BiPowerOff></BiPowerOff></Button>
    ;
}
const Button=styled.div`
display:flex;
justify-content:center;
alighn-items:center;
padding:0.5rem;
border-radius:0.5rem;
background-color:#9a86f3;
border:none;
cursor:pointer;
svg{
    font-size: 1.3rem;
    color: #ebe7ff;
}

`
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SetAvatar  from "./pages/SetAvatar";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 路由注册 */}
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/" element={<Chat></Chat>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/setAvatar" element={<SetAvatar></SetAvatar>}></Route>
        
      </Routes>
    </BrowserRouter>
  );
}

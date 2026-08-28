import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import Landing from "./Pages/Landing";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { Navbar } from "./Components/Navbar";
import My404Componenet from "./Pages/My404Componenet";
import Profile from "./Pages/Profile";
import OtherProfile from "./Pages/OtherProfile";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={< Landing />} />
      <Route path="signup" element={< Signup />} />
      <Route path="login" element={< Login />} />
      <Route path="home" element={< Home />} />
      <Route path="profile" element={< Profile />} />
      <Route path="Users/:profileId" element={< OtherProfile />} />
      <Route path="*" exact={true} element={< My404Componenet />} />
    </Routes>
  </BrowserRouter>,
);
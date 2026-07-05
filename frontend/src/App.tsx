import React from "react";
import { Routes , Route } from "react-router";
import Login from "./Components/Login";
import Register from "./Components/Register";
import DashBoard from "./Components/DashBoard";
import VerifyOtp from "./Components/VerifyOtp";

const App = () => {
  return <>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/dashboard" element={<DashBoard/>} />
      <Route path="/verify" element={<VerifyOtp/>} />
    </Routes>
  </>;
};

export default App;

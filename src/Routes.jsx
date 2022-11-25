import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";

export default function AppRoutes() {
  const { status } = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={status === "log" ? <App /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={status === "log" ? <Navigate to={"/"} /> : <Login />} />
        <Route path="/register" element={status === "reg" ? <Navigate to={"/login"} /> : <Register />} />
      </Routes>
    </>
  );
}

import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { SignUp } from "./Login/SignUp";

export const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

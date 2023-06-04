import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Login/Login";
import { SignUp } from "./Login/SignUp";
import { Text } from "@chakra-ui/layout";
import PrivateRoutes from "./PrivateRoutes";
import { AccountContext } from "./AccountContext";

export const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>Hi Home Welcomes You</Text>} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

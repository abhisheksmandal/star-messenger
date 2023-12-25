import { Route, Routes } from "react-router-dom";
import { Login } from "./Login/Login";
import { SignUp } from "./Login/SignUp";
import { Text } from "@chakra-ui/react";
import PrivateRoutes from "./PrivateRoutes";
import { useContext } from "react";
import { AccountContext } from "./AccountContext";

export const Views = () => {
  const { user } = useContext(AccountContext);
  return user.loggedIn === null ? (
    <Text>Loading...</Text>
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Text>Welcome to Home Page</Text>} />
      </Route>
    </Routes>
  );
};

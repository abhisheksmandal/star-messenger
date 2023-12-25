import {
  VStack,
  ButtonGroup,
  FormControl,
  FormLabel,
  Button,
  FormErrorMessage,
  Input,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";
import { formSchema } from "@star-messenger/common";
import { AccountContext } from "../AccountContext";

export const Login = () => {
  const { setUser } = useContext(AccountContext);
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={formSchema}
      onSubmit={(values, action) => {
        const vals = { ...values };
        // alert(JSON.stringify(values, null, 2));
        action.resetForm();
        fetch("http://localhost:4000/auth/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vals),
        })
          .catch((err) => {
            return;
          })
          .then((res) => {
            if (!res || !res.ok || res.status >= 400) {
              return;
            }
            return res.json();
          })
          .then((data) => {
            if (!data) {
              return;
            }
            setUser({ ...data });
            navigate("/home");
          });
      }}
    >
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Log In</Heading>
        <TextField
          name="username"
          placeholder="Enter username"
          autoComplete="off"
          label="Username"
        />

        <TextField
          name="password"
          placeholder="Enter password"
          autoComplete="off"
          label="Password"
          type="password"
        />

        <ButtonGroup>
          <Button colorScheme="teal" type="submit">
            Login
          </Button>
          <Button onClick={() => navigate("/register")}>Create Account</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

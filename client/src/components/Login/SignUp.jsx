import { VStack, ButtonGroup, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { Form, Formik, useFormik } from "formik";
import { ArrowBackIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string()
          .required("Username required!")
          .min(6, "Username too short!")
          .max(20, "Username too long!"),
        password: Yup.string()
          .required("Password required!")
          .min(6, "Password too short!")
          .max(20, "Password too long!"),
      })}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
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
        <Heading>Sign Up</Heading>

        <TextField
          label="Username"
          name="username"
          placeholder="Enter your username"
          autoComplete="off"
          // size="lg"
        />

        <TextField
          label="Password"
          name="password"
          placeholder="Enter your password"
          type="password"
          autoComplete="off"
          // size="lg"
        />

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Create Account
          </Button>
          <Button onClick={() => navigate("/")} leftIcon={<ArrowBackIcon />}>
            Log In
          </Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

import { VStack, ButtonGroup, Button, Heading, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AccountContext";
const { formSchema } = require("@star-messenger/common");

export const SignUp = () => {
  const { setUser } = useContext(AccountContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={formSchema}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.resetForm();
        const vals = { ...values };
        fetch("http://localhost:4000/auth/signup", {
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
            return res.json;
          })
          .then((data) => {
            if (!data) return;
            setUser({ ...data });
            if (data.status) {
              setError(data.status);
            } else if (data.loggedIn) {
              navigate("/home");
            }
            console.log(data);
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
        <Heading>Sign Up</Heading>
        <Text as="p" color="red.500">
          {error}
        </Text>
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

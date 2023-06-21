import {
  VStack,
  ButtonGroup,
  // FormLabel,
  // FormControl,
  Button,
  // FormErrorMessage,
  // Input,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Form, Formik } from "formik";

import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../AccountContext";
const { formSchema } = require("@star-messenger/common");

export const Login = () => {
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
        <Heading>Log In</Heading>

        <Text as="p" color="red.500">
          {error}
        </Text>
        {/* <FormControl
            isInvalid={formik.errors.username && formik.touched.username}
          >
            <FormLabel fontSize="lg">Username</FormLabel>
            <Input
              name="username"
              placeholder="Enter your username"
              autoComplete="off"
              size="lg"
              //   value={formik.values.username}
              //   onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              {...formik.getFieldProps("username")}
            />
            <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
          </FormControl> */}

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

        {/* <FormControl
            isInvalid={formik.errors.password && formik.touched.password}
          >
            <FormLabel fontSize="lg">Password</FormLabel>
            <Input
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              size="lg"
              type="password"
              //   value={formik.values.password}
              //   onChange={formik.handleChange}
              //   onBlur={formik.handleBlur}
              {...formik.getFieldProps("password")}
            />
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl> */}

        <ButtonGroup pt="1rem">
          <Button colorScheme="teal" type="submit">
            Log In
          </Button>
          <Button onClick={() => navigate("/signup")}>Create Accounts</Button>
        </ButtonGroup>
      </VStack>
    </Formik>
  );
};

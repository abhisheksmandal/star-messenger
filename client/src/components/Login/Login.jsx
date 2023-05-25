import {
  VStack,
  ButtonGroup,
  FormLabel,
  FormControl,
  Button,
  FormErrorMessage,
  Input,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "./TextField";
import { useNavigate } from "react-router-dom";

export const Login = () => {
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
      {/* {(formik) => ( */}
      <VStack
        as={Form}
        w={{ base: "90%", md: "500px" }}
        m="auto"
        justify="center"
        h="100vh"
        spacing="1rem"
      >
        <Heading>Log In</Heading>
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
          <Button onClick={() => navigate("/register")}>Create Accounts</Button>
        </ButtonGroup>
      </VStack>
      {/* )} */}
    </Formik>
  );
};

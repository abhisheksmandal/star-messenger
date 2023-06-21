const express = require("express");
const router = express.Router();
// const Yup = require("yup");
const validateForm = require("../controllers/validateForm");
const {
  handleLogin,
  attemptLogin,
  attemptRegister,
} = require("../controllers/authController");

router.route("/login").get(handleLogin).post(validateForm, attemptLogin);

router.post("/signup", validateForm, attemptRegister);

module.exports = router;

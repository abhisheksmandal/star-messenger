const express = require("express");
const router = express.Router();
const Yup = require("yup");
const validateForm = require("../controllers/validateForm");
const pool = require("../db");
const bcrypt = require("bcrypt");

router
  .route("/login")
  .get(async (req, res) => {
    if (req.session.user && req.session.user.username) {
      res.json({ loggedIn: true, username: req.session.username });
    } else {
      res.json({ loggedIn: false });
    }
  })
  .post(async (req, res) => {
    validateForm(req, res);
    console.log(req.session);

    const potentialLogin = await pool.query(
      "SELECT id, username, passhash FROM users u WHERE u.username=$1",
      [req.body.username]
    );

    if (potentialLogin.rowCount > 0) {
      const isSamePass = await bcrypt.compare(
        req.body.password,
        potentialLogin.rows[0].passhash
      );
      if (isSamePass) {
        req.session.user = {
          username: req.body.username,
          id: potentialLogin.rows[0].id, // Fix: use potentialLogin instead of newUserQuery
        };
        res.json({ loggedIn: true, username: req.body.username }); // Fix: use req.body.username
      } else {
        res.json({ loggedIn: false, status: "Wrong username or password!" });
      }
    } else {
      res.json({ loggedIn: false, status: "Wrong username or password!" });
    }
  });

router.post("/register", async (req, res) => {
  validateForm(req, res);

  const existingUser = await pool.query(
    "SELECT username from users WHERE username=$1",
    [req.body.username]
  );
  console.log(existingUser);

  if (existingUser.rowCount === 0) {
    // Register
    const hashedPass = await bcrypt.hash(req.body.password, 10); // Provide a salt round value (e.g., 10)
    const newUserQuery = await pool.query(
      "INSERT INTO users(username, passhash) values ($1, $2) RETURNING id, username",
      [req.body.username, hashedPass]
    );
    req.session.user = {
      username: req.body.username,
      id: newUserQuery.rows[0].id,
    };
    res.json({ loggedIn: true, username: req.body.username }); // Fix: use req.body.username
  } else {
    res.json({ loggedIn: false, status: "Username taken" });
  }
});

module.exports = router;

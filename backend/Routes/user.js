const express = require("express");
const {
  loginUser,
  signupUser,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/login", loginUser);

router.post("/signUp", signupUser);


module.exports = router;

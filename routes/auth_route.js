const express = require("express");
const User = require("../models/user_model");
const {
  signup,
  login,
  refreshToken,
} = require("../controllers/auth_controller");
const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/refreshToken", refreshToken);

module.exports = router;

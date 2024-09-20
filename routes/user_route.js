const express = require("express");
const { verifyJwtToken } = require("../helper/jwt_helper");
const { getUserById } = require("../controllers/user_controller");

const router = express.Router();

router.get("/", verifyJwtToken, getUserById);

module.exports = router;

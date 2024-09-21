const express = require("express");
const { verifyJwtToken } = require("../helper/jwt_helper");
const { getUserById } = require("../controllers/user_controller");

const router = express.Router();

router.use(verifyJwtToken);

router.get("/", getUserById);

module.exports = router;

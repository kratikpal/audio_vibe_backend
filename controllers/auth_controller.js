const User = require("../models/user_model");
const {
  generateJwtToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../helper/jwt_helper");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  validateSignup,
  validateLogin,
} = require("../validation/user_validator");

async function signup(req, res) {
  try {
    const result = await validateSignup.validateAsync(req.body);

    if (!result) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: result.email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = new User({
      firstName: result.firstName,
      email: result.email,
      password: await bcrypt.hash(result.password, saltRounds),
    });

    const newUser = await user.save();

    const token = await generateJwtToken(newUser._id);

    const refreshToken = await generateRefreshToken(newUser._id);

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return res.status(201).json({
      message: "User created successfully",
      token: token,
      refreshToken: refreshToken,
    });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({ message: error.details[0].message });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const result = await validateLogin.validateAsync(req.body);

    if (!result) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({
      email: result.email,
    });
    if (!user || !(await bcrypt.compare(result.password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await generateJwtToken(user._id);
    const refreshToken = await generateRefreshToken(user._id);
    user.refreshToken = refreshToken;

    await user.save();

    return res
      .status(200)
      .json({
        message: "Login successful",
        token: token,
        refreshToken: refreshToken,
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function refreshToken(req, res, next) {
  try {
    verifyRefreshToken(req, res, next);
    if (!req.user) {
      return res.status(401).json({ message: "Invalid token" });
    }
    console.log(req.user);
    const token = await generateJwtToken(decoded.userId);
    return res.status(200).json({ token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { signup, login, refreshToken };

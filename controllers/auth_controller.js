const User = require("../models/user_model");
const { generateJwtToken } = require("../helper/jwt_helper");
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
      firstName,
      email,
      password,
    });

    const newUser = await user.save();

    const token = await generateJwtToken(newUser._id);

    return res
      .status(201)
      .json({ message: "User created successfully", token: token });
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
      password: result.password,
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await generateJwtToken(user._id);

    return res.status(200).json({ message: "Login successful", token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { signup, login };

const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secreatKey = process.env.SECREAT_KRY;
const refreshKey = process.env.REFRESH_KRY;

function generateJwtToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, secreatKey, { expiresIn: "7d" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

function generateRefreshToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, refreshKey, { expiresIn: "1y" }, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });
}

function verifyJwtToken(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Access token is required" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, secreatKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ message: "Token has expired" });
    }

    req.user = decoded;
    next();
  });
}

function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, refreshKey);
    return decoded;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
}

module.exports = {
  generateJwtToken,
  verifyJwtToken,
  generateRefreshToken,
  verifyRefreshToken,
};

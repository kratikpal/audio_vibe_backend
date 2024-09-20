const User = require("../models/user_model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secreatKey = process.env.SECREAT_KRY;

function generateJwtToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign({ userId }, secreatKey, { expiresIn: "1d" }, (err, token) => {
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

  return new Promise((resolve, reject) => {
    jwt.verify(token, secreatKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded; // Attach the decoded payload to the request object
      next();
    });
  });
}

module.exports = { generateJwtToken, verifyJwtToken };

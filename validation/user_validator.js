const Joi = require("joi");

const validateSignup = Joi.object({
  firstName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { validateSignup, validateLogin };

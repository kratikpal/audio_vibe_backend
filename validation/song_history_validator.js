const Joi = require("joi");

const validateSongHistory = Joi.object({
  songId: Joi.string().required(),
  playedAt: Joi.date().required(),
});

module.exports = { validateSongHistory };

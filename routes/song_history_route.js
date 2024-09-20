const express = require("express");
const SongHistory = require("../models/song_history_model");
const router = express.Router();
const { verifyJwtToken } = require("../helper/jwt_helper");
const {
  addSongHistory,
  getSongHistory,
} = require("../controllers/song_history_controller");

router
  .post("/", verifyJwtToken, addSongHistory)
  .get("/", verifyJwtToken, getSongHistory);

module.exports = router;

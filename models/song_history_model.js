const mongoose = require("mongoose");

const songHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  songHistoryList: [
    {
      songId: { type: String, required: true },
      playedAt: { type: Date, required: true },
    },
  ],
});

const SongHistory = mongoose.model("SongHistory", songHistorySchema);
module.exports = SongHistory;

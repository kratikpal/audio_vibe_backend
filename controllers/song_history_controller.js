const SongHistory = require("../models/song_history_model");
const { validateSongHistory } = require("../validation/song_history_validator");

async function addSongHistory(req, res) {
  try {
    const result = await validateSongHistory.validateAsync(req.body);
    const { songId, playedAt } = result;

    // Find the user's song history
    const songHistory = await SongHistory.findOne({ userId: req.user.userId });

    if (songHistory) {
      // Check if the song is already in the user's history
      const existingSongEntry = songHistory.songHistoryList.find(
        (entry) => entry.songId === songId
      );

      if (existingSongEntry) {
        // Update the existing song entry
        existingSongEntry.playedAt = playedAt;
      } else {
        // Add a new song entry to the existing user's song history
        songHistory.songHistoryList.push({ songId, playedAt });
      }

      await songHistory.save();
      return res.status(200).json({
        message: existingSongEntry
          ? "Song history updated successfully"
          : "Song added to history successfully",
      });
    } else {
      // Create a new song history entry for the user
      const newSongHistory = new SongHistory({
        userId: req.user.userId,
        songHistoryList: [{ songId, playedAt }], // Assuming songHistoryList is the array of song entries
      });
      await newSongHistory.save();
      return res
        .status(201)
        .json({ message: "Song history created successfully" });
    }
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({ message: error.details[0].message });
    }
    return res.status(500).json({ message: error.message });
  }
}

async function getSongHistory(req, res) {
  try {
    const userId = req.user.userId;

    const songHistory = await SongHistory.findOne({ userId });
    if (!songHistory) {
      return res.status(404).json({ message: "Song history not found" });
    }

    // Sort the songHistoryList by playedAt in descending order (most recent first)
    const sortedSongHistory = songHistory.songHistoryList.sort(
      (a, b) => new Date(b.playedAt) - new Date(a.playedAt)
    );

    return res.status(200).json({ songHistory: sortedSongHistory });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { addSongHistory, getSongHistory };

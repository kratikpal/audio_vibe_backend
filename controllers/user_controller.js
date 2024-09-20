const User = require("../models/user_model");

async function getUserById(req, res) {
  try {
    const userId = req.user.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const userObject = user.toObject();
    delete userObject.password;

    res.json(userObject);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = { getUserById };

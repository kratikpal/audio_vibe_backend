const express = require("express");
require("dotenv").config();
const connectToDB = require("./connections/db_connection");
const userRoute = require("./routes/user_route");
const authRoute = require("./routes/auth_route");
const songHistoryRoute = require("./routes/song_history_route");
const { verifyJwtToken } = require("./helper/jwt_helper");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

connectToDB(MONGO_URL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/songHistory", songHistoryRoute);

app.get("/protected", verifyJwtToken, (req, res) => {
  console.log(req.user);
  res.send("This is a protected route");
});

app.get("/date", (req, res) => {
  const date = new Date().toISOString();
  res.send(date);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

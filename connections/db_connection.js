const mongoose = require("mongoose");

async function connectToDB(url) {
  await mongoose
    .connect(url)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = connectToDB;

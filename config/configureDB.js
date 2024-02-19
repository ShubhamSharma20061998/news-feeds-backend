require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const name = process.env.DB_NAME || "TOI-feeds";

//database connection
const configureDB = async () => {
  try {
    await mongoose.connect(`${url}/${name}`);
    console.log("Connected to database");
  } catch {
    console.log("Error connecting to database");
  }
};

module.exports = configureDB;

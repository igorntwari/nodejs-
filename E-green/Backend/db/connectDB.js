const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();
const dbURI = process.env.databaseURI
async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.log('DB Connected');
  } catch (error) {
    console.log("there was an error occurred", error.message);
  }
}
module.exports = connectDB;

// /backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobile: String,
  age: Number,
  height: Number,
  weight: Number,
  bloodGroup: String,
  profileImage: String, // Assuming you are storing image URLs
});

module.exports = mongoose.model("User", userSchema);

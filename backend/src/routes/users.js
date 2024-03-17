const express = require("express");
const User = require("../models/User");
const router = express.Router();

// POST route for creating a new user
router.post("/signup", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route for fetching user details by mobile number
router.get("/:mobile", async (req, res) => {
  try {
    console.log("hitting");
    console.log(req.params);
    const user = await User.findOne({ mobile: req.params.mobile });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

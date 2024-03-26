const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/user");

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const LoggedInUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    console.log("new user signed up");
    return res.status(201).json(LoggedInUser);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while signing up" });
  }
});

router.post("/login", async (req, res) => {
 const { username, password } = req.body;

 try {
    const LoggedInUser = await User.findOne({ username });
    if (!LoggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, LoggedInUser.password);
    if (isMatch) {
      return res.status(200).json(LoggedInUser);
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
 } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred while logging in" });
 }
});


module.exports = router;

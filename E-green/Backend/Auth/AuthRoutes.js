const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const LoggedInUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });
    console.log("new user signed up");
    return res.status(201).json({
      _id: LoggedInUser.id,
      name: LoggedInUser.name,
      email: LoggedInUser.email,
      token: generateToken(LoggedInUser._id),
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while signing up" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  try {
    const LoggedInUser = await User.findOne({ username });
    if (!LoggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, LoggedInUser.password);
    if (isMatch) {
      return res.status(200).json({
        Username: LoggedInUser.username,
        UserId: LoggedInUser._id,
        token: generateToken(LoggedInUser._id),
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while logging in" });
  }
});

module.exports = router;

const express = require("express");
const User = require("../Models/user");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const LoggedInUser = await User.create({ username, password, email });
  return res.status(201).json(LoggedInUser);
});

module.exports = router
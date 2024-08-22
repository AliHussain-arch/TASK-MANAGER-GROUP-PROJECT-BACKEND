const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sign up
const signup = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(
    req.body.password,
    Number(process.env.SALT_ROUNDS),
  );
  await User.create({ username: req.body.username, password: hashedPassword });
  res.status(201).json({ message: "User created" });
};

// sign in
const signin = async (req, res) => {
  console.log("Sign in");
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const payload = {
    id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({ message: "Sign in successful", token, user });
};

module.exports = { signin, signup };

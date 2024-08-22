const User = require("../models/user.model");
const bcyptjs = require("bcryptjs");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcyptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("signup ERROR Backend:", error);
  }
};

module.exports = {
  signup,
};

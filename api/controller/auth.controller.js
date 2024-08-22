const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return next(errorHandler(400, "All fields are required"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    next(errorHandler(500, `Error in the Signup backend: ${error.message}`));
  }
};
const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const isValidPassword = bcryptjs.compareSync(password, validUser.password);
    if (!isValidPassword) {
      return next(errorHandler(401, "wrong cradentials"));
    }
    const token = jwt.sign({ userId: validUser._id }, process.env.SECRET_KEY);

    const userObject = validUser.toObject();
    const { password: hashedPassword, ...rest } = userObject;

    const expiryDate = new Date(Date.now() + 36000000);
    res
      .cookie("token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(errorHandler(500, `Error in the Signiin backend: ${error.message}`));
  }
};

module.exports = {
  signup,
  signin,
};

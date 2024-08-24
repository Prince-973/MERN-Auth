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
    next(errorHandler(500, `Error in the Signin backend: ${error.message}`));
  }
};

const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const userObject = user.toObject();
      const { password: hashedPassword, ...rest } = userObject;

      const expiryDate = new Date(Date.now() + 36000000); //1 hour
      res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generetedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generetedPassword, 10);
      const newuser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newuser.save();
      const token = jwt.sign({ id: newuser._id }, process.env.SECRET_KEY);
      const userObject = newuser.toObject();
      const { password: hashedPassword2, ...rest } = userObject;

      const expiryDate = new Date(Date.now() + 3600000); //1 hour
      res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(errorHandler(500, `Error in the google backend: ${error.message}`));
  }
};
const signout = (req, res, next) => {
  res.clearCookie("token").status(200).json("Signout Success");
};

module.exports = {
  signup,
  signin,
  google,
  signout,
};

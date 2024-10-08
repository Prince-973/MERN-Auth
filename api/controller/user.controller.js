const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcryptjs = require("bcryptjs");

const test = (req, res) => {
  res.json({
    message: "api is working",
  });
};

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const userObject = updatedUser.toObject();
    const { password: hashedPassword2, ...rest } = userObject;
    res.status(200).json(rest);
  } catch (error) {
    next(errorHandler(401, `Error in updateUser backend :${error}`));
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted... ");
  } catch (error) {
    next(errorHandler(401, `Error in deleteUser backend :${error}`));
  }
};

module.exports = {
  test,
  updateUser,
  deleteUser,
};

const jwt = require("jsonwebtoken");
const errorHandler = require("./error");

const verify = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(errorHandler(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Token is not valid"));
    }
    req.user = user;
    // console.log(req.user);

    next();
  });
};

module.exports = verify;

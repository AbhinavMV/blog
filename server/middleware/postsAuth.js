const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(new ErrorResponse("Not authorized to access this data", 401));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return next(new ErrorResponse("No user exists with this id", 404));
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.google = false;
      req.user = decodedData;
    } else {
      decodedData = jwt.decode(token);
      req.google = true;
      req.user = decodedData;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.protect = (rolesArray) => async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("User doesn't have valid access token.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse("No user found with this id", 404));
    }

    req.user = user;

    const authorized = false;
    //if user has a role that is required to access any API
    rolesArray.forEach(role => {
      authorized = req.user.user_type === role;
    });

    if (!authorized) {
      return next(new ErrorResponse("Un authorized", 403));
    }

    next();
  } catch (err) {
    return next(new ErrorResponse("Authentication required!", 401));
  }
};

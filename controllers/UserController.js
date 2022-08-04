const {success} = require("../utils/successResponse");
const {validation} = require("../utils/validationResponse");
const ErrorResponse = require("../utils/errorResponse");
const UserModel = require("../models/User");
const config = require('../config/app');
const STATUS = {
  pending: 0,
  active: 1,
  blocked: 2
}

// Create and Save a new user
exports.create = async (req, res) => {
  const validationObj = {};
  if (!req.body.first_name) {
    validationObj['first_name'] = 'Firstname is required.';
  }

  if (!req.body.last_name) {
    validationObj['last_name'] = 'Lastname is required.';
  }

  if (!req.body.username) {
    validationObj['username'] = 'Username is required.';
  }

  if (!req.body.password) {
    validationObj['password'] = 'Password is required.';
  }

  if (!req.body.status) {
    validationObj['status'] = 'Status is required.';
  }

  if (!req.body.user_type) {
    validationObj['user_type'] = 'User type is required.';
  }

  res.status(422).json(validation(validationObj));

  const user = new UserModel({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    status: STATUS[req.body.status.trim().toLowerCase()],
    password: password,
    user_type: config.roles[req.body.user_type.trim().toLowerCase()]
  });

  await user.save().then(data => {
    res.status(200).json(success("User created successfully!", {}, res.statusCode));
  }).catch(err => {
    return next(new ErrorResponse(err.message || "Some error occurred while creating user", 500));
  });
};

// Retrieve all users from the database.
exports.findAll = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(success("Success", { data: users }, res.statusCode));
  } catch (error) {
    return next(new ErrorResponse(err.message, 404));
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(success("Success", { data: user }, res.statusCode));
  } catch (error) {
    return next(new ErrorResponse(err.message || "Data to update can not be empty", 404));
  }
};

// Update a user by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return next(new ErrorResponse(err.message || "Data to update can not be empty", 400));
  }

  const id = req.params.id;

  await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      return next(new ErrorResponse(err.message, 404));
    } else {
      res.status(200).json(success("User updated successfully!", {}, res.statusCode));
    }
  }).catch(err => {
    return next(new ErrorResponse(err.message, 500));
  });
};

// Delete a user with the specified id in the request
exports.destroy = async (req, res) => {
  await UserModel.findByIdAndUpdate(id, { deleted_at: Date.now() }).then(data => {
    if (!data) {
      return next(new ErrorResponse("User not found.", 404));
    } else {
      res.status(200).json(success("User deleted successfully!", {}, res.statusCode));
    }
  }).catch(err => {
    return next(new ErrorResponse("User not found.", 500));
  });
};

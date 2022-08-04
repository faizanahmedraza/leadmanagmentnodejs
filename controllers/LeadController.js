const {success} = require("../utils/successResponse");
const {validation} = require("../utils/validationResponse");
const ErrorResponse = require("../utils/errorResponse");
const LeadModel = require("../models/Lead");
const STATUS = {
  pending: 0,
  active: 1,
  blocked: 2
}

// Create and Save a new lead
exports.create = async (req, res) => {
  const validationObj = {};
  if (!req.body.name) {
    validationObj['name'] = 'Firstname is required.';
  }

  if (!req.body.description) {
    validationObj['description'] = 'Description is required.';
  }

  if (!req.body.phone) {
    validationObj['phone'] = 'Phone is required.';
  }

  if (!req.body.email) {
    validationObj['email'] = 'Email is required.';
  }

  if (!req.body.address) {
    validationObj['address'] = 'Address is required.';
  }

  if (!req.body.status) {
    validationObj['status'] = 'Status is required.';
  }

  res.status(422).json(validation(validationObj));

  const lead = new LeadModel({
    name: req.body.name,
    description: req.body.description,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    status: STATUS[req.body.status.trim().toLowerCase()],
  });

  await lead.save().then(data => {
    res.status(200).json(success("Lead created successfully!", {}, res.statusCode));
  }).catch(err => {
    return next(new ErrorResponse(err.message || "Some error occurred while creating lead", 500));
  });
};

// Retrieve all leads from the database.
exports.findAll = async (req, res) => {
  try {
    const leads = await LeadModel.find();
    res.status(200).json(success("Success", { data: leads }, res.statusCode));
  } catch (error) {
    return next(new ErrorResponse(err.message, 404));
  }
};

// Find a single Lead with an id
exports.findOne = async (req, res) => {
  try {
    const lead = await LeadModel.findById(req.params.id);
    res.status(200).json(success("Success", { data: lead }, res.statusCode));
  } catch (error) {
    return next(new ErrorResponse(err.message || "Data to update can not be empty", 404));
  }
};

// Update a lead by the id in the request
exports.update = async (req, res) => {
  if (!req.body) {
    return next(new ErrorResponse(err.message || "Data to update can not be empty", 400));
  }

  const id = req.params.id;

  await LeadModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      return next(new ErrorResponse(err.message, 404));
    } else {
      res.status(200).json(success("Lead updated successfully!", {}, res.statusCode));
    }
  }).catch(err => {
    return next(new ErrorResponse(err.message, 500));
  });
};

// Delete a lead with the specified id in the request
exports.destroy = async (req, res) => {
  await LeadModel.findByIdAndRemove(req.params.id).then(data => {
    if (!data) {
      return next(new ErrorResponse("Lead not found.", 404));
    } else {
      res.status(200).json(success("Lead deleted successfully!", {}, res.statusCode));
    }
  }).catch(err => {
    return next(new ErrorResponse("Lead not found.", 500));
  });
};

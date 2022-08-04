const mongoose = require("mongoose");
const soft_delete = require('mongoose-delete');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"]
  },
  description: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: [true, "email field is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  address: {
    type: String,
    default: null
  },
  status: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

LeadSchema.plugin(soft_delete, { deletedAt : true });

const User = mongoose.model("Lead", LeadSchema);

module.exports = User;

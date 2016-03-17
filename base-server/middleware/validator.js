'use strict'

var paperwork = require('paperwork');
var validator = {
  createUser: {
    firstname: /[a-zA-Z]+/,
    lastname: /[a-zA-Z]+/,
    email: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    contact: String,
    role: [String],
    username: String,
    hashedPassword: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
  }
};

module.exports = validator;

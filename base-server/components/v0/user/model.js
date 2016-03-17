'use strict'

var mongoose = require('mongoose');
var passwordHash = require('password-hash');
/**
  import project modules
*/
var commonModel = require('./baseModels');


var users = commonModel.extendBase();
users.add({
  firstname: {
    type: String,
    match: /[a-zA-Z]+/,
    required: true
  },
  lastname: {
    type: String,
    match: /[a-zA-Z]+/,
    required: true
  },
  email: {
    type: String,
    unique: true,
    match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
    required: true
  },
  contact: {
    type: String
  },
  role: {
    type: Object
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
  Encrypt password function for User model
  @param {String} -- password
  @return {String} -- encrypted password string
*/
users.methods.encryptPassword = function(password) {
  return passwordHash.generate(password);
};

/**
  getter for userId
*/
users.virtual('userId')
  .get(function() {
    return this.id;
  });

/**
  getter and setter for password
*/
users.virtual('password')
  .set(function(password) {
    this._plainPassword = password;
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._plainPassword;
  });

/**
  Check password function for User model
  @param {String} -- password
  @return {Boolean} -- if password is verified
*/
users.methods.checkPassword = function(password) {
  return passwordHash.verify(password, this.hashedPassword);
};

/**
  Create User Model
  @type {Object}
*/
var usersModel = mongoose.model('users', users);


/**
  Group model schema Object
  @type {Object}
  @property {String}  name.
  @property {String}  description.
  @property {Array} permissions - array of permissions
*/
var groups = commonModel.extendBase();
groups.add({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String
  },
  permissions: [{
    id: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    }
  }]
});


/**
  Create Group Model
  @type {Object}
*/
var groupsModel = mongoose.model('groups', groups);

/**
  Permission model schema Object
  @type {Object}
  @property {String}  name.
  @property {String}  description.
  @property {String}  type.
*/
var permissions = commonModel.extendBase();
permissions.add({
  name: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String
  }
});

/**
  Create Permission Model
  @type {Object}
*/
var permissionsModel = mongoose.model('permissions', permissions);

/** Create the model for users, groups, permissions and
    expose it to app
  @type {object}
  @property {object}  users.
  @property {object}  groups.
  @property {object}  permissions.
*/
module.exports = {
  users: usersModel,
  groups: groupsModel,
  permissions: permissionsModel,
};

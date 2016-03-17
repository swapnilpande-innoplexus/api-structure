'use strict';

var _ = require("underscore");
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

/**
  Base model schema Object
  @type {object}
  @property {string}  createdOn.
  @property {string}  updatedOn.
  @property {string}  deletedOn.
*/

var base = {
  status:{type: Boolean, default:true},
  createdOn: { type: Date},
  deletedOn: { type: Date, default: null},
  updatedOn: { type: Date, default: Date.now},
};

/**
  Base model schema Object
  @type {object}
  @property {string}  createdOn.
  @property {string}  updatedOn.
  @property {string}  deletedOn.
*/
var extendBase = function(){
    var baseModel = new mongoose.Schema(base);
    baseModel.plugin(uniqueValidator);
    return baseModel;
};


/** expose  extend base to app
  @type {object}
  @property {object}  extendBase.
  @property {object}  groups.
  @property {object}  permissions.
*/
module.exports = {
  extendBase: extendBase
};
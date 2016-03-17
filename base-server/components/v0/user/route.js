'use strict'

var express = require('express');

var userController = require('./controller');
var userRouter = express.Router();
var paperwork = require('paperwork');
var validator = require('../../middleware/validator').validator;
userRouter.post('/',paperwork.accept(validator.createUser), userController.createUser);

module.exports = userRouter;

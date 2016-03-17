'use strict'

var express = require('express');

var userController = require('./controller');
var userRouter = express.Router();

userRouter.post('/', userController.createUser);

module.exports = userRouter;

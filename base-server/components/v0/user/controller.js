'use strict'
var User = require('./model').users;

var userController = {};

userController.createUser = function(req, res, next) {
  console.log("Inside Create user ");
  var user = new User(req.body);

  user.permissions = [{
    id: "1",
    name: 'createUser',
    description: 'user creation.',
    type: 'API'
  }];
  user.groups = [{
    id: "1",
    name: 'defaultUser',
    description: 'Default user with default permissions.',
  }];
  user.createdOn = new Date();
  user.deleteOn = null;
  console.log(JSON.stringify(user));
  user.save(function(err, result) {
    console.log(result);
    if (err) {
      console.log(JSON.stringify(err))
      if (err.name === 'ValidationError') {
        res.statusCode = 400;
        res.send({
          error: 'Validation error',
          details: validationErrorHelper(err)
        });
      } else if (err.code === '11000') {
        res.statusCode = 500;
        res.send({
          error: 'Email Id already exists.'
        });
      }
    } else {
      res.statusCode = 201;
      res.send({
        message: "user is created",
        id: user.id
      });
    }
  });
};

module.exports = userController;

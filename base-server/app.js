
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressValidator = require('express-validator');
var logger = require('morgan');
var mongoose = require('mongoose');
var elasticsearch = require('elasticsearch');
var config = require('./config/config')[process.env.NODE_ENV || 'development'];


var app = express();
var router = express.Router();
mongoose.connect(config.MONGODB_URI);

app.use(cors());
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(expressValidator());
app.use(cookieParser());
app.use(passport.initialize());

require('./components/route')(app);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message, // custom Expection
    error: err
  });
});

module.exports = app;

'use strict'

var user = require('./v0/user/route');

var rootRoutes = function(app) {

  app.get('/', function(req, res) {
    res.send('Welcome');
  });
  app.use('/api/users', user);
}

module.exports = rootRoutes;

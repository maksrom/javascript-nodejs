'use strict';

/**
 * Module dependencies.
 */
var log                 = require('../lib/log')(module);
var config              = require('../config/');

// End of dependencies.


module.exports = function () {
  this
    .get('/test', function(req, res){
      res.send('hello world');
    })
    .use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
};
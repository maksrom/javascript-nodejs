// Any files in this directory will be `require()`'ed when the application
// starts, and the exported function will be invoked with a `this` context of
// the application itself.  Initializers are used to connect to databases and
// message queues, and configure sub-systems such as authentication.

// Async initializers are declared by exporting `function(done) { /*...*/ }`.
// `done` is a callback which must be invoked when the initializer is
// finished.  Initializers are invoked sequentially, ensuring that the
// previous one has completed before the next one executes.

'use strict';
 
/**
 * Module dependencies.
 */
var config              = require('config');
var log                 = require('lib/log')(module);
var HttpError = require('error').HttpError;
var errorhandler = require('errorhandler');

// end of dependencies.


module.exports = function () {


  this.use(function(req, res, next) {
    next(404);
  });

  this.use(function(err, req, res, next) {
    if (typeof err == 'number') {
      err = new HttpError(err);
    }

    if (err.name == 'CastError') {
      // malformed or absent mongoose params
      if (process.env.NODE_ENV == 'development') {
        log.error(err);
      }
      res.sendHttpError(new HttpError(400));
      return;
    }

    if (err instanceof HttpError) {
      res.sendHttpError(err);
    } else {
      // if error is "call stack too long", then log.error(err) is not verbose
      // so I cast it to string
      log.error(err.toString());

      if (process.env.NODE_ENV == 'development') {
        errorhandler()(err, req, res, next);
      } else {
        res.sendHttpError(new HttpError(500));
      }
    }
  });

};
'use strict';

var config = require('config');
var log = require('lib/log')(module);
var HttpError = require('error').HttpError;

module.exports = function(app) {

  /* TODO: rewrite this express-style error handling in koa
@see https://github.com/koajs/koa/wiki/Error-Handling

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
*/
};
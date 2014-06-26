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
var config = require('config');
var log = require('lib/log')(module);

var express = require('express');
var cwd = process.cwd();
var favicon = require('static-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sessionStore = require('lib/sessionStore');
var mongoose = require('mongoose');
var sendHttpError = require('lib/middleware/sendHttpError');
// end of dependencies.


module.exports = function() {
  this.set('views', cwd + '/views');
  this.set('view engine', 'jade');
  this.use(express.static(cwd + '/www'));
  this.use(favicon());
  this.use(morgan({
    immediate: true,
    format: config.log.format
  }));
  this.use(bodyParser());
  this.use(cookieParser());
  this.use(sendHttpError);
  this.use(session({
    secret: config.session.secret,
    key: config.session.key,
    cookie: config.session.cookie,
    store: sessionStore,
    saveUninitialized: false
  }));
};
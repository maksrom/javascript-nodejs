'use strict';

/**
 * Module dependencies.
 */
var log = require('lib/log')(module);
var config = require('config');
var express = require('express');
var router = express.Router();

// End of dependencies.

module.exports = function() {
  this
    .get('/', function(req, res) {
      res.send('respond with a resource');
    })
    .get('/asd', function(req, res) {
      res.send('respond with a resource');
    });
};
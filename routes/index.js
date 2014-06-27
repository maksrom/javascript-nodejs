'use strict';

var log = require('lib/log')(module);
var config = require('config');

module.exports = function(app) {
  app.get('/', require('controllers/frontpage').get);
};
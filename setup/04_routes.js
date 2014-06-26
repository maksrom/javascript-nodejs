'use strict';

/**
 * Module dependencies.
 */
var config              = require('config');
var log                 = require('lib/log')(module);

// end of dependencies.


module.exports = function () {
  require('routes/').call(this);
};
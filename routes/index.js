'use strict';

/**
 * Module dependencies.
 */
var log = require('lib/log')(module);
var config = require('config');
var router = express.Router();

// End of dependencies.


module.exports = function() {

  router.get('/', function(req, res) {
    res.send('respond with a resource');
  });
};
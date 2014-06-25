
if (!process.env.NODE_ENV) {
  throw new Error("NODE_ENV environment variable is required");
}


var base = require('./base')();
var env = require('./env/' + process.env.NODE_ENV)(base);

module.exports = env;

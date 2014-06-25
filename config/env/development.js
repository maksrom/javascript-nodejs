var _ = require('lodash');

module.exports = function(config) {
  return _.merge(config, {
    "log": {
      "format": "dev"
    }
  });
};
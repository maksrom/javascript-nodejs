var _ = require('lodash');

module.exports = function(config) {
  return _.merge(config, {
    "mongoose": {
      "uri": "mongodb://localhost/javascript_test"
    }
  });
};

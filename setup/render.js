'use strict';

var views = require('koa-views');
var config = require('config');

module.exports = function render(app) {
  app.use(views(config.template.path, config.template.options));
};


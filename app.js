"use strict";

const log = require('lib/log')(module);
const config = require('config');

const koa = require('koa');

require('models');

const app = koa();

require('setup/static')(app);

require('setup/errors')(app);

require('setup/logger')(app);
require('setup/bodyParser')(app);
require('setup/session')(app);
require('setup/render')(app);
require('setup/router')(app);

require('./routes')(app);

module.exports = app;
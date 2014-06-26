'use strict';

/**
 * Module dependencies.
 */
var log = require('lib/log')(module);
var config = require('config');

var express = require('express');
var bootable = require('bootable');

// End of dependencies.


var app = module.exports = bootable(express());


/**
 * syntax: bootable.initializers('folder', context);
 */
app.phase(bootable.initializers('./models', app));
app.phase(bootable.initializers('./setup', app));
app.phase(bootable.routes('routes/', app));


module.exports = app;
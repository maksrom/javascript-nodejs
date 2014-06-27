const mongoose = require('lib/mongoose');
const session = require('koa-sess');
const mongooseStore = require('koa-session-mongoose');
const config = require('config');

module.exports = function(app) {

  app.use(session({
    store: mongooseStore.create({
      model: 'Session'
    }),
    key: 'sid'
  }));
  app.keys = config.session.keys;  // needed for cookie-signing


};
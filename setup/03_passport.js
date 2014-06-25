// Any files in this directory will be `require()`'ed when the application
// starts, and the exported function will be invoked with a `this` context of
// the application itself.  Initializers are used to connect to databases and
// message queues, and configure sub-systems such as authentication.

// Async initializers are declared by exporting `function(done) { /*...*/ }`.
// `done` is a callback which must be invoked when the initializer is
// finished.  Initializers are invoked sequentially, ensuring that the
// previous one has completed before the next one executes.


'use strict';

/**
 * Module dependencies.
 */
var config              = require('config');
var log                 = require('lib/log')(module);
// var passport            = require('passport');
// var LocalStrategy       = require('passport-local').Strategy;
// var mongoose            = require('mongoose');
// var User                = mongoose.model('User');
// var pass                = require('pwd');

// end of dependencies.


module.exports = function () {
  /**
   * E X A M P L E
   */

  // passport.use(new LocalStrategy({
  //   usernameField: 'email',
  //   passwordField: 'password'
  // }, function (email, password, done) {
  //   User.findOne({ email : email}).exec(function (err, user) {
  //     err
  //       ? done(err)
  //       : user && user.salt
  //         ? pass.hash(password, user.salt, function (err, hash) {
  //             err
  //               ? done(err)
  //               : user.hash === hash
  //                 ? done(null, user)
  //                 : done(null, false, { message: 'Incorrect credentials.' });
  //           })
  //         : done(null, false,  { message: 'Incorrect password.' });
  //   });
  // }));

  // passport.serializeUser(function (user, done) {
  //   done(null, user.id);
  // });

  // passport.deserializeUser(function (id, done) {
  //   User.findById(id, function (err, user) {
  //     err
  //       ? done(err)
  //       : done(null, user);
  //   });
  // });

};
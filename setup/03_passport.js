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


// MOVE HERE FROM lib/passport.js?
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
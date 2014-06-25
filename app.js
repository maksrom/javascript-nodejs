var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('static-favicon');
var morgan = require('morgan');
var log = require('lib/log')(module);
var mongoose = require('lib/mongoose');
var HttpError = require('lib/error').HttpError;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(morgan({
  immediate: true,
  format: config.log.format
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'www')));

var sessionStore = require('lib/sessionStore');

app.use(session({
  secret: config.session.secret,
  key: config.session.key,
  cookie: config.session.cookie,
  store: sessionStore
}));



app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

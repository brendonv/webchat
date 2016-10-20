var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var mongoose   = require('mongoose');

var PORT = process.env.PORT || 5000;
var ENV = process.env.NODE_ENV;
var config = require('./config/config');

mongoose.connect(config.mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (cb) {
  console.log("successfully opened");
});


/**
 * Models
 */

require('./models/user');
require('./models/message');

var User = mongoose.model('User');

/**
 * Routes
 */

var users = require('./routes/users');
var messages = require('./routes/messages');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'pug');

app.use(helmet());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/signup', users.signup);
app.post('/logout', users.logout);

app.get('/messages/:userId', messages.index);
  app.post('/messages', messages.create);
app.post('/messages/:userId', messages.create);

app.param('userId', function(req, res, next, id) {
  if (!id) {
    req.user = null;
    return next();
  }
  User.findById(id, function(error, user) {
    if (error || !user) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'DEV') {
  app.use(function(err, req, res, next) {
    console.log(err);
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


var server = app.listen(PORT, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at', host, port);
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');

// User setup
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Sessions and Passport init
app.use(require('express-session')({
  secret: "keyboard cate",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// Configure passport
// passport.use(new LocalStrategy({
//     email: 'email',
//     password: 'password'
//   },
//   function(username, password, done) {
//     //check if user is authenticated, in my case the user variable
//     if (err) { return done(err); }
//     if (!user) { return done(null, false); }
//     if (!user.authenticate(password)) { return done(null, false); }
//     if (!user.active) { return done(null, false); }
//     return done(null, user);
//   }
// ));

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password'
// },
//   function(username, password, done) {
//     UserSchema.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         console.log('you fucked up the username')
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (user.password != password) {
//         console.log('you fucked up')
//         return done(null, false, { message: 'Invalid password' });
//       }
//
//       return done(null, user);
//     });
//   }
// ));
var User = require('./models/user.js')
passport.use(new LocalStrategy(User.authenticate()));

//passport.use(new LocalStrategy(UserSchema.authenticate()))
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to Mongoose
mongoose.connect('mongodb://localhost/users')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

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

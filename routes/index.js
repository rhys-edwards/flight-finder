var express = require('express')
var passport = require('passport')
var User = require('../models/user.js')
var router = express.Router()

// All the things to store data
var mongodb = require('mongodb')
var mongoose = require('mongoose')

// The API call to flights
var api = require('../api')

/* GET home page. */
// We send user data to the view
router.get('/', function(req, res) {
  res.render('index', {
    user: req.user
  })
})

// Redirect people to sign up
router.get('/register', function(req, res) {
  res.render('register', {})
})

// Register a user to the DB
router.post('/register', function(req, res, next){
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let username = req.body.email
  //let password = req.body.password
  let homeAirport = req.body.homeAirport

  UserSchema.register(new UserSchema ({
    firstName: firstName,
    lastName: lastName,
    username: username,
    homeAirport: homeAirport
  }),
    req.body.password, function(err, user) {
      if (err) {
        console.log(err)
        return res.render('register', {
          user: user
        })
      }
      // both of these works
      passport.authenticate('local', { failureRedirect: '/' }),
      function(req, res, next) {
        res.redirect('/');
      }

      // passport.authenticate('local')(req, res, function() {
      //   req.session.save(function (err) {
      //     if (err) {
      //       return next(err)
      //     }
      //   res.redirect('/')
      //})
    //})
  })
})

// Send to the login page
router.get('/login', function(req, res, next) {
  res.render('login', {
    user: req.user
  })
})

// Log in the user and authenticate
// router.post('/login', passport.authenticate('local'), function(username, password, err, done) {
//     //check if user is authenticated, in my case the user variable
//     if (err) { return done(err); }
//     if (!user) { return done(null, false); }
//     if (!user.authenticate(password)) { return done(null, false); }
//     if (!user.active) { return done(null, false); }
//     return done(null, user);
//     res.redirect('/')
// })

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

// Logout the user
router.get('/logout', function(req, res, next) {
  req.logout()
  res.redirect('/')
})

// Test the connection
router.get('/ping', function(req, res, next) {
  res.status(200).send("pong")
})

// Hit the API
// We need to work out how this will work with real data
// router.get('/', function(req, res, next) {
//   api.apiGet(function (data) {
//     res.render('index', {
//       data: data
//     })
//   })
// })

// Create a new user
// router.post('/signup', function(req, res, next) {
//
//   // Get user information from the form
//   let firstName = req.body.firstName
//   let lastName = req.body.lastName
//   let email = req.body.email
//   let password = req.body.password
//   let homeAirport = req.body.homeAirport
//
//   // This works
//   console.log(firstName, lastName, email, password, homeAirport)
//
//   // Create new User object for DB, fuck it. We're using mongo.
//   var data = new User ({
//     firstName: firstName,
//     lastName: lastName,
//     email: email,
//     password: password,
//     homeAirport: homeAirport
//   })
//
//   console.log(data)
//
//   // Store the new User into the DB
//   User.createUser(data, function(err, user) {
//     if (err) throw err
//     console.log(user)
//   })
// })


module.exports = router

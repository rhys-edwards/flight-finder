var express = require('express')
var passport = require('passport')
var _ = require('lodash')
var jsonfile = require('jsonfile')
var file = './models/airports.json'
var User = require('../models/user.js')
var airports = require('airport-codes')
var router = express.Router()


// All the things to store data
var mongodb = require('mongodb')
var mongoose = require('mongoose')

// The API call to flights
var api = require('../api')

/* GET home page. */
// We send user data to the view
router.get('/', function(req, res) {
  res.render('index', {user: req.user});
});

router.get('/register', function(req, res) {
  res.render('register', {});
});

// Register a user to the DB
router.post('/register', function(req, res, next){
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let username = req.body.username
  let homeAirport = req.body.homeAirport

  // We need to run through the JSON store with async. Use a promise.
  var getIATA = new Promise(function(resolve, reject) {

    // Read the JSON file, use lodash's find method to match the location against an IATA code
    jsonfile.readFile(file, function(err, obj) {
      var iataCode = _.result(_.find(obj, function (obj1) {
        return obj1.name === homeAirport
      }), 'iata')

      // Resolve the promise.
      // Add some sort of error handling later
      resolve(iataCode)

    })
  })

  // Call the promise to get the IATA code ready
  getIATA.then(function(fromResolve) {

    User.register(new User ({
      firstName: firstName,
      lastName: lastName,
      username: username,
      homeAirport: fromResolve
    }),
    req.body.password, function(err, user) {
      if (err) {
        console.log(err)
        return res.render('register', {
          user: user
        })
      }
      else {
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        })
      }
    })
  })
})

router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

//Post Login
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

// Add a destination to the DB
router.post('/add', function(req, res, next) {
  let id = (req.user.id)

  // Find our logged in user
  User.findById(id , function (err, user) {
    if (err) return handleError(err)

    // Grab the location from the form
    let location = req.body.destination

    // We need to run through the JSON store with async. Use a promise.
    var getIATA = new Promise(function(resolve, reject) {

      // Read the JSON file, use lodash's find method to match the location against an IATA code
      jsonfile.readFile(file, function(err, obj) {
        var iataCode = _.result(_.find(obj, function (obj1) {
          return obj1.name === location
        }), 'iata')

        // Resolve the promise.
        // Add some sort of error handling later
        resolve(iataCode)

      })
    })

    // Call the promise to get the IATA code ready
    getIATA.then(function(fromResolve) {
      console.log(req.body.day)
      // Push the new data into the DB
      user.destinations.push({
        airport: fromResolve,
        daysAway: req.body.daysAway,
        month: req.body.month,
        day: req.body.day
      })

      var subdoc = user.destinations[0]
      subdoc.isNew

      user.save(function (err) {
        if (err) return handleError (err)
      })
    })

    res.redirect('/')

  })
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

module.exports = router

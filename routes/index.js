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
  //let password = req.body.password
  let homeAirport = req.body.homeAirport

  console.log(airports.findWhere({ name: homeAirport }).get('iata'));
//=> Los Angeles Intl

  User.register(new User ({
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
    else {
      passport.authenticate('local')(req, res, function () {
          res.redirect('/');
      })
    }
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

  User.findById(id , function (err, user) {
    if (err) return handleError(err)

    //////////////////////////////////////////////

    let location = req.body.destination
    console.log(location)
    // WORKING.. Sort of
    // Read airports.json
    // jsonfile.readFile(file, function(err, obj) {
    //   console.log('1.' + ' ' + location)
    //
    //   var iataCode = _.result(_.find(obj, function (obj1) {
    //     return obj1.name === location
    //   }), 'iata')
    //   console.log('2.' + ' ' + iataCode)
    // })

    //////////////////////////////////////////////

    // CURRENTLY NOT WORKING
    var newCode = function getIATA (location) {

      jsonfile.readFile(file, function(err, obj) {
        // This works
        console.log('1.' + ' ' + location)

        var iataCode = _.result(_.find(obj, function (obj1) {
          return obj1.name === location
        }), 'iata')
        // This works as well
        console.log('2.' + ' ' + iataCode)
      })
    }

    // This does not
    newCode(location);
    console.log('3.' + ' ' + newCode)

    //////////////////////////////////////////////
    user.destinations.push({
      airport: req.body.destination,
      month: req.body.month
    })

    var subdoc = user.destinations[0]
    subdoc.isNew

    user.save(function (err) {
      if (err) return handleError (err)
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

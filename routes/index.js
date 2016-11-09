var express = require('express')
var router = express.Router()

// All the things to store data
const User = require('../models/user.model')
const mongodb = required('mongodb')
const mongoose = require('mongoose')

var api = require('../api')

/* GET home page. */
// We send all the data to the view

// Hit the API
// We need to work out how this will work with real data
router.get('/', function(req, res, next) {
  api.apiGet(function (data) {
    res.render('index', {
      data: data
    })
  })
})

// Create a new user
router.post('/signup', function(req, res, next) {

  // Get user information from the form
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let email = req.body.email
  let password = req.body.password
  let homeAirport = req.body.homeAirport

  // This works
  console.log(firstName, lastName, email, password, homeAirport)

  // Create new User object for DB, fuck it. We're using mongo.
  var data = new User ({
    firstName: firstName,
    lastnName: lastName,
    email: email,
    password: password,
    homeAirport: homeAirport
  })

  // Store the new User into the DB
  User.createUser(data, function(err, user) {
    if (err) throw err
    console.log(user)
  })
})


module.exports = router

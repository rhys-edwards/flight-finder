// Import Mongoose and connect to the DB
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  passportLocalMongoose = require('passport-local-mongoose');

var destinationSchema = new Schema({
  airport: String,
  month: String
})

// Define the scheme
var User = new Schema ({
  firstName: {
    type: String,
    index: true
  },
  lastName: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  homeAirport: {
    type: String,
    index: true
  },
  destinations: [destinationSchema]
})


User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)

// DONT FORGET THIS IS HALF DONE.
// UID
//   firstName
//   lastName
//   email
//   password
//   homeAirports
//     XXXXX
//   cities
//     city, dates
//   averageNights

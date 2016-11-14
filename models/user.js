// Import Mongoose and connect to the DB
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/users')
const passportLocalMongoose = require('passport-local-mongoose')

// Establish connection to the DB
const db = mongoose.connection

// Define the scheme
const UserSchema = mongoose.Schema ({
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
  password: {
    type: String,
    index: true
  },
  homeAirport: {
    type: String,
    index: true
  }
})

UserSchema.plugin(passportLocalMongoose)

// Export it to the app
module.exports = mongoose.model('user', UserSchema)

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

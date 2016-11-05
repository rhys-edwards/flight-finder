var express = require('express')
var router = express.Router()
const $ = require('cheerio')
const request = require('request-promise')

var apiCaller = function (cb) {
  const options = {
    method: 'POST',
    uri: 'https://www.googleapis.com/qpxExpress/v1/trips/search?&key=AIzaSyBp8BcIBr8IHKgi65Fw-CR06AxbnrwOp0I',
    body: {
    "request": {
      "passengers": {
        "adultCount": "1"
      },
      "slice": [
        {
          "origin": "LHR",
          "destination": "AMS",
          "date": "2017-02-11"
        }
      ],
      "solutions": "5"
    }
  },
    json: true
  }

  request(options)
    .then(function (response) {
      //console.log(response.trips.tripOption)
      cb(response)
    })
    .catch(function (err) {
      console.log(err)
    })
}

// Call the api with a call back
var apiGet = function(cb) {
  return apiCaller(cb);
};

// Export the functions for external access
module.exports = {
  apiGet: apiGet
};

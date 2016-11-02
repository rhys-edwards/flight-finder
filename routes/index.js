var express = require('express')
var router = express.Router()
const $ = require('cheerio')
const request = require('request-promise')

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
        "origin": "SFO",
        "destination": "LAX",
        "date": "2017-06-19"
      }
    ],
    "solutions": "5"
  }
},
  json: true
}

request(options)
  .then(function (response) {
    console.log(response.trips.tripOption[0].saleTotal)
    console.log(response.trips.tripOption[1].saleTotal)
    console.log(response.trips.tripOption[2].saleTotal)
    console.log(response.trips.tripOption[3].saleTotal)
    console.log(response.trips.tripOption[4].saleTotal)
  })
  .catch(function (err) {
    console.log(err)
  })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router

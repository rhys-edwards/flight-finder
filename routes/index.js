var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

let flightRequest = {
  "request": {
    "passengers": {
      "kind": "qpxexpress#passengerCounts",
      "adultCount": 1,
    },
    "slice": [
      {
        "kind": "qpxexpress#sliceInput",
        "origin": "LHR",
        "destination": "OSL",
        "date": "2016-12-03",
        "permittedDepartureTime": {
          "kind": "qpxexpress#timeOfDayRange",
          "earliestTime": "06:00",
          "latestTime": "11:00"
        },
      }
    ],
    "saleCountry": "GB",
    "ticketingCountry": "GB",
    "solutions": 10
  }
}

flightRequest.toString()
console.log(flightRequest)


module.exports = router;

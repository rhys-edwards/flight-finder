var express = require('express')
var router = express.Router()
var api = require('../api')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json({ type: 'application/json'});

/* GET home page. */
router.get('/', function(req, res, next) {
  api.apiGet(function (data) {
    console.log(data)
    //console.log(data.trips.tripOption[0].slice[0].segment[0].cabin)
    res.render('index', {
      data: data
    })
  })
})


module.exports = router

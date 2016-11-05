var express = require('express')
var router = express.Router()
var api = require('../api')

/* GET home page. */
// We send all the data to the view
router.get('/', function(req, res, next) {
  api.apiGet(function (data) {
    res.render('index', {
      data: data
    })
  })
})


module.exports = router

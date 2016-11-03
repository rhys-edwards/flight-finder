var express = require('express')
var router = express.Router()
var api = require('api')

/* GET home page. */
router.get('/', function(req, res, next) {
  api.apiGet(function (data) {
    res.render('index', {result: data})
  })
})

module.exports = router

const express = require('express')
var models  = require('../models')

module.exports = function () {
  var router = express.Router()

  function show(req, res, next) {
    models.News.findAll().then((arr) => {
      res.locals.data = arr
      next()
    })
  }

  function create(req, res, next) {

    next()
  }

  function update(req, res, next) {

    next()
  }

  router.route('/')
    .get(show)
    .post(create)
    .put(update)
    .patch(update)

  return router
}

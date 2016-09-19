const express = require('express')
const models = require('../models')

module.exports = function () {
  var router = express.Router()

  function show(req, res, next) {
    models.Times
      .findAll({
        include: models.TimesPics
      })
      .then((arr) => {
        res.locals.data = {
          timeList: arr,
          lastPage: true
        }
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

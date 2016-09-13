const express = require('express')
const sequelize = require('../models').sequelize

module.exports = function () {
  var router = express.Router()

  function show(req, res, next) {
    sequelize
      .query('exec sp_GetTimes', {
        type: sequelize.QueryTypes.SELECT
      })
      .then((arr) => {
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

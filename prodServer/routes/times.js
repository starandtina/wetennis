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
    console.log('req.body');
    models.Times.create({
      //id: 2006,
      ...req.body,
      //TimesPics: req.body.imgs.map(img => {times_img_str:img})
    //}, {
    //    include: [ models.TimesPics ]
    })

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

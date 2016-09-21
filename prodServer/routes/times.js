const express = require('express')
const models = require('../models')

module.exports = function () {
  var router = express.Router()

  function show(req, res, next) {
    console.log(req.cookies.USER_ID);
    models.Times
      .findAll({
        include: models.TimesPics,
        where: {
          userId: req.cookies.USER_ID
        }
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
    const timesPics = models.TimesPics;
    models.Times.create({
      ...req.body,
      TimesPics: req.body.imgs.map(img => ({
        timesImgStr : img
      }))
    }, {
        include: [ timesPics ]
    }).then(obj => {
        res.locals.data = obj;
        next()
    })
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

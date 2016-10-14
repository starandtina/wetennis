const express = require('express')
const models = require('../models')

module.exports = function () {
  var router = express.Router()

  function show(req, res, next) {
    const isGuess = req.body.id === req.cookies.USER_ID;
    const permission = isGuess && 0;
    models.Times
      .findAll({
        include: models.TimesPics,
        order: 'id DESC',
        where: {
          userId: req.body.userId,
          permission,
        }
      })
      .then((arr) => {
        const currentPage = req.query.currentPage;
        const lastPage = arr.length < currentPage * 10;
        res.locals.data = {
          timeList: arr.slice((currentPage - 1) * 10, lastPage ? undefined : currentPage * 10),
          lastPage
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

  function del(req, res, next) {
    models.Times.destroy({
      where: {
        id: req.query.id
      }
    });
    res.locals.data = {result: true};
    next();
  }

  router.route('/')
    .get(show)
    .post(create)
    .put(update)
    .patch(update)
    .delete(del)


  return router
}

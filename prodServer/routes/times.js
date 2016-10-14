const express = require('express')
const models = require('../models')

module.exports = function () {
  var router = express.Router()

  function show(req, res, next) {
    console.log(req.cookies);
    console.log(req.query);
    const isGuess = req.query.id !== req.cookies.USER_ID;
    const whereObj = isGuess ? ({
      userId: req.query.id,
      permission: 0
    }) : ({
      userId: req.query.id
    });
    models.Times
      .findAll({
        include: models.TimesPics,
        order: 'id DESC',
        where: whereObj
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

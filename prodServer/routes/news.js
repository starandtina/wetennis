const express = require('express')
const models = require('../models')

const sequelize = models.sequelize

module.exports = function () {
  var router = express.Router()

  function list(req, res, next) {
    sequelize
      .query('exec sp_GetNewsList', {
        type: sequelize.QueryTypes.SELECT
      })
      .then((arr) => {
        res.locals.data = arr
        next()
      })
  }

  function show(req, res, next) {
    models.News
      .findById(req.params.newsId, {
        include: [{
          model: models.Comment
        }, {
          model: models.ComPrise,
          where: {
            type: 'Comment'
          }
        }],
        order: [[models.Comment, 'updateDate']]
      })
      .then((news) => {
        news = news || {}
        console.log(JSON.stringify(news))
        if (!news.hasOwnProperty('keywordList')) {
          news.keywordList = ['网球']
        }

        news.commentCount = news.Comments.length || 0
        res.locals.news = news
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
    .get(list)
    .post(create)
    .put(update)
    .patch(update)

  router.route('/:newsId')
    .get(show)

  return router
}

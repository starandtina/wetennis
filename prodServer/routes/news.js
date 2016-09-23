const express = require('express')
const models = require('../models')

const sequelize = models.sequelize

module.exports = function () {
  var router = express.Router()

  function list(req, res, next) {
    // sequelize
    //   .query('exec sp_GetNewsList', {
    //     type: sequelize.QueryTypes.SELECT
    //   })
    //   .then((arr) => {
    //     res.locals.data = arr
    //     next()
    //   })
    models.News
      .findAll({
        include: [{
          model: models.Comment,
          required: false,
          where: {
            type: 'News'
          }
        }, {
          model: models.ComPrise,
          required: false,
          where: {
            type: 'News'
          }
        }],
        // order: [[models.News, 'issueTime']]
      })
      .then((newsList) => {
        newsList = newsList.get({
          plain: true
        })

        newsList.forEach((news) => {
          news.commentCount = news.Comments.length
          news.likeCount = news.ComPrises.length
        })

        res.locals.data = newsList

        next()
      })
  }

  function show(req, res, next) {
    models.News
      .findById(req.params.newsId, {
        include: [{
          model: models.Comment,
          required: false,
          where: {
            type: 'News'
          }
        }, {
          model: models.ComPrise,
          required: false,
          where: {
            type: 'News'
          }
        }],
        order: [[models.Comment, 'updateDate']]
      })
      .then((news) => {
        news = news.get({
          plain: true
        })
        console.log(news)
        if (!news.hasOwnProperty('keywordList')) {
          news.keywordList = ['网球']
        }

        news.commentCount = news.Comments.length
        news.likeCount = news.ComPrises.length
        res.locals.data = news
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

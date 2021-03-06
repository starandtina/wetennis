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
        order: 'issueTime DESC'
          // order: 'convert(datetime, issueTime) DESC'
      })
      .then((newsList) => {
        newsList = newsList.map(
          (news) => news.get({
            plain: true
          })
        )

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
        order: [
          [models.Comment, 'updateDate']
        ]
      })
      .then((news) => {
        news = news.get({
          plain: true
        })

        if (!news.keywords) {
          news.keywordList = ['网球', news.type]
        } else {
          news.keywordList = news.keywords.split(',')
          news.keywordList.unshift('网球', news.type)
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

  function like(req, res, next) {
    const body = req.body

    models.ComPrise
      .create({
        isGood: '1',
        typeSysno: body.id,
        userId: req.cookies.USER_ID,
        UpdateTime: new Date().toISOString()
      })
      .then((data) => {
        res.locals.data = data
        next()
      })
  }

  router.route('/')
    .get(list)
    .post(create)
    .put(update)
    .patch(update)

  router.route('/:newsId')
    .get(show)

  router.route('/:newsId/like')
    .post(like)

  return router
}

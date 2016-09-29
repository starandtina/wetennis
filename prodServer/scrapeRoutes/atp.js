const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const models = require('../models')

module.exports = function () {
  var router = express.Router()


  function show(req, res, next) {
    const url = 'http://cn.atpworldtour.com'

    request(url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)
        let atpNewsList = []

        $('.insideATPItem').each((index, atpNews) => {
          const $atpNews = $(atpNews)

          // const newsDate = $atpNews.attr('href').match(/\d{4}\/\d{2}\/\d{2}/)
          // Can't find date so use the current date
          const date = new Date().toISOString()
          const provider = 'ATP'
          const type = $atpNews.find('.insideATPItemType').text()
          const img = $atpNews.find('img')

          let thumbImgUrl = ''
          if (img) {
            thumbImgUrl = `${url}${img.attr('src')}`
          }

          const providerIconUrl = 'http://cn.atpworldtour.com/favicon.ico'
          const content = $atpNews.children().last().text().trim()
          const title = $atpNews.find('.insideATPItemTitle').text().trim()

          atpNewsList.push({
            date,
            provider,
            type,
            thumbImgUrl,
            providerIconUrl,
            content,
            title
          })
        })


        models.News
          .findAll({
            order: 'convert(datetime, issueTime) DESC'
          })
          .then(newsList => {
            // Filter out existed news depending on the title
            const existedNewsTitles = newsList.map(news => news.title)

            atpNewsList = atpNewsList.filter(news => {
              return news.title && existedNewsTitles.indexOf(news.title) === -1
            })

            Promise.all(atpNewsList.map(news => {
                return models.News
                  .create(news)
              }))
              .then((results) => {
                res.locals.data = results

                next()
              })
              .catch(err => {
                console.error(err)
                res.status(500).json({
                  code: -1,
                  errorMsg: err
                })

                next()
              })
          })
      }
    })
  }

  router.route('/')
    .get(show)

  return router
}

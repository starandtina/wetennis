const express = require('express')
const request = require('request')
const rp = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const models = require('../models')

module.exports = function () {
  const router = express.Router()

  function show(req, res, next) {
    const url = 'http://sports.sina.com.cn/tennis/'

    request(url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html)
        const links = []
        const sinaNewsList = []

        $('.news_list .list01 a').each((index, link) => {
          links.push($(link).attr('href'))
        })

        Promise.all(links.map(link => rp(link)))
          .then(results => {
            results.forEach(r => {
              const $newsHTML = cheerio.load(r)

              const date = $newsHTML('#pub_date').text().trim()
              const provider = 'Sina'
              const type = '新浪体育'
              const thumbImgUrl = $newsHTML('.img_wrapper:first-of-type img').attr('src')
              const providerIconUrl = 'http://sports.sina.com.cn/favicon.ico'
              const content = $newsHTML('#artibody p').map(function (i, el) {
                return `<p>${$(this).text()}</p>`
              }).get().join(' ')
              const title = $newsHTML('#artibodyTitle').text().trim()

              sinaNewsList.push({
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
                const filteredSinaNewsList = sinaNewsList.filter(news => {
                  return news.title && existedNewsTitles.indexOf(news.title) === -1
                })

                Promise.all(filteredSinaNewsList.map(news => {
                    return models.News
                      .create(news)
                  }))
                  .then(results => {
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
          })
          .catch(err => {
            console.error(err)
          })


      }
    })
  }

  router.route('/')
    .get(show)

  return router
}

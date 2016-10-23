const express = require('express')
const request = require('request')
const rp = require('request-promise')
const cheerio = require('cheerio')
const fs = require('fs')
const models = require('../models')

const debug = require('debug')('app')
const config = require('../../config')
const paths = config.utils_paths
const port = config.server_port
const host = config.server_host


module.exports = function () {
  const router = express.Router()

  function show(req, res, next) {
    const url = 'http://sports.sina.com.cn/tennis/'

    request(url, function (error, response, html) {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html, {
          decodeEntities: false
        })
        const links = []
        const sinaNewsList = []

        $('.news_list .list01 a').each((index, link) => {
          links.push($(link).attr('href'))
        })

        Promise.all(links.map(link => rp(link)))
          .then(results => {
            results.forEach(r => {
              const $newsHTML = cheerio.load(r, {
                decodeEntities: false
              })

              const date = $newsHTML('#pub_date').text().trim()
              const provider = 'Sina'
              const type = '新浪体育'
              const thumbImgUrl = $newsHTML('.img_wrapper:first-of-type img').attr('src')
              const providerIconUrl = 'http://sports.sina.com.cn/favicon.ico'
                // const content = $newsHTML('#artibody p').map(function (i, el) {
                //   return `<p>${$(this).text()}</p>`
                // }).get().join(' ')
              const content = $newsHTML('.BSHARE_POP')
                .contents()
                .not('.img_wrapper')
                .map((i, el) => $newsHTML.html(el))
                .get().join(' ')

              const title = $newsHTML('#artibodyTitle').text().trim()

              // TODO: ADD keyword list

              const keywords = $newsHTML('.art_keywords a').map((i, el) => $(el).text()).get().join(',')

              sinaNewsList.push({
                date,
                provider,
                type,
                thumbImgUrl,
                providerIconUrl,
                content,
                title,
                keywords
              })
            })

            models.News
              .findAll()
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

  setInterval(() => {
    rp(`http://${host}:${port}/scrape/news/sina`)
      .then(() => debug(`Server is now fetching tennis news from Sina at http://${host}:${port}.`))
  }, 1000 * 60 * 60 * 12)

  return router
}

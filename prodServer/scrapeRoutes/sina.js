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

        $('.news_list .list01 a').each((index, link) => {
          links.push($(link).attr('href'))
        })

        Promise.all(links.map(link => rp(link)))
          .then(results => {
            Object.keys(results).forEach(r => {
              console.log(r)
              const $newsHTML = cheerio.load(r)

              console.log($newsHTML('.img_wrapper:first-of-type').attr('src'))
            })
          })
          .catch(err => {
            console.error(err)
          })

        // atpNewsList.push({
        //   date,
        //   provider,
        //   type,
        //   thumbImgUrl,
        //   providerIconUrl,
        //   content,
        //   title
        // })
      }
    })
  }

  router.route('/')
    .get(show)

  return router
}

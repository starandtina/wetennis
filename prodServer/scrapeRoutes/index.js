const express = require('express')
const logger = require('morgan')

// Create router
const router = express.Router()

if (process.env.NODE_ENV === 'development') {
  router.use(logger('dev'))
}

// Create routes
router.use('/atp', require('./atp')())

// Expose render
router.render = function (req, res) {
  res.json({
    code: 0,
    errorMsg: '',
    data: res.locals.data
  })
}

router.use(function (req, res) {
  if (!res.locals.data) {
    res.status(404)
    res.locals.data = {}
  }

  router.render(req, res)
})

router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json({
    code: -1,
    errorMsg: err.stack
  })
})

module.exports = router

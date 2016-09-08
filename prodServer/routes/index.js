const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


// Create router
const router = express.Router()

if (process.env.NODE_ENV === 'development') {
  router.use(logger('dev'))
}
router.use(cors())
router.use(bodyParser.json({
  limit: '10mb',
  extended: false
}))
router.use(bodyParser.urlencoded({
  extended: false
}))
router.use(methodOverride())
router.use(cookieParser())

// Expose render
router.render = function (req, res) {
  res.json({
    code: 0,
    errorMsg: '',
    data: res.locals.data
  })
}

// Create routes
router.use('/news', require('./news')())


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

const express = require('express')
const app = express()

const router = express.Router()

app.use('/api', router)

router
  .all('/', function (req, res, next) {
    const fs = require('fs')
    const path = require('path')
    const file = path.resolve(__dirname, 'JSON', req.query.method + '.json')

    const data = fs.readFileSync(file, 'utf8')

    console.log('Reading JSON file from ' + file + ' for ' + req.query.method)
    
    res.json(JSON.parse(data))

    return next()
  });

router
  .all('/v1/:method', function (req, res, next) {
    const fs = require('fs')
    const path = require('path')
    const file = path.resolve(__dirname, 'JSON', req.params.method + '.json')

    const data = fs.readFileSync(file, 'utf8')

    console.log('Reading JSON file from ' + file + ' for ' + req.params.method)
    
    res.json(JSON.parse(data))

    next()
  })
  .all('/v1/:method/:id/:action', function (req, res, next) {
    const fs = require('fs')
    const path = require('path')
    const file = path.resolve(__dirname, 'JSON', req.params.action + '.json')

    var data = fs.readFileSync(file, 'utf8')

    console.log('Reading JSON file from ' + file + ' for ' + req.path)

    res.json(JSON.parse(data))

    next()
  })


app.listen(8000, () => console.log("API server is running at http://localhost:8000"))

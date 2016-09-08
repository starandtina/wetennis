const path = require('path')
const express = require('express')

const compression = require('compression')
const httpProxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')

const debug = require('debug')('wetennis:app')
const app = express()
const routes = require('./routes')
const models = require('./models')
const targetUrl = "http://wetennis.cn:8883/API/FEservice.ashx";

// Enable compression
app.use(compression())

// Proxy API request for Node.js
app.use('/api/v1', routes)

// Proxy API request for .NET ASHX
app.use('/api', httpProxyMiddleware({
  target: targetUrl,
  changeOrigin: true
}))

// This rewrites all routes requests to the root /index.html file
app.use(historyApiFallback({
  verbose: false
}))

// Serving static files in Express
app.use(express.static(path.join(__dirname, '..', 'dist')))

const server = app.listen(3000, function () {
  debug('Express server listening on port ' + server.address().port)
})

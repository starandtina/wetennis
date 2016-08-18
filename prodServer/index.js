const path = require('path')
const express = require('express')
const app = express()

const compression = require('compression')
const httpProxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')

var targetUrl = "http://wetennis.cn:8883/API/FEservice.ashx";

// Enable compression
app.use(compression())

// Proxy API request
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




app.listen(3000, function () {
  console.log('api server run at http://localhost:3000')
})

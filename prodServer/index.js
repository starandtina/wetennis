const path = require('path')
const express = require('express')
const app = express()

const compression = require('compression')
const httpProxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')


// Proxy API request
app.use('/api', httpProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true
}))

// This rewrites all routes requests to the root /index.html file
app.use(historyApiFallback({
  verbose: false
}))

// Serving static files in Express
app.use(express.static(path.join(__dirname, '..', 'dist')))

// Enable compression
app.use(compression())


app.listen(3000, function () {
  console.log('api server run at http://localhost:3000')
})

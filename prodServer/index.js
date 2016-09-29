const path = require('path')
const express = require('express')
const webpack = require('webpack')
const WebpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require('../build/webpack.config')
const compression = require('compression')
const httpProxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')
const debug = require('debug')('wetennis:app')

const config = require('../config')
const paths = config.utils_paths
const port = config.server_port
const host = config.server_host

const app = express()
const routes = require('./routes')
const scrapeRoutes = require('./scrapeRoutes')

const targetUrl = "http://wetennis.cn:8883/API/FEservice.ashx";


// Enable compression
app.use(compression())

// Proxy API request for Node.js
app.use('/api/v1', routes)

// Proxy Scrape request for Node.js
app.use('/scrape/news', scrapeRoutes)

// Proxy API request for .NET ASHX
app.use('/api', httpProxyMiddleware({
  target: targetUrl,
  changeOrigin: true
}))

// This rewrites all routes requests to the root /index.html file
app.use(historyApiFallback({
  verbose: false
}))

if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  const webpackDevMiddleware = WebpackDevMiddleware(compiler, {
    publicPath,
    contentBase: paths.client(),
    hot: true,
    quiet: config.compiler_quiet,
    noInfo: config.compiler_quiet,
    lazy: false,
    stats: config.compiler_stats
  })

  app.use(webpackDevMiddleware)
  app.use(express.static(paths.client('static')))
} else {
  // Serving static files in Express
  app.use(express.static(path.join(__dirname, '..', 'dist')))
}

const server = app.listen(port, function () {
  debug(`Server is now running at http://${host}:${port}.`)
})

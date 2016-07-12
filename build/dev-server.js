var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.dev.conf')
var serveIndex = require('serve-index')
var c = require('child_process')
var request = require('request')

var app = express()
var compiler = webpack(config)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

//serve-index
app.use('/', serveIndex('./src/views', {'icons': true}))
//api proxy
app.use('/api', function(req, res, next){
  "use strict";
  var r = request({method: req.method, url: 'http://localhost:3000/api' + req.url})
  req.pipe(r).pipe(res)
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())
// serve webpack bundle output
app.use(devMiddleware)
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
// serve pure static assets
app.use('/static', express.static('./static'))


app.listen(8080, function (err) {
  if (err) {
    console.log(err)
    return
  }
  //open localhost
  c.exec('start http://localhost:8080')
})
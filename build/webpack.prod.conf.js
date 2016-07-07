var webpack = require('webpack')
var config = require('./webpack.base.conf')
var cssLoaders = require('./css-loaders')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var normalExtractCss = new ExtractTextPlugin('css/[name].[chunkhash].css')

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = 'js/[name].[chunkhash].js'
config.output.chunkFilename = 'js/[id].[chunkhash].js'

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = false

config.devtool = SOURCE_MAP ? '#source-map' : false

config.vue = config.vue || {}
config.vue.loaders = config.vue.loaders || {}
cssLoaders({
  sourceMap: SOURCE_MAP,
  extract: true
}).forEach(function (loader) {
  config.vue.loaders[loader.key] = loader.value
})

//recognize and extract non-vue scss files
config.module.loaders.push({
  test: /\.s[c|a]ss$/i,
  loader: normalExtractCss.extract("vue-style-loader", "css!sass")
})

config.plugins = (config.plugins || []).concat([
  // http://vuejs.github.io/vue-loader/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  // extract css into its own file
  normalExtractCss
]).concat(Object.keys(config.entry).filter(function(val){
  "use strict";
  return val !== 'common'
}).map(function(key){
  "use strict";
// generate dist index.html with correct asset hash for caching.
  // you can customize output by editing /index.html
  // see https://github.com/ampedandwired/html-webpack-plugin
  return new HtmlWebpackPlugin({
    filename: '../views/'+ key +'.html',
    template: 'src/views/'+ key +'.html',
    chunks: ['common', key],
    chunksSortMode: function(a, b){
      if(a.names[0] === 'common'){
        return -1;
      }else if(b.names[0] === 'common'){
        return 1;
      }else{
        return a.id - b.id;
      }
    },
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
    }
  })
}))

module.exports = config

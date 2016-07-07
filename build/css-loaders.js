var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./webpack.base.conf')
var vueExtractCss = new ExtractTextPlugin('css/components.css')

module.exports = function (options) {
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return vueExtractCss.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }
  if (options.extract) {
    config.plugins = (config.plugins || []).concat([
      vueExtractCss
    ])
  }


  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return [
    {
      key: 'css',
      value: generateLoaders(['css'])
    },
    {
      key: 'less',
      value: generateLoaders(['css', 'less'])
    },
    {
      key: 'sass',
      value: generateLoaders(['css', 'sass?indentedSyntax'])
    },
    {
      key: 'scss',
      value: generateLoaders(['css', 'sass'])
    },
    {
      key: 'stylus',
      value: generateLoaders(['css', 'stylus'])
    },
    {
      key: 'styl',
      value: generateLoaders(['css', 'stylus'])
    }
  ]
}

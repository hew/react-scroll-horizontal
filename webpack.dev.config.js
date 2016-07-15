
require('babel-register')()

var _ = require('lodash')
var config = require('./webpack.config.js')
var webpack = require('webpack')

module.exports = _.extend(config, {

  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server',
    './docs/entry.js'
  ],

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true
  }
})


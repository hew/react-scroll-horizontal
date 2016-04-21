
var webpack = require('webpack')

module.exports = {

  entry: [
    './docs/entry.js'
  ],

  output: {
    filename: 'bundle.js',
    publicPath: '/docs/',
    path: __dirname + '/docs'
  },

  module: {
    loaders: [
      {
        test: /(\.js$|\.jsx?$)/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      },
      { test: /\.json/, loader: 'json' },
      { test: /\.md/, loader: 'html!markdown-loader' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }

}

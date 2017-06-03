var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve('build'),
    filename: 'bundle.js'
  },
  module: {
      loaders: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
      }]
  },
 /* plugins: [
      new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false,
          },
          output: {
              comments: false,
          },
      }),
  ],*/
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
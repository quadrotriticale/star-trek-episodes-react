const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app'),
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public')
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']}
    ]
  },
  plugins: [
    new MinifyPlugin()
  ]
}

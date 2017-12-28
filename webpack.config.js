const webpack = require('webpack');
const path = require('path');

var config = {
  entry: path.resolve(__dirname, 'index.js'),

  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  devServer: {
    inline: true,
    port: 3000
  },

  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
    }]
  }
};

module.exports = config;
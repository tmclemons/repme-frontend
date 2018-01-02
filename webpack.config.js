const webpack = require('webpack');
const path = require('path');

var config = {
  entry: path.resolve(__dirname, 'main.js'),

  output: {
    path: __dirname + '/public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: [],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            'transform-class-properties'
          ],
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = config;

  // devServer: {
  //   inline: true,
  //   port: 3000
  // },
const webpack = require('webpack');
const path = require('path');

var config = {
  entry: path.resolve(__dirname, 'index.js'),

  output: {
    path: __dirname + '/home/ubuntu/repme-front/public',
    filename: './bundle.js',
    publicPath: '/vote/'
  },

  plugins: [],
  devServer: {
    // proxy: {
    //   '/api/profile': {
    //     target: 'http://54.187.193.156/api/profile',
    //   }
    // },
    inline: true,
    port: 3000
  },
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


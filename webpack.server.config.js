var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
console.log(__dirname)
module.exports = {
  entry: path.resolve(__dirname, 'server.js'),
  output: {
    filename: 'server.bundle.js',
  },
  target: 'node',
  externals: fs.readdirSync(path.resolve(__dirname, './node_modules')).concat([
    'react-dom/server'
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
}
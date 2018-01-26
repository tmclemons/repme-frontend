var path = require('path');

module.exports = {
  entry: './app/app.js',

  output: {
    filename: 'app.js',
    path: path.join('public/javascripts/')
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      }
    ]
  }
};

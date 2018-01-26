var path = require('path');
const context = path.resolve(process.cwd(), 'app');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});


module.exports = {
  entry: context + '/app.js',

  output: {
    filename: '[name].js',
    path: path.join(process.cwd(), 'public/javascripts/')
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        include: path.resolve(__dirname, './app'),
        loader: 'babel-loader',
        query: {
          plugins: []
        },
        test: /\.js$/
      }
    ]
  },
  plugins: [
    extractSass
  ]
};

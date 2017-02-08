const path = require('path');

const config = {
  context: __dirname,
  entry: './assets/js/App.jsx',
  output: {
    path: path.join(__dirname, './assets'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;

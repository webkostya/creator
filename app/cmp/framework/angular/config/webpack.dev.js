var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',

  output: {
    path: helpers.root('dapp-bundle'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
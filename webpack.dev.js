const merge = require('webpack-merge')
const conf = require('./webpack.config')
const webpack = require('webpack')

module.exports = merge(conf, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
})

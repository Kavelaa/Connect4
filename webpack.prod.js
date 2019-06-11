const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const conf = require('./webpack.config.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(conf, {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new UglifyJSPlugin({ sourceMap: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  mode: 'production'
})

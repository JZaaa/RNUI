'use strict'
const path = require('path')
const config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  output: {
    path: config.build.assetsRoot,
    filename: '[name].min.js',
    publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
      '@css': resolve('src/css/modules')
    }
  },
  externals: {
    jquery: 'jQuery'
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

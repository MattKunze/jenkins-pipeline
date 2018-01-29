var path = require('path')
var webpackConfig = require('./webpack.config')
delete webpackConfig.entry
delete webpackConfig.output

module.exports = config => {
  config.set({
    files: ['tests.bundle.js'],
    frameworks: ['mocha'],
    preprocessors: {
      'tests.bundle.js': ['webpack']
    },
    reporters: ['junit'],
    browsers: ['jsdom'],
    webpack: webpackConfig,
    junitReporter: {
      outputFile: path.join(__dirname, '/build/results.xml')
    },
    tapReporter: {
      outputFile: './build/results.tap'
    }
  })
}

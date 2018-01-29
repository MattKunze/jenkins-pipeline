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
    reporters: ['tap'],
    browsers: ['jsdom'],
    webpack: webpackConfig,
    tapReporter: {
      outputFile: './build/results.tap'
    }
  })
}

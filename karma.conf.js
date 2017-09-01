module.exports = config => config.set({
  frameworks: ['kocha', 'browserify'],
  files: [
    'src/__tests__/helper.js',
    'src/**/__tests__/**/*.js'
  ],
  preprocessors: {
    'src/**/__tests__/**/*.js': ['browserify']
  },
  browserify: {
    debug: true,
    transform: [['babelify', { presets: ['env', 'decorators-legacy'], plugins: ['transform-runtime', 'transform-object-rest-spread', 'istanbul'] }]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporter: { reporters: [{ type: 'lcov' }] },
  browsers: ['Chrome'],
  singleRun: true
})

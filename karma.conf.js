module.exports = config => config.set({
  frameworks: ['mocha', 'browserify'],
  files: [
    'src/__tests__/helper.js',
    'src/**/__tests__/**/*.js'
  ],
  preprocessors: {
    'src/**/__tests__/**/*.js': ['browserify']
  },
  browserify: {
    debug: true,
    transform: [['babelify', { presets: ['env'], plugins: ['istanbul'] }]]
  },
  reporters: ['progress', 'coverage'],
  coverageReporters: { type: 'lcov' },
  browsers: ['Chrome'],
  singleRun: true
})

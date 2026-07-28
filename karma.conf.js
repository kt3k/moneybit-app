module.exports = config =>
  config.set({
    frameworks: ['kocha', 'browserify'],
    files: ['src/__tests__/helper.js', 'src/**/__tests__/**/*.js'],
    preprocessors: {
      'src/**/__tests__/**/*.js': ['browserify']
    },
    browserify: {
      debug: true,
      transform: [
        [
          'babelify',
          {
            presets: ['@babel/preset-env'],
            plugins: [
              'istanbul',
              [
                '@babel/plugin-proposal-decorators',
                { decoratorsBeforeExport: false }
              ],
              '@babel/plugin-proposal-class-properties'
            ]
          }
        ]
      ]
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: { reporters: [{ type: 'lcov' }] },
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu']
      }
    },
    browsers: [process.env.CI ? 'ChromeHeadlessCI' : 'Chrome'],
    singleRun: true
  })

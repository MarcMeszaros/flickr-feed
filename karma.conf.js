// Karma configuration

// if running on CircleCI, add extra browsers to test
var CI = process.env.CI || false;
var unitTestBrowsers = ['PhantomJS'];
if (CI) {
    unitTestBrowsers.push('Chrome', 'Firefox');
}


module.exports = function(config) {
  config.set({

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        {pattern: './test/*-spec.js', watched: false}
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './app/**/*.js': ['webpack'],
        './test/*-spec.js': ['webpack']
    },
    webpack: {
        // karma watches the test entry points
        // (you don't need to specify the entry option)
        // webpack watches dependencies

        // webpack configuration
    },

    webpackMiddleware: {
        // webpack-dev-middleware configuration
        // i. e.
        stats: 'errors-only'
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'junit'],

    junitReporter: {
        outputDir: '../junit',
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: unitTestBrowsers,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1
  })
}

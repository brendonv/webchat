// Karma configuration
// Generated on Wed Oct 19 2016 14:14:46 GMT-0700 (PDT)
module.exports = function(config) {
  config.set({

    basePath: './',

    files: [
      'vendor/angular/angular.js',
      'vendor/angular-route/angular-route.js',
      'vendor/jquery/dist/jquery.js',
      'vendor/angular-mocks/angular-mocks.js',
      'vendor/angular-resource/angular-resource.js',
      'app/**/*.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
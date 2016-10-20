var PORT = process.env.PORT || 3000;

exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:' + PORT,

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
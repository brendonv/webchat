module.exports = {
  "DEV": {
    mongoDB: 'mongodb://localhost:27017/webchat',
    jwtSecret: 'someSuperSerialSecret'
  },
  "PRODUCTION": {
    mongoDB: 'mongodb://admin:jackie@ds049436.mlab.com:49436/doyt-mlab',
    jwtSecret: 'someSuperSerialSecret'
  },
  "TESTS": {
    mongoDB: 'mongodb://localhost:27017/webchat-tests',
    jwtSecret: 'someSuperSerialSecret'
  }
}
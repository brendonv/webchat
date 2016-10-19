module.exports = {
    mongoDB: process.env.MONGODB_URI || 'mongodb://localhost:27017/webchat',
    jwtSecret: process.env.JWT_SECRET || 'someSuperSerialSecret'
};

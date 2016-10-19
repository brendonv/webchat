module.exports = {
    mongoDB: process.env.MONGO_DB || 'mongodb://localhost:27017/webchat',
    jwtSecret: process.env.JWT_SECRET || 'someSuperSerialSecret'
};

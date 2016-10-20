var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    created: Date,
    username: {type: String, index: true},
    avatar_url: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;
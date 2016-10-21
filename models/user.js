var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    created: Date,
    username: {type: String, index: true},
    avatar_color: String
});

userSchema.pre('save', function(next) {
    var user = this;
    
    function djb2(str){
        var hash = 5381;
        for (var i = 0; i < str.length; i++) {
            hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
        }
        return hash;
    }

    function hashStringToColor(str) {
        var hash = djb2(str);
        var r = (hash & 0xFF0000) >> 16;
        var g = (hash & 0x00FF00) >> 8;
        var b = hash & 0x0000FF;
        return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2);
    }

    user.avatar_color = hashStringToColor(user._id);
    next();
});

var User = mongoose.model('User', userSchema);
module.exports = User;
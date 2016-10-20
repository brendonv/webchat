var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.signup = function(req, res) {

    var username = req.body.username;

    if (!username) return res.send(400).json({error: "Missing username."});

    var user = new User({
        username: username,
        created: Date.now()
    });

    user.save(function(error, saveUser) {

        if (error) {
            console.log("ERROR: users.signup", error);
            return res.sendStatus(500);
        }

        return res.status(200).json({user: saveUser});

    });

};

exports.logout = function(req, res) {
    return res.sendStatus(200);
};

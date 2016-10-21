var mongoose = require('mongoose');
var Message = mongoose.model('Message');

exports.index = function(req, res, next) {
    var noUser = req.hasOwnProperty("user") && req.user._id ? false : true;
    var createdBefore = req.query.lastCalled || Date.now();
    var limit = noUser ? 10 : 20;
    var query = {
        "created": {}
    };

    noUser ? query.created["$lt"] = createdBefore : query.created["$gt"] = createdBefore;

    console.log("MESSAGES INDEX", noUser, query);

    Message.find(query).limit(limit).sort("created").populate('creator').exec(function(error, messages) {
        if (error) {
            console.log("ERROR: messages.index", error);
            return next();
        }
        console.log("RETURNING", messages.length);
        return res.json({messages: messages});
    });

};

exports.create = function(req, res, next) {
    var user = req.user;
    var content = req.body.content;
    var created = req.body.created || Date.now();

    if (!user) return next({message: "Missing user."});

    var message = new Message({
        creator: user._id,
        created: created,
        content: content
    });

    message.save(function(error, message) {
        if (error) {
            console.log("ERROR: messages.create", error);
            return next();
        }
        return res.json({message: message});
    })
};

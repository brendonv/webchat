var mongoose = require('mongoose');
var Message = mongoose.model('Message');

exports.index = function(req, res, next) {
    console.log("MESSAGES INDEX TOP");
    var noUser = req.user ? false : true;
    var initialRequest = req.query.hasOwnProperty("initial") ? typeof req.query.initial === "boolean" ? req.query.initial : req.query.initial === "true" : false;
    var createdBefore = req.query.lastReceivedMessage || Date.now();
    var limit = noUser ? 10 : 20;
    var query = {
        "created": {}
    };

    initialRequest ? query.created["$lt"] = createdBefore : query.created["$gt"] = createdBefore;

    console.log("MESSAGES INDEX", typeof initialRequest, req.query.initial, query);

    Message.find(query).limit(limit).sort("created").populate('creator').exec(function(error, messages) {
        if (error) {
            console.log("ERROR: messages.index", error);
            return next();
        }
        console.log("RETURNING MESSAGES: ", messages.length);
        return res.json({messages: messages});
    });

};

exports.create = function(req, res, next) {
    var user = req.user;
    var content = req.body.content;

    if (!user) return next({message: "Missing user."});

    var message = new Message({
        creator: user._id,
        created: Date.now(),
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

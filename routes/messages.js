var mongoose = require('mongoose');
var Message = mongoose.model('Message');

exports.index = function(req, res, next) {
    console.log("MESSAGES INDEX TOP");
    var noUser = req.user ? false : true;
    var createdBefore = req.query.createdBefore || Date.now();
    var limit = noUser ? 10 : 20;
    var query = {
        "created": {
            $lte: createdBefore
        }
    };

    console.log("MESSAGES INDEX", noUser, limit);

    Message.find(query).limit(limit).sort("-created").exec(function(error, messages) {
        if (error) {
            console.log("ERROR: messages.index", error);
            return next();
        }
        console.log("MESSAGES FIND", messages);
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

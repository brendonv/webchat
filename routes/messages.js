var mongoose = require('mongoose');
var Message = mongoose.model('Message');

exports.index = function(req, res) {
    var noUser = req.user ? false : true;
    var skip = req.query.skip || 0;
    var limit = noUser ? 10 : 20;

    Messages.findAll(query).skip(skip).limit(limit).exec(function(error, messages) {
        if (error) {
            console.log("ERROR: messages.index", error);
            return res.sendStatus(500);
        }

        return res.send(200).json({messages: messages});
    });

};

exports.create = function(req, res) {
    var user = req.user;
    var content = req.body.content;

    if (!user) return res.send(400).json({error: "Missing user."});

    var message = new Message({
        creator: user._id,
        created: Date.now(),
        content: content
    });

    message.save(function(error, message) {
        if (error) {
            console.log("ERROR: messages.create", error);
            return res.sendStatus(500);
        }

        return res.send(200).json({message: message});
    })
};

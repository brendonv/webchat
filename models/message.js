var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var messageSchema = new Schema({
    created: Date,
    creator: {type: Schema.Types.ObjectId, ref: 'User', index: true},
    content: String
});

var Message = mongoose.model('Message', messageSchema);
module.exports = Message;